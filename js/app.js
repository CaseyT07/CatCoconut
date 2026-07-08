// ============================================
//   应用主逻辑
// ============================================

var currentCategory = "all";
var currentSearch = "";

// ========== Tab 导航 ==========

function switchTab(tab) {
  // 切走答题标签前自动保存进度
  if (quizState.questions.length > 0 && quizState.currentIndex > 0
      && quizState.currentIndex < quizState.questions.length) {
    saveQuizState();
  }

  // Update tab buttons
  var tabs = document.querySelectorAll(".tab-item");
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].getAttribute("data-tab") === tab) {
      tabs[i].classList.add("active");
    } else {
      tabs[i].classList.remove("active");
    }
  }

  // Update pages
  var pages = document.querySelectorAll(".page");
  for (var j = 0; j < pages.length; j++) {
    pages[j].classList.remove("active");
  }
  var page = document.getElementById("page-" + tab);
  if (page) {
    page.classList.add("active");
  }

  // Trigger page-specific rendering
  if (tab === "quiz") {
    var savedState = getSavedQuizState();
    if (savedState && savedState.questionData && savedState.currentIndex < savedState.questionData.length) {
      showResumeDialog(savedState);
    } else {
      renderQuizIntro();
    }
  } else if (tab === "wrong") {
    renderWrongPage();
  } else if (tab === "tips") {
    renderTips();
  }

  window.scrollTo(0, 0);
}

// ========== 学习模式：分类标签 ==========

function renderCategoryTabs() {
  var tabsContainer = document.getElementById("categoryTabs");
  var html = '<button class="category-tab' + (currentCategory === "all" ? " active" : "") + '" onclick="filterCategory(\'all\')">全部</button>';

  var catKeys = ["warning", "prohibition", "mandatory", "guide", "auxiliary"];
  for (var i = 0; i < catKeys.length; i++) {
    var k = catKeys[i];
    var c = CATEGORIES[k];
    html +=
      '<button class="category-tab' + (currentCategory === k ? " active" : "") + '" onclick="filterCategory(\'' + k + '\')">' +
        c.icon + ' ' + c.name +
      '</button>';
  }

  tabsContainer.innerHTML = html;
}

function filterCategory(cat) {
  currentCategory = cat;
  renderCategoryTabs();
  renderSignGrid();
}

// ========== 学习模式：标志网格 ==========

function renderSignGrid() {
  var grid = document.getElementById("signGrid");
  var query = (currentSearch || "").trim().toLowerCase();

  var filtered = TRAFFIC_SIGNS.filter(function (s) {
    if (currentCategory !== "all" && s.category !== currentCategory) return false;
    if (query) {
      var matchName = s.name.toLowerCase().indexOf(query) !== -1;
      var matchTags = false;
      for (var t = 0; t < s.tags.length; t++) {
        if (s.tags[t].toLowerCase().indexOf(query) !== -1) {
          matchTags = true;
          break;
        }
      }
      if (!matchName && !matchTags) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="no-results">没有找到匹配的标志</div>';
    return;
  }

  var html = "";
  for (var i = 0; i < filtered.length; i++) {
    var sign = filtered[i];
    var signMedia = sign.img
      ? '<img src="' + sign.img + '" alt="" style="max-width:100%;max-height:80px;">'
      : sign.svg;
    html +=
      '<div class="sign-card" onclick="showDetail(\'' + sign.id + '\')">' +
        '<div class="sign-img">' + signMedia + '</div>' +
        '<div class="sign-name">' + sign.name + '</div>' +
      '</div>';
  }
  grid.innerHTML = html;
}

// ========== 搜索 ==========

document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearch = this.value;
      renderSignGrid();
    });
  }
});

// ========== 标志详情弹窗 ==========

function showDetail(signId) {
  var sign;
  for (var i = 0; i < TRAFFIC_SIGNS.length; i++) {
    if (TRAFFIC_SIGNS[i].id === signId) {
      sign = TRAFFIC_SIGNS[i];
      break;
    }
  }
  if (!sign) return;

  var cat = CATEGORIES[sign.category];

  var signMedia = sign.img
    ? '<img src="' + sign.img + '" alt="" style="max-width:100%;max-height:160px;">'
    : sign.svg;

  var html =
    '<button class="modal-close" onclick="closeModal()">✕</button>' +
    '<div class="modal-sign-img">' + signMedia + '</div>' +
    '<div class="modal-sign-name">' + sign.name + '</div>' +
    '<div class="modal-sign-category">' + cat.icon + ' ' + cat.name + '</div>' +
    '<div class="modal-sign-desc">' + sign.description + '</div>' +
    '<div class="modal-sign-tip">' + sign.tip + '</div>';

  document.getElementById("modalContent").innerHTML = html;
  document.getElementById("detailModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("detailModal").style.display = "none";
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("detailModal");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});

// ========== 行车知识渲染 ==========

function renderTips() {
  var container = document.getElementById("tipsList");
  if (!container) return;

  // Group tips by category
  var groups = {};
  for (var i = 0; i < DRIVING_TIPS.length; i++) {
    var tip = DRIVING_TIPS[i];
    if (!groups[tip.category]) {
      groups[tip.category] = [];
    }
    groups[tip.category].push(tip);
  }

  var catNames = [];
  for (var c in groups) {
    if (groups.hasOwnProperty(c)) {
      catNames.push(c);
    }
  }

  var html = "";
  for (var g = 0; g < catNames.length; g++) {
    var cat = catNames[g];
    var tips = groups[cat];
    html += '<div class="tip-category-label">' + cat + '</div>';

    for (var t = 0; t < tips.length; t++) {
      html +=
        '<div class="tip-accordion" onclick="toggleTip(this)">' +
          '<div class="tip-header">' +
            '<span>' + tips[t].title + '</span>' +
            '<span class="tip-arrow">▼</span>' +
          '</div>' +
          '<div class="tip-body">' + tips[t].content + '</div>' +
        '</div>';
    }
  }

  container.innerHTML = html;
}

function toggleTip(el) {
  if (el.classList.contains("open")) {
    el.classList.remove("open");
  } else {
    el.classList.add("open");
  }
}

// ========== Tab 点击事件 ==========

document.addEventListener("DOMContentLoaded", function () {
  var tabItems = document.querySelectorAll(".tab-item");
  for (var i = 0; i < tabItems.length; i++) {
    tabItems[i].addEventListener("click", function () {
      var tab = this.getAttribute("data-tab");
      switchTab(tab);
    });
  }

  // Initial render
  renderCategoryTabs();
  renderSignGrid();
});
