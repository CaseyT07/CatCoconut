// ============================================
//   刷题引擎 & 错题管理
//   双模式：图片标识 / 综合知识
// ============================================

var QUIZ_MODE = null; // "image" | "comprehensive"

var IMAGE_QUIZ_COUNT = 20;
var COMPREHENSIVE_QUIZ_COUNT = 30;
var POINTS_PER_QUESTION = 5;

var quizState = {
  mode: null,
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  answered: false,
};

// ========== 错题存储 (localStorage) ==========

function getWrongList(mode) {
  mode = mode || QUIZ_MODE || "image";
  var key = "traffic_wrong_list_" + mode;
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveWrongList(list, mode) {
  mode = mode || QUIZ_MODE || "image";
  var key = "traffic_wrong_list_" + mode;
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (e) {}
}

function addWrongAnswer(questionData) {
  var mode = quizState.mode || "image";
  // 错题复习模式下不重复记录
  if (mode === "wrong") return;
  var list = getWrongList(mode);

  // 检查是否已存在相同题目，存在则仅增加计数
  var dupKey = questionData.sign
    ? ("sign_" + questionData.sign.id)
    : ("knowledge_" + (questionData.question ? questionData.question.id : ""));
  var existing = null;
  for (var i = 0; i < list.length; i++) {
    var ek = list[i].type === "sign"
      ? ("sign_" + (list[i].signId || ""))
      : ("knowledge_" + (list[i].knowledgeId || ""));
    if (ek === dupKey) { existing = list[i]; break; }
  }

  if (existing) {
    existing.wrongCount = (existing.wrongCount || 1) + 1;
    existing.time = new Date().toLocaleString("zh-CN");
    if (questionData.userAnswer) {
      existing.userAnswer = questionData.userAnswer.name || questionData.userAnswer;
    }
  } else {
    var entry = {
      time: new Date().toLocaleString("zh-CN"),
      mode: mode,
      wrongCount: 1,
    };

    if (questionData.sign) {
      entry.type = "sign";
      entry.signId = questionData.sign.id;
      entry.name = questionData.sign.name;
      entry.svg = questionData.sign.svg;
      entry.img = questionData.sign.img || null;
      entry.category = questionData.sign.category;
    } else if (questionData.question) {
      entry.type = "knowledge";
      entry.knowledgeId = questionData.question.id;
      entry.questionText = questionData.question.question;
      entry.correctAnswer = questionData.question.options[questionData.question.answer];
      entry.category = questionData.question.category;
      // 交警手势存图片名
      if (questionData.question.category === "hand_signals" && questionData.question.image) {
        entry.handImage = questionData.question.image;
      }
    }

    if (questionData.userAnswer) {
      entry.userAnswer = questionData.userAnswer.name || questionData.userAnswer;
    }

    list.unshift(entry);
  }

  saveWrongList(list, mode);
}

function clearWrongList(mode) {
  mode = mode || QUIZ_MODE || "image";
  saveWrongList([], mode);
}

// ========== 答题历史 ==========

function getQuizHistory() {
  try {
    var raw = localStorage.getItem("traffic_quiz_history");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveQuizHistory(record) {
  var history = getQuizHistory();
  // 去重：如果最近一条记录和当前同模式、同时间，跳过
  if (history.length > 0) {
    var last = history[0];
    if (last.date === record.date && last.mode === record.mode && last.score === record.score) {
      return;
    }
  }
  history.unshift(record);
  if (history.length > 50) history = history.slice(0, 50);
  try {
    localStorage.setItem("traffic_quiz_history", JSON.stringify(history));
  } catch (e) {}
}

// ========== 答题状态存取 ==========

function _stateKey(mode) {
  mode = mode || quizState.mode || "image";
  return "traffic_quiz_state_" + mode;
}

function saveQuizState() {
  if (!quizState.questions.length) return;
  if (quizState.currentIndex >= quizState.questions.length) return;
  var state = {
    mode: quizState.mode,
    currentIndex: quizState.currentIndex,
    correctCount: quizState.correctCount,
    wrongCount: quizState.wrongCount,
    questionData: [],
  };
  for (var i = 0; i < quizState.questions.length; i++) {
    var q = quizState.questions[i];
    state.questionData.push({
      signId: q.sign ? q.sign.id : null,
      knowledgeId: q.question ? q.question.id : null,
      answered: q.answered || false,
      userAnswerCorrect: q.userAnswer ? q.userAnswer.isCorrect : null,
      userAnswerName: q.userAnswer ? q.userAnswer.name : null,
    });
  }
  try {
    localStorage.setItem(_stateKey(), JSON.stringify(state));
  } catch (e) {}
}

function getSavedQuizState(mode) {
  mode = mode || "image";
  try {
    var raw = localStorage.getItem(_stateKey(mode));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function clearQuizState(mode) {
  mode = mode || quizState.mode || "image";
  localStorage.removeItem(_stateKey(mode));
}

function getAnySavedState() {
  // 返回所有 mode 的保存状态
  var modes = ["image", "comprehensive", "wrong"];
  var results = [];
  for (var i = 0; i < modes.length; i++) {
    var s = getSavedQuizState(modes[i]);
    if (s && s.questionData && s.currentIndex < s.questionData.length) {
      s._mode = modes[i];
      results.push(s);
    }
  }
  return results;
}

// ========== 工具函数 ==========

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

// ========== 随机抽题 ==========

function weightedPickSigns(count) {
  var pool = [];
  for (var i = 0; i < TRAFFIC_SIGNS.length; i++) {
    var w = TRAFFIC_SIGNS[i].weight || 2;
    for (var j = 0; j < w; j++) {
      pool.push(TRAFFIC_SIGNS[i]);
    }
  }
  var shuffled = shuffle(pool);
  var selected = [];
  var seen = {};
  for (var k = 0; k < shuffled.length && selected.length < count; k++) {
    var sign = shuffled[k];
    if (!seen[sign.id]) {
      seen[sign.id] = true;
      selected.push(sign);
    }
  }
  return selected;
}

function generateSignQuestion(sign) {
  var others = TRAFFIC_SIGNS.filter(function (s) {
    return s.id !== sign.id;
  });
  var wrongs = shuffle(others).slice(0, 3);
  var options = [
    { name: sign.name, isCorrect: true },
    { name: wrongs[0].name, isCorrect: false },
    { name: wrongs[1].name, isCorrect: false },
    { name: wrongs[2].name, isCorrect: false },
  ];
  return {
    type: "sign",
    sign: sign,
    options: shuffle(options),
    userAnswer: null,
  };
}

function generateKnowledgeQuestion(kq) {
  var options = [];
  for (var i = 0; i < kq.options.length; i++) {
    options.push({
      name: kq.options[i],
      isCorrect: (i === kq.answer),
    });
  }
  return {
    type: "knowledge",
    question: kq,
    options: options,
    userAnswer: null,
  };
}

// ========== 出题 ==========

function generateImageQuiz() {
  var signs = weightedPickSigns(IMAGE_QUIZ_COUNT);
  return signs.map(function (sign) {
    return generateSignQuestion(sign);
  });
}

function generateComprehensiveQuiz() {
  var questions = [];

  // 8 道标志识别题
  var signs = weightedPickSigns(8);
  for (var i = 0; i < signs.length; i++) {
    questions.push(generateSignQuestion(signs[i]));
  }

  // 安全检查：知识库是否已加载
  if (typeof KNOWLEDGE_CATEGORIES === 'undefined' || typeof KNOWLEDGE_QUESTIONS === 'undefined') {
    // 知识库未加载，剩下的题全用标志识别
    var extraSigns = weightedPickSigns(22);
    for (var e = 0; e < extraSigns.length; e++) {
      questions.push(generateSignQuestion(extraSigns[e]));
    }
    return shuffle(questions);
  }

  // 22 道知识题，均匀分布在各模块
  var catKeys = Object.keys(KNOWLEDGE_CATEGORIES);
  var perCat = Math.floor(22 / catKeys.length);
  var extra = 22 - perCat * catKeys.length;

  for (var c = 0; c < catKeys.length; c++) {
    var catId = catKeys[c];
    var catQuestions = KNOWLEDGE_QUESTIONS.filter(function (q) {
      return q.category === catId;
    });
    var pickCount = perCat + (c < extra ? 1 : 0);
    var picked = shuffle(catQuestions).slice(0, pickCount);
    for (var p = 0; p < picked.length; p++) {
      questions.push(generateKnowledgeQuestion(picked[p]));
    }
  }

  return shuffle(questions);
}

// ========== 恢复答题 ==========

function restoreQuiz(savedState) {
  var idMap = {};
  for (var i = 0; i < TRAFFIC_SIGNS.length; i++) {
    idMap[TRAFFIC_SIGNS[i].id] = TRAFFIC_SIGNS[i];
  }

  var knowledgeMap = {};
  for (var j = 0; j < KNOWLEDGE_QUESTIONS.length; j++) {
    knowledgeMap[KNOWLEDGE_QUESTIONS[j].id] = KNOWLEDGE_QUESTIONS[j];
  }

  var questions = [];
  for (var k = 0; k < savedState.questionData.length; k++) {
    var qd = savedState.questionData[k];
    var q;
    if (qd.signId) {
      var sign = idMap[qd.signId];
      if (!sign) return null;
      q = generateSignQuestion(sign);
    } else if (qd.knowledgeId) {
      var kq = knowledgeMap[qd.knowledgeId];
      if (!kq) return null;
      q = generateKnowledgeQuestion(kq);
    } else {
      return null;
    }
    // 恢复已回答状态
    if (qd.answered) {
      q.answered = true;
      q.userAnswer = { isCorrect: !!qd.userAnswerCorrect, name: qd.userAnswerName || "" };
    }
    questions.push(q);
  }

  quizState.mode = savedState.mode;
  quizState.questions = questions;
  quizState.currentIndex = savedState.currentIndex || 0;
  quizState.correctCount = savedState.correctCount || 0;
  quizState.wrongCount = savedState.wrongCount || 0;
  quizState.answered = false;
  return true;
}

// ========== 续答弹窗 ==========

function showResumeDialog(savedState) {
  var modeLabel = savedState.mode === "comprehensive" ? "综合知识" : (savedState.mode === "wrong" ? "错题复习" : "图片标识");
  var total = savedState.mode === "comprehensive" ? COMPREHENSIVE_QUIZ_COUNT : IMAGE_QUIZ_COUNT;
  var idx = savedState.currentIndex + 1;
  var container = document.getElementById("quizContainer");
  container.innerHTML =
    '<div class="resume-dialog">' +
      '<div class="resume-dialog-card">' +
        '<div class="resume-dialog-icon">📝</div>' +
        '<h3>你有一场未完成的答题</h3>' +
        '<p>模式：<b>' + modeLabel + '</b><br>已答题 <b>' + (idx - 1) + '</b> / <b>' + total + '</b> 题<br>正确 <b>' + (savedState.correctCount || 0) + '</b> 题</p>' +
        '<div class="resume-dialog-actions">' +
          '<button class="btn-start" onclick="resumeQuiz()">继续答题</button>' +
          '<button class="btn-outline" onclick="discardAndStart()">重新开始</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function resumeQuiz(mode) {
  var savedState = getSavedQuizState(mode);
  if (!savedState) {
    renderQuizIntro();
    return;
  }
  if (!restoreQuiz(savedState)) {
    clearQuizState(mode);
    renderQuizIntro();
    return;
  }
  QUIZ_MODE = quizState.mode;
  renderQuestion();
}

function discardSavedState(mode) {
  clearQuizState(mode);
  renderQuizIntro();
}

function discardAndStart() {
  clearQuizState();
  renderQuizIntro();
}

// ========== 渲染刷题入口 ==========

function renderQuizIntro() {
  QUIZ_MODE = null;
  var container = document.getElementById("quizContainer");
  var history = getQuizHistory();
  var savedStates = getAnySavedState();

  var html = '<div class="quiz-intro">';

  // 多个续答横幅（每个模式一个）
  for (var si = 0; si < savedStates.length; si++) {
    var savedState = savedStates[si];
    var sMode = savedState.mode === "comprehensive" ? "📚 综合知识" : (savedState.mode === "wrong" ? "🔄 错题复习" : "🚫 图片标识");
    var sTotal = savedState.mode === "comprehensive" ? COMPREHENSIVE_QUIZ_COUNT : IMAGE_QUIZ_COUNT;
    var sIdx = savedState.currentIndex;
    html +=
      '<div class="resume-banner">' +
        '<div class="resume-banner-info">' +
          '<div class="resume-banner-icon">📝</div>' +
          '<div>' +
            '<div class="resume-banner-title">未完成的答题 — ' + sMode + '</div>' +
            '<div class="resume-banner-meta">已答 <b>' + sIdx + '</b> / ' + sTotal + ' 题 · 正确 <b>' + (savedState.correctCount || 0) + '</b> 题</div>' +
          '</div>' +
        '</div>' +
        '<div class="resume-banner-actions">' +
          '<button class="resume-btn" onclick="resumeQuiz(\'' + savedState._mode + '\')">继续</button>' +
          '<button class="resume-discard-btn" onclick="discardSavedState(\'' + savedState._mode + '\')">放弃</button>' +
        '</div>' +
      '</div>';
  }

  html +=
      '<div class="quiz-intro-icon">✏️</div>' +
      '<h2>选择刷题模式</h2>';

  // Mode 1: Image only
  html +=
    '<div class="quiz-mode-card" onclick="startQuiz(\'image\')">' +
      '<div class="quiz-mode-icon">🚫</div>' +
      '<div class="quiz-mode-info">' +
        '<div class="quiz-mode-title">图片标识</div>' +
        '<div class="quiz-mode-desc">只看交通标志图，选择正确名称</div>' +
        '<div class="quiz-mode-meta">' + IMAGE_QUIZ_COUNT + ' 题 · ' + (IMAGE_QUIZ_COUNT * POINTS_PER_QUESTION) + ' 分</div>' +
      '</div>' +
      '<div class="quiz-mode-arrow">→</div>' +
    '</div>';

  // Mode 2: Comprehensive
  html +=
    '<div class="quiz-mode-card" onclick="startQuiz(\'comprehensive\')">' +
      '<div class="quiz-mode-icon">📚</div>' +
      '<div class="quiz-mode-info">' +
        '<div class="quiz-mode-title">综合知识</div>' +
        '<div class="quiz-mode-desc">标志识别 + 交警手势 + 标线 + 信号灯 + 法规处罚</div>' +
        '<div class="quiz-mode-meta">' + COMPREHENSIVE_QUIZ_COUNT + ' 题 · ' + (COMPREHENSIVE_QUIZ_COUNT * POINTS_PER_QUESTION) + ' 分 · 9大模块</div>' +
      '</div>' +
      '<div class="quiz-mode-arrow">→</div>' +
    '</div>';

  // Mode 3: Wrong review
  var wrongImg = getWrongList("image");
  var wrongComp = getWrongList("comprehensive");
  var wrongTotal = wrongImg.concat(wrongComp).length;
  html +=
    '<div class="quiz-mode-card" onclick="startWrongQuiz()" style="border-color:#f59e0b;">' +
      '<div class="quiz-mode-icon">🔄</div>' +
      '<div class="quiz-mode-info">' +
        '<div class="quiz-mode-title">错题复习</div>' +
        '<div class="quiz-mode-desc">反复练习做错的题目，强化记忆</div>' +
        '<div class="quiz-mode-meta">' + (wrongTotal > 0 ? '共 <b>' + wrongTotal + '</b> 道错题 · ' : '暂无错题 · ') + '最多 20 题</div>' +
      '</div>' +
      '<div class="quiz-mode-arrow">→</div>' +
    '</div>';

  html += '<p style="color:var(--text-secondary);font-size:13px;margin-top:16px;">每题 <b>' + POINTS_PER_QUESTION + '</b> 分，不限时间，仔细作答</p>';

  // History
  if (history.length > 0) {
    html += '<div class="history-section" style="margin-top:24px;">';
    html += '<div class="history-title">📊 历史成绩</div>';
    html += '<div class="history-list">';

    var maxShow = Math.min(history.length, 8);
    for (var i = 0; i < maxShow; i++) {
      var h = history[i];
      var maxScore = h.mode === "comprehensive" ? COMPREHENSIVE_QUIZ_COUNT * POINTS_PER_QUESTION : IMAGE_QUIZ_COUNT * POINTS_PER_QUESTION;
      var pct = Math.round(h.score / maxScore * 100);
      var ringColor;
      if (pct >= 90) ringColor = "var(--success)";
      else if (pct >= 70) ringColor = "var(--primary)";
      else if (pct >= 50) ringColor = "var(--warning)";
      else ringColor = "var(--danger)";

      var modeLabel = h.mode === "comprehensive" ? "📚 综合" : "🚫 标识";

      var wrongItemsHtml = "";
      if (h.wrongItems && h.wrongItems.length > 0) {
        wrongItemsHtml = '<div class="history-wrong-list">';
        for (var wi = 0; wi < h.wrongItems.length; wi++) {
          var wiData = h.wrongItems[wi];
          if (typeof wiData === "string") {
            wrongItemsHtml += '<div class="history-wrong-detail"><span class="history-wrong-tag">' + wiData + '</span></div>';
          } else {
            wrongItemsHtml += '<div class="history-wrong-detail">' +
              '<div class="history-wrong-tag">' + (wiData.name || "") + '</div>';
            if (wiData.userAnswer) {
              wrongItemsHtml += '<div style="font-size:11px;color:#dc2626;margin-top:2px;">✗ 你答了: ' + wiData.userAnswer + '</div>';
            }
            if (wiData.correctAnswer) {
              wrongItemsHtml += '<div style="font-size:11px;color:#16a34a;">✓ 正确答案: ' + wiData.correctAnswer + '</div>';
            }
            wrongItemsHtml += '</div>';
          }
        }
        wrongItemsHtml += '</div>';
      }

      html +=
        '<div class="history-item" onclick="showHistoryDetail(' + i + ')">' +
          '<div class="history-score" style="color:' + ringColor + '">' + h.score + '<span>分</span></div>' +
          '<div class="history-info">' +
            '<div class="history-date">' + modeLabel + ' · ' + h.date + '</div>' +
            '<div class="history-detail">正确 ' + h.correct + ' / ' + h.total + ' 题 (' + pct + '%)' +
            (h.wrongItems && h.wrongItems.length ? ' · 错题 ' + h.wrongItems.length + ' 道' : '') +
            '</div>' +
          '</div>' +
          '<div class="history-arrow">→</div>' +
        '</div>';
    }

    if (history.length > 8) {
      html += '<div class="history-more">仅显示最近 8 条，共 ' + history.length + ' 条记录</div>';
    }

    html += '<button class="btn-clear btn-clear-history" onclick="clearQuizHistory()">清空历史记录</button>';
    html += '</div></div>';
  }

  container.innerHTML = html;
}

function showHistoryDetail(index) {
  var history = getQuizHistory();
  var h = history[index];
  if (!h) return;

  var modeLabel = h.mode === "comprehensive" ? "📚 综合知识" : (h.mode === "wrong" ? "🔄 错题复习" : "🚫 图片标识");
  var pct = Math.round(h.score / h.maxScore * 100);

  var html =
    '<div class="history-detail-page">' +
      '<div class="hd-top-bar">' +
        '<button class="hd-back-btn" onclick="renderQuizIntro()">← 返回</button>' +
        '<span>' + modeLabel + '</span>' +
        '<span style="font-size:12px;color:var(--text-muted)">' + h.date + '</span>' +
      '</div>' +

      '<div class="hd-score-section">' +
        '<div class="hd-score">' + h.score + '<span>分</span></div>' +
        '<div class="hd-stats">' +
          '<div class="hd-stat"><span style="color:var(--success)">✓ ' + h.correct + '</span> 正确</div>' +
          '<div class="hd-stat"><span style="color:var(--danger)">✗ ' + (h.total - h.correct) + '</span> 错误</div>' +
          '<div class="hd-stat">' + pct + '%</div>' +
        '</div>' +
      '</div>';

  if (h.wrongItems && h.wrongItems.length > 0) {
    html += '<div class="hd-wrong-section"><div class="hd-wrong-title">✗ 错题回顾 (' + h.wrongItems.length + ' 题)</div>';

    for (var wi = 0; wi < h.wrongItems.length; wi++) {
      var wiData = h.wrongItems[wi];
      if (typeof wiData === "string") {
        html += '<div class="hd-wrong-collapsed" onclick="expandWrongDetail(\'' + index + '\', ' + wi + ')">' +
          '<div class="hd-wrong-name">' + wiData + '</div>' +
          '<div class="hd-expand-hint">点击查看详情</div></div>';
      } else {
        // 折叠状态：只显示题干 + 答案摘要
        html +=
          '<div class="hd-wrong-collapsed" id="hd_collapsed_' + wi + '" onclick="expandWrongDetail(\'' + index + '\', ' + wi + ')">' +
            '<div class="hd-wrong-name">' + (wiData.name || wiData.question || "") + '</div>' +
            '<div class="hd-wrong-answer">' +
              (wiData.userAnswer ? '<span style="color:#dc2626">✗ 你答了: ' + wiData.userAnswer + '</span>' : '') +
              (wiData.correctAnswer ? '<span style="color:#16a34a;margin-left:8px;">✓ 答案: ' + wiData.correctAnswer + '</span>' : '') +
            '</div>' +
            '<div class="hd-expand-hint">点击查看详情</div>' +
          '</div>';
      }
    }
    // 展开区（默认隐藏）
    html += '<div class="hd-expanded-zone" id="hdExpandedZone" style="display:none"></div>';
    html += '</div>';
  }

  html += '</div>';

  document.getElementById("quizContainer").innerHTML = html;
  window.scrollTo(0, 0);
}

// 当前展开的错题状态
var _hdState = { historyIndex: null, wrongIndex: 0, total: 0 };

function expandWrongDetail(historyIndex, wi) {
  var history = getQuizHistory();
  var h = history[historyIndex];
  if (!h || !h.wrongItems) return;
  _hdState = { historyIndex: historyIndex, wrongIndex: wi, total: h.wrongItems.length };
  renderExpandedWrong(wi);
}

function renderExpandedWrong(wi) {
  var history = getQuizHistory();
  var h = history[_hdState.historyIndex];
  if (!h || !h.wrongItems) return;
  var wiData = h.wrongItems[wi];
  if (!wiData || typeof wiData === "string") return;

  var isFirst = wi <= 0;
  var isLast = wi >= _hdState.total - 1;
  var qCard = "";

  if (wiData.signId) {
    var sign = null;
    for (var si = 0; si < TRAFFIC_SIGNS.length; si++) {
      if (TRAFFIC_SIGNS[si].id === wiData.signId) { sign = TRAFFIC_SIGNS[si]; break; }
    }
    if (sign) {
      // 使用原题选项（从 data.js 查找其他标志名称），确保用户错误答案在列表中
      var allNames = [];
      for (var ai = 0; ai < TRAFFIC_SIGNS.length; ai++) {
        if (TRAFFIC_SIGNS[ai].id !== sign.id) allNames.push(TRAFFIC_SIGNS[ai].name);
      }
      var shuffledNames = shuffle(allNames);
      var opts = shuffle([
        { name: sign.name, isCorrect: true },
        { name: shuffledNames[0], isCorrect: false },
        { name: shuffledNames[1], isCorrect: false },
        { name: shuffledNames[2], isCorrect: false }
      ]);
      // 确保用户错误答案在列表中
      if (wiData.userAnswer && !opts.some(function(o) { return o.name === wiData.userAnswer; })) {
        opts[3] = { name: wiData.userAnswer, isCorrect: false };
      }
      var signImg = sign.img
        ? '<img src="' + sign.img + '" alt="" style="max-width:70px;max-height:80px;">'
        : (sign.svg || "");
      qCard =
        '<div class="quiz-question-card" style="box-shadow:none;border:1px solid var(--border-light);">' +
          '<div class="quiz-sign-img">' + signImg + '</div>' +
          '<p class="quiz-hint">这是什么交通标志？</p>' +
          '<div class="quiz-options">';
      for (var oi = 0; oi < opts.length; oi++) {
        var oc = "quiz-option disabled";
        if (opts[oi].isCorrect) oc += " show-correct";
        if (!opts[oi].isCorrect && opts[oi].name === wiData.userAnswer) oc += " wrong";
        qCard += '<button class="' + oc + '">' + opts[oi].name + '</button>';
      }
      qCard += '</div>' +
        '<div class="quiz-explanation-card wrong-exp" style="margin-top:10px;">' +
          '<div class="exp-header">✗ 回答错误</div>' +
          '<div class="exp-body">' + sign.description + '</div>' +
        '</div></div>';
    }
  } else if (wiData.knowledgeId) {
    var kq = null;
    for (var ki = 0; ki < KNOWLEDGE_QUESTIONS.length; ki++) {
      if (KNOWLEDGE_QUESTIONS[ki].id === wiData.knowledgeId) { kq = KNOWLEDGE_QUESTIONS[ki]; break; }
    }
    if (kq) {
      var kqImg = (kq.type === "image" && kq.image)
        ? '<div class="quiz-sign-img" style="min-height:auto;margin-bottom:8px;">' + kq.image + '</div>'
        : "";
      qCard =
        '<div class="quiz-question-card" style="box-shadow:none;border:1px solid var(--border-light);">' +
          kqImg +
          '<p class="quiz-hint">' + kq.question + '</p>' +
          '<div class="quiz-options">';
      for (var oi2 = 0; oi2 < kq.options.length; oi2++) {
        var oc2 = "quiz-option disabled";
        if (oi2 === kq.answer) oc2 += " show-correct";
        if (oi2 !== kq.answer && kq.options[oi2] === wiData.userAnswer) oc2 += " wrong";
        qCard += '<button class="' + oc2 + '">' + kq.options[oi2] + '</button>';
      }
      qCard += '</div>' +
        (kq.explanation ?
          '<div class="quiz-explanation-card wrong-exp" style="margin-top:10px;">' +
            '<div class="exp-header">✗ 回答错误</div>' +
            '<div class="exp-body">' + kq.explanation + '</div>' +
          '</div>' : '') +
        '</div>';
    }
  }

  // 隐藏所有折叠卡片
  var collapsed = document.querySelectorAll(".hd-wrong-collapsed");
  for (var c = 0; c < collapsed.length; c++) { collapsed[c].style.display = "none"; }

  var zone = document.getElementById("hdExpandedZone");
  zone.style.display = "block";
  zone.innerHTML =
    '<div class="hd-expanded-card" id="hdExpandedCard">' +
      qCard +
      '<button class="hd-close-btn" onclick="closeWrongExpand()">收起 ▲</button>' +
    '</div>' +
    '<div class="hd-expanded-nav" id="hdExpandedNav">' +
      '<button class="hd-nav-btn" ' + (isFirst ? 'disabled' : '') + ' onclick="navigateWrong(-1)">◀ 上一题</button>' +
      '<span class="hd-nav-pos">' + (wi + 1) + ' / ' + _hdState.total + '</span>' +
      '<button class="hd-nav-btn" ' + (isLast ? 'disabled' : '') + ' onclick="navigateWrong(1)">下一题 ▶</button>' +
    '</div>';
  zone.scrollIntoView({ behavior: "smooth" });

  // 滑动绑定在 zone 上（覆盖整个展开区域）
  setupHdSwipe();
}

function navigateWrong(delta) {
  var newIdx = _hdState.wrongIndex + delta;
  if (newIdx < 0 || newIdx >= _hdState.total) return;
  _hdState.wrongIndex = newIdx;
  renderExpandedWrong(newIdx);
}

function closeWrongExpand() {
  _hdState = { historyIndex: null, wrongIndex: 0, total: 0 };
  var zone = document.getElementById("hdExpandedZone");
  if (zone) zone.style.display = "none";
  var collapsed = document.querySelectorAll(".hd-wrong-collapsed");
  for (var c = 0; c < collapsed.length; c++) { collapsed[c].style.display = "block"; }
}

var _hdSwipeX = 0, _hdSwipeY = 0;
function _hdSwipeStart(e) { _hdSwipeX = e.touches[0].clientX; _hdSwipeY = e.touches[0].clientY; }
function _hdSwipeEnd(e) {
  var dx = e.changedTouches[0].clientX - _hdSwipeX;
  var dy = e.changedTouches[0].clientY - _hdSwipeY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < -30) navigateWrong(1);
    else if (dx > 30) navigateWrong(-1);
  }
}
function setupHdSwipe() {
  var zone = document.getElementById("hdExpandedZone");
  if (!zone) return;
  zone.removeEventListener("touchstart", _hdSwipeStart);
  zone.removeEventListener("touchend", _hdSwipeEnd);
  zone.addEventListener("touchstart", _hdSwipeStart);
  zone.addEventListener("touchend", _hdSwipeEnd);
}

function clearQuizHistory() {
  try {
    localStorage.removeItem("traffic_quiz_history");
  } catch (e) {}
  renderQuizIntro();
}

// ========== 开始答题 ==========

function exitQuiz() {
  if (quizState.currentIndex > 0) {
    saveQuizState();
  }
  if (confirm('确定要退出本次答题吗？' + (quizState.currentIndex > 0 ? '进度已保存，下次可继续。' : ''))) {
    renderQuizIntro();
    window.scrollTo(0, 0);
  }
}

// ========== 刷错题模式 ==========

function generateWrongQuiz() {
  var imgList = getWrongList("image");
  var compList = getWrongList("comprehensive");
  var all = imgList.concat(compList);

  // 按 signId/knowledgeId 去重，保留最高 wrongCount
  var deduped = {};
  for (var i = 0; i < all.length; i++) {
    var item = all[i];
    var key = item.type === "sign"
      ? ("sign_" + item.signId)
      : ("knowledge_" + item.knowledgeId);
    if (!deduped[key] || item.wrongCount > (deduped[key].wrongCount || 1)) {
      deduped[key] = item;
    }
  }

  var uniqueItems = [];
  for (var k in deduped) {
    if (deduped.hasOwnProperty(k)) uniqueItems.push(deduped[k]);
  }

  // 最多 20 题
  var picked = shuffle(uniqueItems).slice(0, 20);
  var questions = [];

  var signIdMap = {};
  for (var s = 0; s < TRAFFIC_SIGNS.length; s++) {
    signIdMap[TRAFFIC_SIGNS[s].id] = TRAFFIC_SIGNS[s];
  }
  var knowledgeIdMap = {};
  for (var q = 0; q < KNOWLEDGE_QUESTIONS.length; q++) {
    knowledgeIdMap[KNOWLEDGE_QUESTIONS[q].id] = KNOWLEDGE_QUESTIONS[q];
  }

  for (var p = 0; p < picked.length; p++) {
    var item = picked[p];
    if (item.type === "sign" && signIdMap[item.signId]) {
      questions.push(generateSignQuestion(signIdMap[item.signId]));
    } else if (item.type === "knowledge" && knowledgeIdMap[item.knowledgeId]) {
      questions.push(generateKnowledgeQuestion(knowledgeIdMap[item.knowledgeId]));
    }
  }

  return shuffle(questions);
}

function startWrongQuiz() {
  var allWrong = getWrongList("image").concat(getWrongList("comprehensive"));
  if (allWrong.length === 0) {
    alert("暂无错题记录，先去刷题吧！");
    return;
  }
  // 检查是否有未完成进度
  var savedState = getSavedQuizState("wrong");
  if (savedState && savedState.questionData && savedState.currentIndex < savedState.questionData.length) {
    if (!confirm("错题复习有一场未完成的考试，是否重新开始？之前的进度将丢失。")) return;
    clearQuizState("wrong");
  }
  QUIZ_MODE = "wrong";
  quizState.mode = "wrong";
  quizState.questions = generateWrongQuiz();
  quizState.currentIndex = 0;
  quizState.correctCount = 0;
  quizState.wrongCount = 0;
  saveQuizState();
  renderQuestion();
}

function startQuiz(mode) {
  // 检查该模式是否有未完成进度
  var savedState = getSavedQuizState(mode);
  if (savedState && savedState.questionData && savedState.currentIndex < savedState.questionData.length) {
    var modeLabel = mode === "comprehensive" ? "综合知识" : "图片标识";
    if (!confirm(modeLabel + "有一场未完成的考试，是否重新开始？之前的进度将丢失。")) return;
    clearQuizState(mode);
  }
  QUIZ_MODE = mode;
  quizState.mode = mode;

  if (mode === "comprehensive") {
    quizState.questions = generateComprehensiveQuiz();
  } else {
    quizState.questions = generateImageQuiz();
  }

  quizState.currentIndex = 0;
  quizState.correctCount = 0;
  quizState.wrongCount = 0;
  saveQuizState();
  renderQuestion();
}

// ========== 渲染题目 ==========

function renderQuestion() {
  if (quizState.currentIndex >= quizState.questions.length) {
    renderQuizResult();
    return;
  }

  saveQuizState();

  var q = quizState.questions[quizState.currentIndex];
  var total = quizState.questions.length;
  var idx = quizState.currentIndex + 1;
  var progressPercent = (quizState.currentIndex / total) * 100;

  var questionMedia = "";
  var questionText = "";
  var categoryLabel = "";

  if (q.type === "sign") {
    // 标志识别题 — 显示图片
    questionMedia = q.sign.img
      ? '<img src="' + q.sign.img + '" alt="" style="max-width:160px;max-height:120px;">'
      : q.sign.svg;
    questionText = "这是什么交通标志？";
    var cat = CATEGORIES[q.sign.category];
    categoryLabel = cat ? (cat.icon + " " + cat.name) : "";
  } else if (q.type === "knowledge") {
    // 知识题 — 可能有图片（交警手势）
    var kq = q.question;
    if (kq.type === "image" && kq.image) {
      questionMedia = '<div class="quiz-sign-img" style="min-height:auto;margin-bottom:10px;">' + kq.image + '</div>';
    }
    questionText = kq.question;
    var kcat = KNOWLEDGE_CATEGORIES[kq.category];
    categoryLabel = kcat ? (kcat.icon + " " + kcat.name) : "";
  }

  var html =
    '<div class="quiz-top-bar">' +
      '<button class="quiz-back-btn" onclick="exitQuiz()">← 返回</button>' +
      '<span class="quiz-mode-badge">' + (quizState.mode === 'comprehensive' ? '📚 综合知识' : (quizState.mode === 'wrong' ? '🔄 错题复习' : '🚫 图片标识')) + '</span>' +
    '</div>' +
    '<div class="quiz-progress">' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + progressPercent + '%"></div></div>' +
      '<span class="progress-text">' + idx + '/' + total + '</span>' +
    '</div>';

  if (categoryLabel) {
    html += '<div class="quiz-category-label">' + categoryLabel + '</div>';
  }

  html +=
    '<div class="quiz-question-card">' +
      (questionMedia ? '<div class="quiz-sign-img">' + questionMedia + '</div>' : '') +
      '<p class="quiz-hint">' + questionText + '</p>' +
      '<div class="quiz-options" id="quizOptions">';

  var isAnswered = q.answered;

  for (var i = 0; i < q.options.length; i++) {
    var optClass = "quiz-option";
    if (isAnswered) {
      optClass += " disabled";
      if (q.options[i].isCorrect) optClass += " show-correct";
      if (q.userAnswer && q.options[i].name === q.userAnswer.name && !q.options[i].isCorrect) optClass += " wrong";
    }
    html +=
      '<button class="' + optClass + '" data-idx="' + i + '"' +
      (isAnswered ? '' : ' onclick="selectAnswer(' + i + ')"') + '>' +
        q.options[i].name +
      '</button>';
  }

  html += '</div>';

  // 已回答的题显示解释
  if (isAnswered && q.userAnswer) {
    var wasCorrect = q.userAnswer.isCorrect;
    var exp = q.type === "sign" ? q.sign.description : (q.question ? q.question.explanation : "");
    if (exp) {
      html +=
        '<div class="quiz-explanation-card ' + (wasCorrect ? 'correct-exp' : 'wrong-exp') + '">' +
          '<div class="exp-header">' + (wasCorrect ? '✓ 回答正确！' : '✗ 回答错误') + '</div>' +
          '<div class="exp-body">' + exp + '</div>' +
        '</div>';
    }
  }

  html += '</div></div>';

  document.getElementById("quizContainer").innerHTML = html;

  // 已回答的题渲染导航栏（不倒计时）
  if (isAnswered) {
    setTimeout(function () { renderNavForAnswered(); }, 50);
  }
}

// ========== 选择答案 ==========

var _autoTimer = null;       // 自动跳转计时器
var _countdownInterval = null; // 倒计时更新

function selectAnswer(idx) {
  var q = quizState.questions[quizState.currentIndex];
  if (q.answered) return;
  q.answered = true;
  clearAutoAdvance();

  var chosen = q.options[idx];
  q.userAnswer = chosen;
  var buttons = document.querySelectorAll("#quizOptions .quiz-option");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.add("disabled");
  }

  var isCorrect = chosen.isCorrect;

  if (isCorrect) {
    quizState.correctCount++;
    buttons[idx].classList.add("correct");
  } else {
    quizState.wrongCount++;
    buttons[idx].classList.add("wrong");
    addWrongAnswer(q);

    for (var j = 0; j < q.options.length; j++) {
      if (q.options[j].isCorrect) {
        buttons[j].classList.add("show-correct");
        break;
      }
    }
  }

  // 获取解释文本
  var explanation = "";
  if (q.type === "sign") {
    explanation = q.sign.description;
  } else if (q.type === "knowledge" && q.question.explanation) {
    explanation = q.question.explanation;
  }

  // 显示知识点卡片 + 导航栏
  showPostAnswer(isCorrect, explanation);

  saveQuizState();

  // 最后一题不自动跳，等用户点交卷
  var isLast = quizState.currentIndex >= quizState.questions.length - 1;
  if (!isLast) {
    var delay = isCorrect ? 2500 : 3500;
    startAutoAdvance(delay);
  }
}

function showPostAnswer(isCorrect, explanation) {
  var card = document.querySelector(".quiz-question-card");
  if (!card) return;

  var total = quizState.questions.length;
  var idx = quizState.currentIndex + 1;
  var isLast = quizState.currentIndex >= total - 1;
  var hasPrev = quizState.currentIndex > 0;

  var navHtml;
  if (isLast) {
    navHtml =
      '<div class="quiz-nav-bar">' +
        '<button class="quiz-nav-btn' + (hasPrev ? '' : ' disabled') + '" onclick="quizNavPrev()"' + (hasPrev ? '' : ' disabled') + '>◀ 上一题</button>' +
        '<button class="quiz-nav-btn quiz-submit-btn" onclick="renderQuizResult()">📝 交卷</button>' +
      '</div>';
  } else {
    navHtml =
      '<div class="quiz-nav-bar">' +
        '<button class="quiz-nav-btn' + (hasPrev ? '' : ' disabled') + '" onclick="quizNavPrev()"' + (hasPrev ? '' : ' disabled') + '>◀ 上一题</button>' +
        '<span class="quiz-nav-countdown" id="countdownRing">' +
          '<svg width="36" height="36" class="countdown-svg"><circle cx="18" cy="18" r="15" fill="none" stroke="#ddd" stroke-width="3"/><circle cx="18" cy="18" r="15" fill="none" stroke="' + (isCorrect ? '#16a34a' : '#dc2626') + '" stroke-width="3" stroke-dasharray="94.2" stroke-dashoffset="0" id="countdownCircle" transform="rotate(-90 18 18)" style="transition: stroke-dashoffset 0.1s linear"/></svg>' +
        '</span>' +
        '<button class="quiz-nav-btn" onclick="quizNavNext()">下一题 ▶</button>' +
      '</div>';
  }

  var expHtml = explanation
    ? '<div class="quiz-explanation-card ' + (isCorrect ? 'correct-exp' : 'wrong-exp') + '">' +
        '<div class="exp-header">' + (isCorrect ? '✓ 回答正确！' : '✗ 回答错误') + '</div>' +
        '<div class="exp-body">' + explanation + '</div>' +
      '</div>'
    : '';

  card.innerHTML += expHtml;

  // 导航栏放在卡片外面，固定在底部
  var container = document.getElementById("quizContainer");
  var oldNav = document.getElementById("quizNavWrapper");
  if (oldNav) oldNav.remove();
  var navWrapper = document.createElement("div");
  navWrapper.id = "quizNavWrapper";
  navWrapper.innerHTML = navHtml;
  container.appendChild(navWrapper);

  // 绑定滑动手势
  setupSwipe(card);
}

function renderNavForAnswered() {
  // 已回答的题也渲染导航栏（不倒计时）
  var total = quizState.questions.length;
  var idx = quizState.currentIndex + 1;
  var isLast = quizState.currentIndex >= total - 1;
  var hasPrev = quizState.currentIndex > 0;

  var navHtml;
  if (isLast) {
    navHtml =
      '<div class="quiz-nav-bar">' +
        '<button class="quiz-nav-btn' + (hasPrev ? '' : ' disabled') + '" onclick="quizNavPrev()"' + (hasPrev ? '' : ' disabled') + '>◀ 上一题</button>' +
        '<button class="quiz-nav-btn quiz-submit-btn" onclick="renderQuizResult()">📝 交卷</button>' +
      '</div>';
  } else {
    navHtml =
      '<div class="quiz-nav-bar">' +
        '<button class="quiz-nav-btn' + (hasPrev ? '' : ' disabled') + '" onclick="quizNavPrev()"' + (hasPrev ? '' : ' disabled') + '>◀ 上一题</button>' +
        '<span class="quiz-nav-countdown" id="countdownRing">' +
          '<svg width="36" height="36"><circle cx="18" cy="18" r="15" fill="none" stroke="#ddd" stroke-width="3"/></svg>' +
        '</span>' +
        '<button class="quiz-nav-btn" onclick="quizNavNext()">下一题 ▶</button>' +
      '</div>';
  }

  var container = document.getElementById("quizContainer");
  var oldNav = document.getElementById("quizNavWrapper");
  if (oldNav) oldNav.remove();
  var navWrapper = document.createElement("div");
  navWrapper.id = "quizNavWrapper";
  navWrapper.innerHTML = navHtml;
  container.appendChild(navWrapper);
}

function clearAutoAdvance() {
  if (_autoTimer) { clearTimeout(_autoTimer); _autoTimer = null; }
  if (_countdownInterval) { clearInterval(_countdownInterval); _countdownInterval = null; }
}

function startAutoAdvance(delayMs) {
  clearAutoAdvance();
  var total = delayMs;
  var interval = 100; // update every 100ms
  var elapsed = 0;

  _countdownInterval = setInterval(function () {
    elapsed += interval;
    var pct = elapsed / total;
    var circle = document.getElementById("countdownCircle");
    if (circle) {
      var circumference = 94.2; // 2*pi*15
      circle.style.strokeDashoffset = (circumference * pct).toFixed(1);
    }
  }, interval);

  _autoTimer = setTimeout(function () {
    clearAutoAdvance();
    quizNavNext();
  }, delayMs);
}

function quizNavNext() {
  clearAutoAdvance();
  if (quizState.currentIndex >= quizState.questions.length - 1) {
    renderQuizResult();
    return;
  }
  quizState.currentIndex++;
  renderQuestion();
  window.scrollTo(0, 0);
}

function quizNavPrev() {
  clearAutoAdvance();
  if (quizState.currentIndex <= 0) return;
  quizState.currentIndex--;
  renderQuestion();
  window.scrollTo(0, 0);
}

// ========== 滑动手势 ==========

var _qzSwipeX = 0, _qzSwipeY = 0;
function _qzSwipeStart(e) { _qzSwipeX = e.touches[0].clientX; _qzSwipeY = e.touches[0].clientY; }
function _qzSwipeEnd(e) {
  var dx = e.changedTouches[0].clientX - _qzSwipeX;
  var dy = e.changedTouches[0].clientY - _qzSwipeY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
    clearAutoAdvance();
    if (dx < -40) quizNavNext();
    else if (dx > 40) quizNavPrev();
  }
}
function setupSwipe(card) {
  card.removeEventListener("touchstart", _qzSwipeStart);
  card.removeEventListener("touchend", _qzSwipeEnd);
  card.addEventListener("touchstart", _qzSwipeStart);
  card.addEventListener("touchend", _qzSwipeEnd);
}

// ========== 渲染结果 ==========

function renderQuizResult() {
  clearQuizState();
  var totalQuestions = quizState.questions.length;
  var mode = quizState.mode;
  var maxScore = totalQuestions * POINTS_PER_QUESTION;
  var score = quizState.correctCount * POINTS_PER_QUESTION;
  var wrongCount = quizState.wrongCount;

  var wrongItems = [];
  for (var i = 0; i < quizState.questions.length; i++) {
    var qq = quizState.questions[i];
    if (qq.userAnswer && !qq.userAnswer.isCorrect) {
      if (qq.type === "sign") {
        wrongItems.push({
          name: qq.sign.name,
          type: "sign",
          signId: qq.sign.id,
          correctAnswer: qq.sign.name,
          userAnswer: qq.userAnswer ? qq.userAnswer.name : ""
        });
      } else if (qq.type === "knowledge") {
        wrongItems.push({
          name: qq.question.question.substring(0, 40),
          type: "knowledge",
          knowledgeId: qq.question.id,
          question: qq.question.question,
          correctAnswer: qq.question.options[qq.question.answer],
          userAnswer: qq.userAnswer ? qq.userAnswer.name : ""
        });
      }
    }
  }

  saveQuizHistory({
    date: new Date().toLocaleString("zh-CN"),
    mode: quizState.mode,
    score: score,
    maxScore: maxScore,
    correct: quizState.correctCount,
    total: totalQuestions,
    wrongItems: wrongItems,
  });

  var pct = Math.round(score / maxScore * 100);
  var ringColor, ringBg, msg;
  if (pct >= 90) {
    ringColor = "var(--success)";
    ringBg = "var(--success-light)";
    msg = "太棒了！你对交通知识非常熟悉！";
  } else if (pct >= 70) {
    ringColor = "var(--primary)";
    ringBg = "var(--primary-light)";
    msg = "还不错，再看看错题巩固一下吧！";
  } else if (pct >= 50) {
    ringColor = "var(--warning)";
    ringBg = "var(--warning-light)";
    msg = "需要多加练习哦，很多知识还不太熟悉。";
  } else {
    ringColor = "var(--danger)";
    ringBg = "var(--danger-light)";
    msg = "基础比较薄弱，建议先看一遍学习模块再来刷题。";
  }

  var modeLabel = quizState.mode === "comprehensive" ? "综合知识" : (quizState.mode === "wrong" ? "错题复习" : "图片标识");
  var modeIcon = quizState.mode === "comprehensive" ? "📚" : (quizState.mode === "wrong" ? "🔄" : "🚫");

  var html =
    '<div class="quiz-result">' +
      '<div class="result-mode-label">' + modeIcon + ' ' + modeLabel + '</div>' +
      '<div class="result-score-ring" style="background:' + ringBg + ';border:4px solid ' + ringColor + ';color:' + ringColor + ';">' +
        '<div class="result-score-number">' + score + '</div>' +
        '<div class="result-score-label">分</div>' +
      '</div>' +
      '<p class="result-msg">' + msg + '</p>' +
      '<div class="result-stats">' +
        '<div class="result-stat"><div class="result-stat-val" style="color:var(--success)">' + quizState.correctCount + '</div><div class="result-stat-lbl">正确</div></div>' +
        '<div class="result-stat"><div class="result-stat-val" style="color:var(--danger)">' + wrongCount + '</div><div class="result-stat-lbl">错误</div></div>' +
        '<div class="result-stat"><div class="result-stat-val">' + pct + '%</div><div class="result-stat-lbl">正确率</div></div>' +
      '</div>' +
      '<div class="result-actions">' +
        '<button class="btn-start" onclick="startQuiz(\'' + quizState.mode + '\')">再来一组</button>' +
        '<button class="btn-outline" onclick="renderQuizIntro()">换模式</button>' +
        (wrongCount > 0 ? '<button class="btn-outline" onclick="switchTab(\'wrong\')">查看错题 (' + wrongCount + ')</button>' : '') +
      '</div>' +
    '</div>';

  document.getElementById("quizContainer").innerHTML = html;

  // 重置内存状态，防止残留
  quizState = {
    mode: null,
    questions: [],
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
  };
}

// ========== 渲染错题页面 ==========

function renderWrongPage() {
  // 合并两个模式的错题
  var imgList = getWrongList("image");
  var compList = getWrongList("comprehensive");
  var list = imgList.concat(compList);

  // 按时间排序
  list.sort(function (a, b) {
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    return 0;
  });

  var container = document.getElementById("wrongContainer");

  if (list.length === 0) {
    container.innerHTML =
      '<div class="wrong-empty">' +
        '<div class="wrong-empty-icon">🎉</div>' +
        '<p>暂无错题记录</p>' +
        '<p style="font-size:13px;margin-top:4px">快去刷题吧！</p>' +
      '</div>';
    return;
  }

  // 按类别分组
  var groups = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var gkey = item.category || "other";
    if (!groups[gkey]) groups[gkey] = [];
    groups[gkey].push(item);
  }

  // 类别排序
  var catOrder = ["warning","prohibition","mandatory","guide","auxiliary",
                   "hand_signals","road_markings","traffic_lights","right_of_way",
                   "speed_limits","demerit_points","expressway","penalties","safety"];
  var sortedKeys = [];
  for (var c = 0; c < catOrder.length; c++) {
    if (groups[catOrder[c]]) sortedKeys.push(catOrder[c]);
  }
  for (var gkey in groups) {
    if (groups.hasOwnProperty(gkey) && sortedKeys.indexOf(gkey) < 0) sortedKeys.push(gkey);
  }

  var html =
    '<div class="wrong-header">' +
      '<span class="wrong-count">共 ' + list.length + ' 道错题</span>' +
      '<button class="btn-clear" onclick="clearAllWrongAnswers()">清空全部</button>' +
    '</div>' +
    '<div class="wrong-persistence-note">💡 错题保存在浏览器本地，不清除缓存就不会丢失。关闭浏览器、重启手机均不影响。</div>';

  // 分类筛选 tabs
  html += '<div class="wrong-category-tabs" id="wrongCategoryTabs">';
  html += '<button class="wrong-cat-tab active" onclick="filterWrongCategory(\'all\')">全部 (' + list.length + ')</button>';
  for (var g = 0; g < sortedKeys.length; g++) {
    var gkey = sortedKeys[g];
    var items = groups[gkey];
    var gname2 = gkey;
    var gicon2 = "";
    if (CATEGORIES[gkey]) { gname2 = CATEGORIES[gkey].name; gicon2 = CATEGORIES[gkey].icon; }
    else if (KNOWLEDGE_CATEGORIES[gkey]) { gname2 = KNOWLEDGE_CATEGORIES[gkey].name; gicon2 = KNOWLEDGE_CATEGORIES[gkey].icon; }
    html += '<button class="wrong-cat-tab" onclick="filterWrongCategory(\'' + gkey + '\')">' + gicon2 + ' ' + gname2 + ' (' + items.length + ')</button>';
  }
  html += '</div>';
  html += '<div class="wrong-list" id="wrongList">';

  for (var g = 0; g < sortedKeys.length; g++) {
    var gkey = sortedKeys[g];
    var items = groups[gkey];

    // 获取类别名
    var gname = gkey;
    var gicon = "";
    if (CATEGORIES[gkey]) { gname = CATEGORIES[gkey].name; gicon = CATEGORIES[gkey].icon; }
    else if (KNOWLEDGE_CATEGORIES[gkey]) { gname = KNOWLEDGE_CATEGORIES[gkey].name; gicon = KNOWLEDGE_CATEGORIES[gkey].icon; }

    html += '<div class="wrong-group" data-wrong-cat="' + gkey + '">' +
      '<div class="wrong-group-title">' + gicon + ' ' + gname + ' <span class="wrong-group-count">' + items.length + '题</span></div>';

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var modeLabel = item.mode === "comprehensive" ? "📚 综合" : "🚫 标识";

      if (item.type === "sign") {
        var signMedia = item.img
          ? '<img src="' + item.img + '" alt="" style="max-width:48px;max-height:48px;">'
          : (item.svg || '');
        html +=
          '<div class="wrong-item">' +
            '<div class="wrong-item-header">' +
              (signMedia ? '<div class="wrong-item-img">' + signMedia + '</div>' : '') +
              '<div class="wrong-item-info">' +
                '<div class="wrong-item-correct">✓ ' + item.name + '</div>' +
                (item.userAnswer ? '<div class="wrong-item-user">✗ 你的答案: ' + item.userAnswer + '</div>' : '') +
                '<div class="wrong-item-time">' + item.time + '</div>' +
                (item.wrongCount > 1 ? '<div class="wrong-count-badge">错了 <b>' + item.wrongCount + '</b> 次</div>' : '') +
              '</div>' +
            '</div>' +
          '</div>';
      } else if (item.type === "knowledge") {
        var kqImg = item.handImage || "";
        html +=
          '<div class="wrong-item">' +
            '<div class="wrong-item-header">' +
              (kqImg ? '<div class="wrong-item-img">' + kqImg + '</div>' : '') +
              '<div class="wrong-item-info" style="flex:1">' +
                '<div class="wrong-item-question">' + (item.questionText || "") + '</div>' +
                '<div class="wrong-item-correct">✓ ' + (item.correctAnswer || "") + '</div>' +
                (item.userAnswer ? '<div class="wrong-item-user">✗ 你的答案: ' + item.userAnswer + '</div>' : '') +
                '<div class="wrong-item-time">' + item.time + '</div>' +
                (item.wrongCount > 1 ? '<div class="wrong-count-badge">错了 <b>' + item.wrongCount + '</b> 次</div>' : '') +
              '</div>' +
            '</div>' +
          '</div>';
      }
    }
    html += '</div>';
  }

  container.innerHTML = html;
}

function filterWrongCategory(cat) {
  var tabs = document.querySelectorAll(".wrong-cat-tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
    if (tabs[i].textContent.indexOf(cat) === 0 || (cat === "all" && tabs[i].textContent.indexOf("全部") === 0)) {
      tabs[i].classList.add("active");
    }
  }
  var groups = document.querySelectorAll(".wrong-group");
  for (var j = 0; j < groups.length; j++) {
    if (cat === "all" || groups[j].getAttribute("data-wrong-cat") === cat) {
      groups[j].style.display = "block";
    } else {
      groups[j].style.display = "none";
    }
  }
}

function clearAllWrongAnswers() {
  clearWrongList("image");
  clearWrongList("comprehensive");
  renderWrongPage();
}
