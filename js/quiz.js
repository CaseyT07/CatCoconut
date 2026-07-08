// ============================================
//   刷题引擎 & 错题管理 (v2 — improved)
//   双模式：图片标识 / 综合知识
// ============================================

let QUIZ_MODE = null; // "image" | "comprehensive"

const IMAGE_QUIZ_COUNT = 20;
const COMPREHENSIVE_QUIZ_COUNT = 30;
const POINTS_PER_QUESTION = 5;

let quizState = {
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
  const key = "traffic_wrong_list_" + mode;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveWrongList(list, mode) {
  mode = mode || QUIZ_MODE || "image";
  const key = "traffic_wrong_list_" + mode;
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (e) {
    console.warn("Failed to save wrong list:", e);
  }
}

function addWrongAnswer(questionData) {
  const mode = quizState.mode || "image";
  // 错题复习模式下不重复记录
  if (mode === "wrong") return;
  const list = getWrongList(mode);

  // 检查是否已存在相同题目，存在则仅增加计数
  const dupKey = questionData.sign
    ? ("sign_" + questionData.sign.id)
    : ("knowledge_" + (questionData.question ? questionData.question.id : ""));
  let existing = null;
  for (let i = 0; i < list.length; i++) {
    const ek = list[i].type === "sign"
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
    const entry = {
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
    const raw = localStorage.getItem("traffic_quiz_history");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveQuizHistory(record) {
  let history = getQuizHistory();
  // 去重：如果最近一条记录和当前同模式、同时间，跳过
  if (history.length > 0) {
    const last = history[0];
    if (last.date === record.date && last.mode === record.mode && last.score === record.score) {
      return;
    }
  }
  history.unshift(record);
  if (history.length > 50) history = history.slice(0, 50);
  try {
    localStorage.setItem("traffic_quiz_history", JSON.stringify(history));
  } catch (e) {
    console.warn("Failed to save quiz history:", e);
  }
}

// ========== 答题状态存取 ==========

function _stateKey(mode) {
  mode = mode || quizState.mode || "image";
  return "traffic_quiz_state_" + mode;
}

function saveQuizState() {
  if (!quizState.questions.length) return;
  if (quizState.currentIndex >= quizState.questions.length) return;
  const state = {
    mode: quizState.mode,
    currentIndex: quizState.currentIndex,
    correctCount: quizState.correctCount,
    wrongCount: quizState.wrongCount,
    questionData: [],
  };
  for (let i = 0; i < quizState.questions.length; i++) {
    const q = quizState.questions[i];
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
  } catch (e) {
    console.warn("Failed to save quiz state:", e);
  }
}

function getSavedQuizState(mode) {
  mode = mode || "image";
  try {
    const raw = localStorage.getItem(_stateKey(mode));
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
  const modes = ["image", "comprehensive", "wrong"];
  const results = [];
  for (let i = 0; i < modes.length; i++) {
    const s = getSavedQuizState(modes[i]);
    if (s && s.questionData && s.currentIndex < s.questionData.length) {
      s._mode = modes[i];
      results.push(s);
    }
  }
  return results;
}

// ========== 工具函数 ==========

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

// ========== 随机抽题 ==========

function weightedPickSigns(count) {
  const pool = [];
  for (let i = 0; i < TRAFFIC_SIGNS.length; i++) {
    const w = TRAFFIC_SIGNS[i].weight || 2;
    for (let j = 0; j < w; j++) {
      pool.push(TRAFFIC_SIGNS[i]);
    }
  }
  const shuffled = shuffle(pool);
  const selected = [];
  const seen = {};
  for (let k = 0; k < shuffled.length && selected.length < count; k++) {
    const sign = shuffled[k];
    if (!seen[sign.id]) {
      seen[sign.id] = true;
      selected.push(sign);
    }
  }
  return selected;
}

function generateSignQuestion(sign) {
  const others = TRAFFIC_SIGNS.filter(function (s) {
    return s.id !== sign.id;
  });
  const wrongs = shuffle(others).slice(0, 3);
  const options = [
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
  const options = [];
  for (let i = 0; i < kq.options.length; i++) {
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
  const signs = weightedPickSigns(IMAGE_QUIZ_COUNT);
  return signs.map(function (sign) {
    return generateSignQuestion(sign);
  });
}

function generateComprehensiveQuiz() {
  const questions = [];

  // 8 道标志识别题
  const signs = weightedPickSigns(8);
  for (let i = 0; i < signs.length; i++) {
    questions.push(generateSignQuestion(signs[i]));
  }

  // 安全检查：知识库是否已加载
  if (typeof KNOWLEDGE_CATEGORIES === 'undefined' || typeof KNOWLEDGE_QUESTIONS === 'undefined') {
    const extraSigns = weightedPickSigns(22);
    for (let e = 0; e < extraSigns.length; e++) {
      questions.push(generateSignQuestion(extraSigns[e]));
    }
    return shuffle(questions);
  }

  // 22 道知识题，均匀分布在各模块
  const catKeys = Object.keys(KNOWLEDGE_CATEGORIES);
  const perCat = Math.floor(22 / catKeys.length);
  const extra = 22 - perCat * catKeys.length;

  for (let c = 0; c < catKeys.length; c++) {
    const catId = catKeys[c];
    const catQuestions = KNOWLEDGE_QUESTIONS.filter(function (q) {
      return q.category === catId;
    });
    const pickCount = perCat + (c < extra ? 1 : 0);
    const picked = shuffle(catQuestions).slice(0, pickCount);
    for (let p = 0; p < picked.length; p++) {
      questions.push(generateKnowledgeQuestion(picked[p]));
    }
  }

  return shuffle(questions);
}

// ========== 恢复答题 ==========

function restoreQuiz(savedState) {
  const idMap = {};
  for (let i = 0; i < TRAFFIC_SIGNS.length; i++) {
    idMap[TRAFFIC_SIGNS[i].id] = TRAFFIC_SIGNS[i];
  }

  const knowledgeMap = {};
  for (let j = 0; j < KNOWLEDGE_QUESTIONS.length; j++) {
    knowledgeMap[KNOWLEDGE_QUESTIONS[j].id] = KNOWLEDGE_QUESTIONS[j];
  }

  const questions = [];
  for (let k = 0; k < savedState.questionData.length; k++) {
    const qd = savedState.questionData[k];
    let q;
    if (qd.signId) {
      const sign = idMap[qd.signId];
      if (!sign) return null;
      q = generateSignQuestion(sign);
    } else if (qd.knowledgeId) {
      const kq = knowledgeMap[qd.knowledgeId];
      if (!kq) return null;
      q = generateKnowledgeQuestion(kq);
    } else {
      return null;
    }
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
  const modeLabel = savedState.mode === "comprehensive" ? "综合知识" : (savedState.mode === "wrong" ? "错题复习" : "图片标识");
  const total = savedState.mode === "comprehensive" ? COMPREHENSIVE_QUIZ_COUNT : IMAGE_QUIZ_COUNT;
  const idx = savedState.currentIndex + 1;
  const container = document.getElementById("quizContainer");
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
  const savedState = getSavedQuizState(mode);
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
  const container = document.getElementById("quizContainer");
  const history = getQuizHistory();
  const savedStates = getAnySavedState();

  let html = '<div class="quiz-intro">';

  // 多个续答横幅（每个模式一个）
  for (let si = 0; si < savedStates.length; si++) {
    const savedState = savedStates[si];
    const sMode = savedState.mode === "comprehensive" ? "📚 综合知识" : (savedState.mode === "wrong" ? "🔄 错题复习" : "🚫 图片标识");
    const sTotal = savedState.mode === "comprehensive" ? COMPREHENSIVE_QUIZ_COUNT : IMAGE_QUIZ_COUNT;
    const sIdx = savedState.currentIndex;
    html +=
      '<div class="resume-banner">' +
        '<div class="resume-banner-info">' +
          '<div class="resume-banner-icon" aria-hidden="true">📝</div>' +
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
      '<div class="quiz-intro-icon" aria-hidden="true">✏️</div>' +
      '<h2>选择刷题模式</h2>';

  // Mode 1: Image only
  html +=
    '<div class="quiz-mode-card" onclick="startQuiz(\'image\')" tabindex="0" role="button"'
    + ' aria-label="图片标识模式，' + IMAGE_QUIZ_COUNT + '题"' +
    ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();startQuiz(\'image\');}">' +
      '<div class="quiz-mode-icon" aria-hidden="true">🚫</div>' +
      '<div class="quiz-mode-info">' +
        '<div class="quiz-mode-title">图片标识</div>' +
        '<div class="quiz-mode-desc">只看交通标志图，选择正确名称</div>' +
        '<div class="quiz-mode-meta">' + IMAGE_QUIZ_COUNT + ' 题 · ' + (IMAGE_QUIZ_COUNT * POINTS_PER_QUESTION) + ' 分</div>' +
      '</div>' +
      '<div class="quiz-mode-arrow" aria-hidden="true">→</div>' +
    '</div>';

  // Mode 2: Comprehensive
  html +=
    '<div class="quiz-mode-card" onclick="startQuiz(\'comprehensive\')" tabindex="0" role="button"'
    + ' aria-label="综合知识模式，' + COMPREHENSIVE_QUIZ_COUNT + '题，9大模块"' +
    ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();startQuiz(\'comprehensive\');}">' +
      '<div class="quiz-mode-icon" aria-hidden="true">📚</div>' +
      '<div class="quiz-mode-info">' +
        '<div class="quiz-mode-title">综合知识</div>' +
        '<div class="quiz-mode-desc">标志识别 + 交警手势 + 标线 + 信号灯 + 法规处罚</div>' +
        '<div class="quiz-mode-meta">' + COMPREHENSIVE_QUIZ_COUNT + ' 题 · ' + (COMPREHENSIVE_QUIZ_COUNT * POINTS_PER_QUESTION) + ' 分 · 9大模块</div>' +
      '</div>' +
      '<div class="quiz-mode-arrow" aria-hidden="true">→</div>' +
    '</div>';

  // Mode 3: Wrong review
  const wrongImg = getWrongList("image");
  const wrongComp = getWrongList("comprehensive");
  const wrongTotal = wrongImg.concat(wrongComp).length;
  html +=
    '<div class="quiz-mode-card" onclick="startWrongQuiz()" style="border-color:#f59e0b;" tabindex="0" role="button"'
    + ' aria-label="错题复习"' +
    ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();startWrongQuiz();}">' +
      '<div class="quiz-mode-icon" aria-hidden="true">🔄</div>' +
      '<div class="quiz-mode-info">' +
        '<div class="quiz-mode-title">错题复习</div>' +
        '<div class="quiz-mode-desc">反复练习做错的题目，强化记忆</div>' +
        '<div class="quiz-mode-meta">' + (wrongTotal > 0 ? '共 <b>' + wrongTotal + '</b> 道错题 · ' : '暂无错题 · ') + '最多 20 题</div>' +
      '</div>' +
      '<div class="quiz-mode-arrow" aria-hidden="true">→</div>' +
    '</div>';

  html += '<p style="color:var(--text-secondary);font-size:13px;margin-top:16px;">每题 <b>' + POINTS_PER_QUESTION + '</b> 分，不限时间，仔细作答</p>';

  // History
  if (history.length > 0) {
    html += '<div class="history-section" style="margin-top:24px;">';
    html += '<div class="history-title">📊 历史成绩</div>';
    html += '<div class="history-list">';

    const maxShow = Math.min(history.length, 8);
    for (let i = 0; i < maxShow; i++) {
      const h = history[i];
      const maxScore = h.mode === "comprehensive" ? COMPREHENSIVE_QUIZ_COUNT * POINTS_PER_QUESTION : IMAGE_QUIZ_COUNT * POINTS_PER_QUESTION;
      const pct = Math.round(h.score / maxScore * 100);
      let ringColor;
      if (pct >= 90) ringColor = "var(--success)";
      else if (pct >= 70) ringColor = "var(--primary)";
      else if (pct >= 50) ringColor = "var(--warning)";
      else ringColor = "var(--danger)";

      const modeLabel = h.mode === "comprehensive" ? "📚 综合" : "🚫 标识";

      html +=
        '<div class="history-item" onclick="showHistoryDetail(' + i + ')" tabindex="0" role="button"'
        + ' aria-label="查看历史成绩 ' + (i+1) + '"'
        + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();showHistoryDetail(' + i + ');}">' +
          '<div class="history-score" style="color:' + ringColor + '">' + h.score + '<span>分</span></div>' +
          '<div class="history-info">' +
            '<div class="history-date">' + modeLabel + ' · ' + h.date + '</div>' +
            '<div class="history-detail">正确 ' + h.correct + ' / ' + h.total + ' 题 (' + pct + '%)' +
            (h.wrongItems && h.wrongItems.length ? ' · 错题 ' + h.wrongItems.length + ' 道' : '') +
            '</div>' +
          '</div>' +
          '<div class="history-arrow" aria-hidden="true">→</div>' +
        '</div>';
    }

    if (history.length > 8) {
      html += '<div class="history-more">仅显示最近 8 条，共 ' + history.length + ' 条记录</div>';
    }

    html += '<button class="btn-clear btn-clear-history" onclick="clearQuizHistoryWithConfirm()">清空历史记录</button>';
    html += '</div></div>';
  }

  container.innerHTML = html;
}

function clearQuizHistoryWithConfirm() {
  showConfirm('清空历史记录', '确定要删除所有历史成绩吗？此操作不可撤销。', '清空', '取消', function () {
    clearQuizHistory();
    showToast('历史记录已清空');
  });
}

function clearAllWrongAnswersWithConfirm() {
  showConfirm('清空错题记录', '确定要删除所有错题记录吗？此操作不可撤销。', '确认删除', '取消', function () {
    clearAllWrongAnswers();
    showToast('错题记录已清空');
  });
}

function showHistoryDetail(index) {
  const history = getQuizHistory();
  const h = history[index];
  if (!h) return;

  const modeLabel = h.mode === "comprehensive" ? "📚 综合知识" : (h.mode === "wrong" ? "🔄 错题复习" : "🚫 图片标识");
  const pct = Math.round(h.score / h.maxScore * 100);

  let html =
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

    for (let wi = 0; wi < h.wrongItems.length; wi++) {
      const wiData = h.wrongItems[wi];
      if (typeof wiData === "string") {
        html += '<div class="hd-wrong-collapsed" onclick="expandWrongDetail(\'' + index + '\', ' + wi + ')" tabindex="0" role="button"'
          + ' onkeydown="if(event.key===\'Enter\'){expandWrongDetail(\'' + index + '\', ' + wi + ');}">' +
          '<div class="hd-wrong-name">' + wiData + '</div>' +
          '<div class="hd-expand-hint">点击查看详情</div></div>';
      } else {
        html +=
          '<div class="hd-wrong-collapsed" id="hd_collapsed_' + wi + '" onclick="expandWrongDetail(\'' + index + '\', ' + wi + ')" tabindex="0" role="button"'
          + ' onkeydown="if(event.key===\'Enter\'){expandWrongDetail(\'' + index + '\', ' + wi + ');}">' +
            '<div class="hd-wrong-name">' + (wiData.name || wiData.question || "") + '</div>' +
            '<div class="hd-wrong-answer">' +
              (wiData.userAnswer ? '<span style="color:#dc2626">✗ 你答了: ' + wiData.userAnswer + '</span>' : '') +
              (wiData.correctAnswer ? '<span style="color:#16a34a;margin-left:8px;">✓ 答案: ' + wiData.correctAnswer + '</span>' : '') +
            '</div>' +
            '<div class="hd-expand-hint">点击查看详情</div>' +
          '</div>';
      }
    }
    html += '<div class="hd-expanded-zone" id="hdExpandedZone" style="display:none"></div>';
    html += '</div>';
  }

  html += '</div>';

  document.getElementById("quizContainer").innerHTML = html;
  window.scrollTo(0, 0);
}

// 当前展开的错题状态
let _hdState = { historyIndex: null, wrongIndex: 0, total: 0 };

function expandWrongDetail(historyIndex, wi) {
  const history = getQuizHistory();
  const h = history[historyIndex];
  if (!h || !h.wrongItems) return;
  _hdState = { historyIndex: historyIndex, wrongIndex: wi, total: h.wrongItems.length };
  renderExpandedWrong(wi);
}

function renderExpandedWrong(wi) {
  const history = getQuizHistory();
  const h = history[_hdState.historyIndex];
  if (!h || !h.wrongItems) return;
  const wiData = h.wrongItems[wi];
  if (!wiData || typeof wiData === "string") return;

  const isFirst = wi <= 0;
  const isLast = wi >= _hdState.total - 1;
  let qCard = "";

  if (wiData.signId) {
    let sign = null;
    for (let si = 0; si < TRAFFIC_SIGNS.length; si++) {
      if (TRAFFIC_SIGNS[si].id === wiData.signId) { sign = TRAFFIC_SIGNS[si]; break; }
    }
    if (sign) {
      const allNames = [];
      for (let ai = 0; ai < TRAFFIC_SIGNS.length; ai++) {
        if (TRAFFIC_SIGNS[ai].id !== sign.id) allNames.push(TRAFFIC_SIGNS[ai].name);
      }
      const shuffledNames = shuffle(allNames);
      const opts = shuffle([
        { name: sign.name, isCorrect: true },
        { name: shuffledNames[0], isCorrect: false },
        { name: shuffledNames[1], isCorrect: false },
        { name: shuffledNames[2], isCorrect: false }
      ]);
      if (wiData.userAnswer && !opts.some(function(o) { return o.name === wiData.userAnswer; })) {
        opts[3] = { name: wiData.userAnswer, isCorrect: false };
      }
      const signImg = sign.img
        ? '<img src="' + sign.img + '" alt="' + sign.name + '" style="max-width:70px;max-height:80px;"'
          + ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"'
          + '><div class="img-error-fallback" style="display:none;width:70px;height:80px;">' + (sign.svg || '🖼') + '</div>'
        : (sign.svg || "");
      qCard =
        '<div class="quiz-question-card" style="box-shadow:none;border:1px solid var(--border-light);">' +
          '<div class="quiz-sign-img">' + signImg + '</div>' +
          '<p class="quiz-hint">这是什么交通标志？</p>' +
          '<div class="quiz-options">';
      for (let oi = 0; oi < opts.length; oi++) {
        let oc = "quiz-option disabled";
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
    let kq = null;
    for (let ki = 0; ki < KNOWLEDGE_QUESTIONS.length; ki++) {
      if (KNOWLEDGE_QUESTIONS[ki].id === wiData.knowledgeId) { kq = KNOWLEDGE_QUESTIONS[ki]; break; }
    }
    if (kq) {
      const kqImg = (kq.type === "image" && kq.image)
        ? '<div class="quiz-sign-img" style="min-height:auto;margin-bottom:8px;">' + kq.image + '</div>'
        : "";
      qCard =
        '<div class="quiz-question-card" style="box-shadow:none;border:1px solid var(--border-light);">' +
          kqImg +
          '<p class="quiz-hint">' + kq.question + '</p>' +
          '<div class="quiz-options">';
      for (let oi2 = 0; oi2 < kq.options.length; oi2++) {
        let oc2 = "quiz-option disabled";
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

  const collapsed = document.querySelectorAll(".hd-wrong-collapsed");
  for (let c = 0; c < collapsed.length; c++) { collapsed[c].style.display = "none"; }

  const zone = document.getElementById("hdExpandedZone");
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

  setupHdSwipe();
}

function navigateWrong(delta) {
  const newIdx = _hdState.wrongIndex + delta;
  if (newIdx < 0 || newIdx >= _hdState.total) return;
  _hdState.wrongIndex = newIdx;
  renderExpandedWrong(newIdx);
}

function closeWrongExpand() {
  _hdState = { historyIndex: null, wrongIndex: 0, total: 0 };
  const zone = document.getElementById("hdExpandedZone");
  if (zone) zone.style.display = "none";
  const collapsed = document.querySelectorAll(".hd-wrong-collapsed");
  for (let c = 0; c < collapsed.length; c++) { collapsed[c].style.display = "block"; }
}

let _hdSwipeX = 0, _hdSwipeY = 0;
function _hdSwipeStart(e) { _hdSwipeX = e.touches[0].clientX; _hdSwipeY = e.touches[0].clientY; }
function _hdSwipeEnd(e) {
  const dx = e.changedTouches[0].clientX - _hdSwipeX;
  const dy = e.changedTouches[0].clientY - _hdSwipeY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < -30) navigateWrong(1);
    else if (dx > 30) navigateWrong(-1);
  }
}
function setupHdSwipe() {
  const zone = document.getElementById("hdExpandedZone");
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
  showConfirm('退出答题', '确定要退出本次答题吗？' + (quizState.currentIndex > 0 ? '进度已保存，下次可继续。' : ''), '退出', '继续答题', function () {
    renderQuizIntro();
    window.scrollTo(0, 0);
  });
}

// ========== 刷错题模式 ==========

function generateWrongQuiz() {
  const imgList = getWrongList("image");
  const compList = getWrongList("comprehensive");
  const all = imgList.concat(compList);

  // 按 signId/knowledgeId 去重，保留最高 wrongCount
  const deduped = {};
  for (let i = 0; i < all.length; i++) {
    const item = all[i];
    const key = item.type === "sign"
      ? ("sign_" + item.signId)
      : ("knowledge_" + item.knowledgeId);
    if (!deduped[key] || item.wrongCount > (deduped[key].wrongCount || 1)) {
      deduped[key] = item;
    }
  }

  const uniqueItems = Object.keys(deduped).map(function(k) { return deduped[k]; });

  // 最多 20 题
  const picked = shuffle(uniqueItems).slice(0, 20);
  const questions = [];

  const signIdMap = {};
  for (let s = 0; s < TRAFFIC_SIGNS.length; s++) {
    signIdMap[TRAFFIC_SIGNS[s].id] = TRAFFIC_SIGNS[s];
  }
  const knowledgeIdMap = {};
  for (let q = 0; q < KNOWLEDGE_QUESTIONS.length; q++) {
    knowledgeIdMap[KNOWLEDGE_QUESTIONS[q].id] = KNOWLEDGE_QUESTIONS[q];
  }

  for (let p = 0; p < picked.length; p++) {
    const item = picked[p];
    if (item.type === "sign" && signIdMap[item.signId]) {
      questions.push(generateSignQuestion(signIdMap[item.signId]));
    } else if (item.type === "knowledge" && knowledgeIdMap[item.knowledgeId]) {
      questions.push(generateKnowledgeQuestion(knowledgeIdMap[item.knowledgeId]));
    }
  }

  return shuffle(questions);
}

function startWrongQuiz() {
  const allWrong = getWrongList("image").concat(getWrongList("comprehensive"));
  if (allWrong.length === 0) {
    showToast('暂无错题记录，先去刷题吧！');
    return;
  }
  const savedState = getSavedQuizState("wrong");
  if (savedState && savedState.questionData && savedState.currentIndex < savedState.questionData.length) {
    const state = savedState;
    showConfirm('未完成的考试',
      '错题复习有一场未完成的考试（已答 ' + state.currentIndex + ' 题），是否重新开始？之前的进度将丢失。',
      '重新开始', '取消', function () {
        clearQuizState("wrong");
        startWrongQuizInternal();
      });
    return;
  }
  startWrongQuizInternal();
}

function startWrongQuizInternal() {
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
  const savedState = getSavedQuizState(mode);
  if (savedState && savedState.questionData && savedState.currentIndex < savedState.questionData.length) {
    const modeLabel = mode === "comprehensive" ? "综合知识" : "图片标识";
    const state = savedState;
    showConfirm('未完成的考试',
      modeLabel + '有一场未完成的考试（已答 ' + state.currentIndex + ' 题），是否重新开始？之前的进度将丢失。',
      '重新开始', '取消', function () {
        clearQuizState(mode);
        startQuizInternal(mode);
      });
    return;
  }
  startQuizInternal(mode);
}

function startQuizInternal(mode) {
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

  const q = quizState.questions[quizState.currentIndex];
  const total = quizState.questions.length;
  const idx = quizState.currentIndex + 1;
  const progressPercent = (quizState.currentIndex / total) * 100;

  let questionMedia = "";
  let questionText = "";
  let categoryLabel = "";

  if (q.type === "sign") {
    questionMedia = q.sign.img
      ? '<img src="' + q.sign.img + '" alt="' + q.sign.name + '" style="max-width:160px;max-height:120px;"'
        + ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"'
        + '><div class="img-error-fallback" style="display:none;width:160px;height:120px;">' + (q.sign.svg || '🖼') + '</div>'
      : q.sign.svg;
    questionText = "这是什么交通标志？";
    const cat = CATEGORIES[q.sign.category];
    categoryLabel = cat ? (cat.icon + " " + cat.name) : "";
  } else if (q.type === "knowledge") {
    const kq = q.question;
    if (kq.type === "image" && kq.image) {
      questionMedia = '<div class="quiz-sign-img" style="min-height:auto;margin-bottom:10px;">' + kq.image + '</div>';
    }
    questionText = kq.question;
    const kcat = KNOWLEDGE_CATEGORIES[kq.category];
    categoryLabel = kcat ? (kcat.icon + " " + kcat.name) : "";
  }

  let html =
    '<div class="quiz-top-bar">' +
      '<button class="quiz-back-btn" onclick="exitQuiz()">← 返回</button>' +
      '<span class="quiz-mode-badge">' + (quizState.mode === 'comprehensive' ? '📚 综合知识' : (quizState.mode === 'wrong' ? '🔄 错题复习' : '🚫 图片标识')) + '</span>' +
    '</div>' +
    '<div class="quiz-progress" role="progressbar" aria-valuenow="' + quizState.currentIndex + '" aria-valuemin="0" aria-valuemax="' + total + '" aria-label="答题进度">' +
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
      '<div class="quiz-options" id="quizOptions" role="radiogroup" aria-label="选项">';

  const isAnswered = q.answered;

  for (let i = 0; i < q.options.length; i++) {
    let optClass = "quiz-option";
    if (isAnswered) {
      optClass += " disabled";
      if (q.options[i].isCorrect) optClass += " show-correct";
      if (q.userAnswer && q.options[i].name === q.userAnswer.name && !q.options[i].isCorrect) optClass += " wrong";
    }
    html +=
      '<button class="' + optClass + '" data-idx="' + i + '" role="radio"'
      + ' aria-checked="' + (q.userAnswer && q.userAnswer.name === q.options[i].name ? 'true' : 'false') + '"'
      + (isAnswered ? ' aria-disabled="true"' : '') +
      (isAnswered ? '' : ' onclick="selectAnswer(' + i + ')"'
      + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();selectAnswer(' + i + ');}"') + '>' +
        q.options[i].name +
      '</button>';
  }

  html += '</div>';

  // 已回答的题显示解释
  if (isAnswered && q.userAnswer) {
    const wasCorrect = q.userAnswer.isCorrect;
    const exp = q.type === "sign" ? q.sign.description : (q.question ? q.question.explanation : "");
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

  if (isAnswered) {
    setTimeout(function () { renderNavForAnswered(); }, 50);
  }
}

// ========== 选择答案 ==========

let _autoTimer = null;
let _countdownInterval = null;

function selectAnswer(idx) {
  const q = quizState.questions[quizState.currentIndex];
  if (q.answered) return;
  q.answered = true;
  clearAutoAdvance();

  const chosen = q.options[idx];
  q.userAnswer = chosen;
  const buttons = document.querySelectorAll("#quizOptions .quiz-option");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.add("disabled");
    buttons[i].setAttribute("aria-disabled", "true");
  }

  const isCorrect = chosen.isCorrect;

  if (isCorrect) {
    quizState.correctCount++;
    buttons[idx].classList.add("correct");
    // Haptic feedback for correct answer
    if (navigator.vibrate) navigator.vibrate(50);
  } else {
    quizState.wrongCount++;
    buttons[idx].classList.add("wrong");
    addWrongAnswer(q);
    // Haptic feedback for wrong answer
    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);

    for (let j = 0; j < q.options.length; j++) {
      if (q.options[j].isCorrect) {
        buttons[j].classList.add("show-correct");
        break;
      }
    }
  }

  let explanation = "";
  if (q.type === "sign") {
    explanation = q.sign.description;
  } else if (q.type === "knowledge" && q.question.explanation) {
    explanation = q.question.explanation;
  }

  showPostAnswer(isCorrect, explanation);

  saveQuizState();

  const isLast = quizState.currentIndex >= quizState.questions.length - 1;
  if (!isLast) {
    const delay = isCorrect ? 2500 : 3500;
    startAutoAdvance(delay);
  }
}

/** Build navigation bar HTML — single source of truth */
function buildNavBarHTML(isLast, hasPrev, isCorrect) {
  if (isLast) {
    return '<div class="quiz-nav-bar">'
      + '<button class="quiz-nav-btn' + (hasPrev ? '' : ' disabled') + '" onclick="quizNavPrev()"' + (hasPrev ? '' : ' disabled') + '>◀ 上一题</button>'
      + '<button class="quiz-nav-btn quiz-submit-btn" onclick="renderQuizResult()">📝 交卷</button>'
      + '</div>';
  }
  return '<div class="quiz-nav-bar">'
    + '<button class="quiz-nav-btn' + (hasPrev ? '' : ' disabled') + '" onclick="quizNavPrev()"' + (hasPrev ? '' : ' disabled') + '>◀ 上一题</button>'
    + '<span class="quiz-nav-countdown" id="countdownRing">'
    + '<svg width="36" height="36" class="countdown-svg"><circle cx="18" cy="18" r="15" fill="none" stroke="#ddd" stroke-width="3"/>'
    + '<circle cx="18" cy="18" r="15" fill="none" stroke="' + (isCorrect ? '#16a34a' : '#dc2626') + '" stroke-width="3" stroke-dasharray="94.2" stroke-dashoffset="0" id="countdownCircle" transform="rotate(-90 18 18)" style="transition: stroke-dashoffset 0.1s linear"/></svg>'
    + '</span>'
    + '<button class="quiz-nav-btn" onclick="quizNavNext()">下一题 ▶</button>'
    + '</div>';
}

function showPostAnswer(isCorrect, explanation) {
  const card = document.querySelector(".quiz-question-card");
  if (!card) return;

  const total = quizState.questions.length;
  const isLast = quizState.currentIndex >= total - 1;
  const hasPrev = quizState.currentIndex > 0;

  const navHtml = buildNavBarHTML(isLast, hasPrev, isCorrect);

  const expHtml = explanation
    ? '<div class="quiz-explanation-card ' + (isCorrect ? 'correct-exp' : 'wrong-exp') + '">'
        + '<div class="exp-header">' + (isCorrect ? '✓ 回答正确！' : '✗ 回答错误') + '</div>'
        + '<div class="exp-body">' + explanation + '</div>'
      + '</div>'
    : '';

  card.innerHTML += expHtml;

  const container = document.getElementById("quizContainer");
  const oldNav = document.getElementById("quizNavWrapper");
  if (oldNav) oldNav.remove();
  const navWrapper = document.createElement("div");
  navWrapper.id = "quizNavWrapper";
  navWrapper.innerHTML = navHtml;
  container.appendChild(navWrapper);

  setupSwipe(card);
}

function renderNavForAnswered() {
  const total = quizState.questions.length;
  const isLast = quizState.currentIndex >= total - 1;
  const hasPrev = quizState.currentIndex > 0;

  const navHtml = isLast
    ? buildNavBarHTML(true, hasPrev, false)
    : '<div class="quiz-nav-bar">'
      + '<button class="quiz-nav-btn' + (hasPrev ? '' : ' disabled') + '" onclick="quizNavPrev()"' + (hasPrev ? '' : ' disabled') + '>◀ 上一题</button>'
      + '<span class="quiz-nav-countdown" id="countdownRing">'
      + '<svg width="36" height="36"><circle cx="18" cy="18" r="15" fill="none" stroke="#ddd" stroke-width="3"/></svg>'
      + '</span>'
      + '<button class="quiz-nav-btn" onclick="quizNavNext()">下一题 ▶</button>'
      + '</div>';

  const container = document.getElementById("quizContainer");
  const oldNav = document.getElementById("quizNavWrapper");
  if (oldNav) oldNav.remove();
  const navWrapper = document.createElement("div");
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
  const total = delayMs;
  const interval = 100;
  let elapsed = 0;

  _countdownInterval = setInterval(function () {
    elapsed += interval;
    const pct = elapsed / total;
    const circle = document.getElementById("countdownCircle");
    if (circle) {
      const circumference = 94.2;
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

let _qzSwipeX = 0, _qzSwipeY = 0;
function _qzSwipeStart(e) { _qzSwipeX = e.touches[0].clientX; _qzSwipeY = e.touches[0].clientY; }
function _qzSwipeEnd(e) {
  const dx = e.changedTouches[0].clientX - _qzSwipeX;
  const dy = e.changedTouches[0].clientY - _qzSwipeY;
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
  const totalQuestions = quizState.questions.length;
  const mode = quizState.mode;
  const maxScore = totalQuestions * POINTS_PER_QUESTION;
  const score = quizState.correctCount * POINTS_PER_QUESTION;
  const wrongCount = quizState.wrongCount;

  const wrongItems = [];
  for (let i = 0; i < quizState.questions.length; i++) {
    const qq = quizState.questions[i];
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

  const pct = Math.round(score / maxScore * 100);
  let ringColor, ringBg, msg;
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

  const modeLabel = quizState.mode === "comprehensive" ? "综合知识" : (quizState.mode === "wrong" ? "错题复习" : "图片标识");
  const modeIcon = quizState.mode === "comprehensive" ? "📚" : (quizState.mode === "wrong" ? "🔄" : "🚫");

  const html =
    '<div class="quiz-result">' +
      '<div class="result-mode-label">' + modeIcon + ' ' + modeLabel + '</div>' +
      '<div class="result-score-ring" style="background:' + ringBg + ';border:4px solid ' + ringColor + ';color:' + ringColor + ';" role="img" aria-label="得分 ' + score + ' 分">' +
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
  const imgList = getWrongList("image");
  const compList = getWrongList("comprehensive");
  const list = imgList.concat(compList);

  list.sort(function (a, b) {
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    return 0;
  });

  const container = document.getElementById("wrongContainer");

  if (list.length === 0) {
    container.innerHTML =
      '<div class="wrong-empty">' +
        '<div class="wrong-empty-icon" aria-hidden="true">🎉</div>' +
        '<p>暂无错题记录</p>' +
        '<p style="font-size:13px;margin-top:4px">快去刷题吧！</p>' +
      '</div>';
    return;
  }

  // 按类别分组
  const groups = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const gkey = item.category || "other";
    if (!groups[gkey]) groups[gkey] = [];
    groups[gkey].push(item);
  }

  // 类别排序
  const catOrder = ["warning","prohibition","mandatory","guide","auxiliary",
                     "hand_signals","road_markings","traffic_lights","right_of_way",
                     "speed_limits","demerit_points","expressway","penalties","safety"];
  const sortedKeys = [];
  for (let c = 0; c < catOrder.length; c++) {
    if (groups[catOrder[c]]) sortedKeys.push(catOrder[c]);
  }
  for (const gkey in groups) {
    if (groups.hasOwnProperty(gkey) && sortedKeys.indexOf(gkey) < 0) sortedKeys.push(gkey);
  }

  let html =
    '<div class="wrong-header">' +
      '<span class="wrong-count">共 ' + list.length + ' 道错题</span>' +
      '<button class="btn-clear" onclick="clearAllWrongAnswersWithConfirm()">清空全部</button>' +
    '</div>' +
    '<div class="wrong-persistence-note">💡 错题保存在浏览器本地，不清除缓存就不会丢失。关闭浏览器、重启手机均不影响。</div>';

  // 分类筛选 tabs
  html += '<div class="wrong-category-tabs" id="wrongCategoryTabs">';
  html += '<button class="wrong-cat-tab active" onclick="filterWrongCategory(\'all\')">全部 (' + list.length + ')</button>';
  for (let g = 0; g < sortedKeys.length; g++) {
    const gkey = sortedKeys[g];
    const items = groups[gkey];
    const info = getCategoryInfo(gkey);
    html += '<button class="wrong-cat-tab" onclick="filterWrongCategory(\'' + gkey + '\')">' + info.icon + ' ' + info.name + ' (' + items.length + ')</button>';
  }
  html += '</div>';
  html += '<div class="wrong-list" id="wrongList">';

  for (let g = 0; g < sortedKeys.length; g++) {
    const gkey = sortedKeys[g];
    const items = groups[gkey];
    const info = getCategoryInfo(gkey);

    html += '<div class="wrong-group" data-wrong-cat="' + gkey + '">' +
      '<div class="wrong-group-title">' + info.icon + ' ' + info.name + ' <span class="wrong-group-count">' + items.length + '题</span></div>';

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type === "sign") {
        const signMedia = item.img
          ? '<img src="' + item.img + '" alt="' + (item.name || '') + '" style="max-width:48px;max-height:48px;"'
            + ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"'
            + '><div class="img-error-fallback" style="display:none;width:48px;height:48px;">' + (item.svg || '🖼') + '</div>'
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
        const kqImg = item.handImage || "";
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
  const tabs = document.querySelectorAll(".wrong-cat-tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
    if (tabs[i].textContent.indexOf(cat) === 0 || (cat === "all" && tabs[i].textContent.indexOf("全部") === 0)) {
      tabs[i].classList.add("active");
    }
  }
  const groups = document.querySelectorAll(".wrong-group");
  for (let j = 0; j < groups.length; j++) {
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
