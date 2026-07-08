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
  history.unshift(record);
  if (history.length > 50) history = history.slice(0, 50);
  try {
    localStorage.setItem("traffic_quiz_history", JSON.stringify(history));
  } catch (e) {}
}

// ========== 答题状态存取 ==========

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
    });
  }
  try {
    localStorage.setItem("traffic_quiz_state", JSON.stringify(state));
  } catch (e) {}
}

function getSavedQuizState() {
  try {
    var raw = localStorage.getItem("traffic_quiz_state");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function clearQuizState() {
  localStorage.removeItem("traffic_quiz_state");
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
    if (qd.signId) {
      var sign = idMap[qd.signId];
      if (!sign) return null;
      questions.push(generateSignQuestion(sign));
    } else if (qd.knowledgeId) {
      var kq = knowledgeMap[qd.knowledgeId];
      if (!kq) return null;
      questions.push(generateKnowledgeQuestion(kq));
    } else {
      return null;
    }
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

function resumeQuiz() {
  var savedState = getSavedQuizState();
  if (!savedState) {
    renderQuizIntro();
    return;
  }
  if (!restoreQuiz(savedState)) {
    clearQuizState();
    renderQuizIntro();
    return;
  }
  QUIZ_MODE = quizState.mode;
  renderQuestion();
}

function discardAndStart() {
  clearQuizState();
  renderQuizIntro();
}

// ========== 渲染刷题入口 ==========

function renderQuizIntro() {
  clearQuizState();
  QUIZ_MODE = null;
  var container = document.getElementById("quizContainer");
  var history = getQuizHistory();

  var html =
    '<div class="quiz-intro">' +
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

      html +=
        '<div class="history-item">' +
          '<div class="history-score" style="color:' + ringColor + '">' + h.score + '<span>分</span></div>' +
          '<div class="history-info">' +
            '<div class="history-date">' + modeLabel + ' · ' + h.date + '</div>' +
            '<div class="history-detail">正确 ' + h.correct + ' / ' + h.total + ' 题 (' + pct + '%)</div>' +
          '</div>' +
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
  clearQuizState();
  QUIZ_MODE = "wrong";
  quizState.mode = "wrong";
  quizState.questions = generateWrongQuiz();
  quizState.currentIndex = 0;
  quizState.correctCount = 0;
  quizState.wrongCount = 0;
  quizState.answered = false;
  saveQuizState();
  renderQuestion();
}

function startQuiz(mode) {
  clearQuizState();
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
  quizState.answered = false;
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
  quizState.answered = false;

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
      questionMedia = '<div style="max-width:120px;max-height:140px;margin:0 auto;">' + kq.image + '</div>';
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

  for (var i = 0; i < q.options.length; i++) {
    html +=
      '<button class="quiz-option" data-idx="' + i + '" onclick="selectAnswer(' + i + ')">' +
        q.options[i].name +
      '</button>';
  }

  html += '</div></div>';

  document.getElementById("quizContainer").innerHTML = html;
}

// ========== 选择答案 ==========

var _autoTimer = null;       // 自动跳转计时器
var _countdownInterval = null; // 倒计时更新

function selectAnswer(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  clearAutoAdvance();

  var q = quizState.questions[quizState.currentIndex];
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

  // 自动跳转倒计时
  var delay = isCorrect ? 2500 : 3500;
  startAutoAdvance(delay);
}

function showPostAnswer(isCorrect, explanation) {
  var card = document.querySelector(".quiz-question-card");
  if (!card) return;

  var total = quizState.questions.length;
  var idx = quizState.currentIndex + 1;
  var isLast = quizState.currentIndex >= total - 1;
  var hasPrev = quizState.currentIndex > 0;

  var navHtml =
    '<div class="quiz-nav-bar">' +
      '<button class="quiz-nav-btn' + (hasPrev ? '' : ' disabled') + '" onclick="quizNavPrev()"' + (hasPrev ? '' : ' disabled') + '>◀ 上一题</button>' +
      '<span class="quiz-nav-countdown" id="countdownRing">' +
        (isLast
          ? '<svg width="36" height="36"><circle cx="18" cy="18" r="15" fill="none" stroke="#ddd" stroke-width="3"/></svg>'
          : '<svg width="36" height="36" class="countdown-svg"><circle cx="18" cy="18" r="15" fill="none" stroke="#ddd" stroke-width="3"/><circle cx="18" cy="18" r="15" fill="none" stroke="' + (isCorrect ? '#16a34a' : '#dc2626') + '" stroke-width="3" stroke-dasharray="94.2" stroke-dashoffset="0" id="countdownCircle" transform="rotate(-90 18 18)" style="transition: stroke-dashoffset 0.1s linear"/></svg>') +
      '</span>' +
      '<button class="quiz-nav-btn' + (isLast ? ' disabled' : '') + '" onclick="quizNavNext()"' + (isLast ? ' disabled' : '') + '>下一题 ▶</button>' +
    '</div>';

  var expHtml = explanation
    ? '<div class="quiz-explanation-card ' + (isCorrect ? 'correct-exp' : 'wrong-exp') + '">' +
        '<div class="exp-header">' + (isCorrect ? '✓ 回答正确！' : '✗ 回答错误') + '</div>' +
        '<div class="exp-body">' + explanation + '</div>' +
        '<div class="exp-swipe-hint">← 滑动翻题 →</div>' +
      '</div>'
    : '';

  card.innerHTML += expHtml + navHtml;

  // 绑定滑动手势
  setupSwipe(card);
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
  // 上一题仅查看，不可重新作答
  var q = quizState.questions[quizState.currentIndex - 1];
  if (q.userAnswer) {
    quizState.currentIndex--;
    quizState.answered = true; // 标记为已看过
    renderQuestion();
    // 渲染后立即显示上一题的答案
    setTimeout(function () {
      var prevQ = quizState.questions[quizState.currentIndex];
      var prevCorrect = prevQ.userAnswer && prevQ.userAnswer.isCorrect;
      var prevExp = prevQ.type === "sign"
        ? prevQ.sign.description
        : (prevQ.question ? prevQ.question.explanation : "");
      // 高亮选项
      var btns = document.querySelectorAll("#quizOptions .quiz-option");
      for (var b = 0; b < btns.length; b++) {
        btns[b].classList.add("disabled");
        var opt = prevQ.options[b];
        if (opt.isCorrect) btns[b].classList.add("show-correct");
        if (prevQ.userAnswer && opt.name === prevQ.userAnswer.name && !opt.isCorrect) btns[b].classList.add("wrong");
      }
      showPostAnswer(prevCorrect, prevExp);
      clearAutoAdvance(); // 上一题不倒计时
    }, 100);
    window.scrollTo(0, 0);
  }
}

// ========== 滑动手势 ==========

function setupSwipe(card) {
  var startX = 0, startY = 0;
  card.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { once: true });

  card.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      clearAutoAdvance();
      if (dx < -40) quizNavNext();  // 左滑 → 下一题
      else if (dx > 40) quizNavPrev(); // 右滑 → 上一题
    }
  }, { once: true });
}

// ========== 渲染结果 ==========

function renderQuizResult() {
  clearQuizState();
  var totalQuestions = quizState.questions.length;
  var maxScore = totalQuestions * POINTS_PER_QUESTION;
  var score = quizState.correctCount * POINTS_PER_QUESTION;
  var wrongCount = quizState.wrongCount;

  var wrongItems = [];
  for (var i = 0; i < quizState.questions.length; i++) {
    var qq = quizState.questions[i];
    if (qq.userAnswer && !qq.userAnswer.isCorrect) {
      if (qq.type === "sign") {
        wrongItems.push(qq.sign.name);
      } else if (qq.type === "knowledge") {
        wrongItems.push(qq.question.question.substring(0, 30) + "...");
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

  var html =
    '<div class="wrong-header">' +
      '<span class="wrong-count">共 ' + list.length + ' 道错题</span>' +
      '<button class="btn-clear" onclick="clearAllWrongAnswers()">清空全部</button>' +
    '</div>' +
    '<div class="wrong-persistence-note">💡 错题数据保存在浏览器本地，清除缓存或使用无痕模式会导致丢失</div>' +
    '<div class="wrong-list">';

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var modeLabel = item.mode === "comprehensive" ? "📚 综合" : "🚫 标识";

    if (item.type === "sign") {
      var catName = CATEGORIES[item.category] ? CATEGORIES[item.category].name : "";
      var signMedia = item.img
        ? '<img src="' + item.img + '" alt="" style="max-width:48px;max-height:48px;">'
        : (item.svg || '');

      html +=
        '<div class="wrong-item">' +
          '<div class="wrong-item-header">' +
            (signMedia ? '<div class="wrong-item-img">' + signMedia + '</div>' : '') +
            '<div class="wrong-item-info">' +
              '<div class="wrong-item-correct">✓ 正确答案: ' + item.name + '</div>' +
              (item.userAnswer ? '<div class="wrong-item-user">✗ 你的答案: ' + item.userAnswer + '</div>' : '') +
              '<div class="wrong-item-time">' + modeLabel + ' · ' + catName + ' · ' + item.time + '</div>' +
              (item.wrongCount > 1 ? '<div class="wrong-count-badge">错了 <b>' + item.wrongCount + '</b> 次</div>' : '') +
            '</div>' +
          '</div>' +
        '</div>';
    } else if (item.type === "knowledge") {
      var kcat = KNOWLEDGE_CATEGORIES[item.category];
      var kcatName = kcat ? kcat.name : "";

      html +=
        '<div class="wrong-item">' +
          '<div class="wrong-item-header">' +
            '<div class="wrong-item-info" style="flex:1">' +
              '<div class="wrong-item-question">' + (item.questionText || "") + '</div>' +
              '<div class="wrong-item-correct">✓ 正确答案: ' + (item.correctAnswer || "") + '</div>' +
              (item.userAnswer ? '<div class="wrong-item-user">✗ 你的答案: ' + item.userAnswer + '</div>' : '') +
              '<div class="wrong-item-time">' + modeLabel + ' · ' + kcatName + ' · ' + item.time + '</div>' +
              (item.wrongCount > 1 ? '<div class="wrong-count-badge">错了 <b>' + item.wrongCount + '</b> 次</div>' : '') +
            '</div>' +
          '</div>' +
        '</div>';
    }
  }

  html += '</div>';
  container.innerHTML = html;
}

function clearAllWrongAnswers() {
  clearWrongList("image");
  clearWrongList("comprehensive");
  renderWrongPage();
}
