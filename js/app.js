// ============================================
//   应用主逻辑 (v2 — improved)
// ============================================

let currentCategory = "all";
let currentSearch = "";

// ========== Shared Utilities ==========

/** Get category display info from either CATEGORIES or KNOWLEDGE_CATEGORIES */
function getCategoryInfo(gkey) {
  if (CATEGORIES[gkey]) return CATEGORIES[gkey];
  if (typeof KNOWLEDGE_CATEGORIES !== 'undefined' && KNOWLEDGE_CATEGORIES[gkey]) return KNOWLEDGE_CATEGORIES[gkey];
  return { name: gkey, icon: '' };
}

/** Render a sign's visual (PNG image with fallback to SVG) */
function renderSignMedia(sign, maxWidth, maxHeight) {
  const w = maxWidth || 80;
  const h = maxHeight || 80;
  if (sign.img) {
    const altText = sign.name || '交通标志';
    return '<img src="' + sign.img + '" alt="' + altText + '" loading="lazy"'
      + ' style="max-width:' + w + 'px;max-height:' + h + 'px;"'
      + ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"'
      + '><div class="img-error-fallback" style="display:none;width:' + w + 'px;height:' + h + 'px;">' + (sign.svg || '🖼') + '</div>';
  }
  return sign.svg || '';
}

/** Build a sign card HTML (reused across Learn, Wrong pages, Quiz) */
function buildSignCardHTML(sign) {
  const signMedia = renderSignMedia(sign, 80, 80);
  return '<div class="sign-card" onclick="showDetail(\'' + sign.id + '\')" tabindex="0" role="button"'
    + ' aria-label="查看 ' + sign.name + ' 详情"'
    + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();showDetail(\'' + sign.id + '\');}">'
    + '<div class="sign-img">' + signMedia + '</div>'
    + '<div class="sign-name">' + sign.name + '</div>'
    + '</div>';
}

/** Toast notification */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(function () {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 2600);
}

/** Custom confirmation dialog (replaces native confirm/alert) */
function showConfirm(title, message, confirmLabel, cancelLabel, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.setAttribute('role', 'alertdialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title);

  const isDanger = confirmLabel === '确认删除' || confirmLabel === '清空';

  overlay.innerHTML =
    '<div class="confirm-dialog">'
    + '<div class="confirm-dialog-icon">' + (isDanger ? '⚠️' : '📝') + '</div>'
    + '<h3>' + title + '</h3>'
    + '<p>' + message + '</p>'
    + '<div class="confirm-dialog-actions">'
    + '<button class="confirm-btn-cancel" id="confirmCancel">' + (cancelLabel || '取消') + '</button>'
    + '<button class="' + (isDanger ? 'confirm-btn-danger' : 'confirm-btn-primary') + '" id="confirmOk">' + (confirmLabel || '确认') + '</button>'
    + '</div>'
    + '</div>';

  document.body.appendChild(overlay);

  const close = function () {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  };

  overlay.querySelector('#confirmCancel').addEventListener('click', close);
  overlay.querySelector('#confirmOk').addEventListener('click', function () {
    close();
    if (onConfirm) onConfirm();
  });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  // Focus the cancel button
  const cancelBtn = overlay.querySelector('#confirmCancel');
  if (cancelBtn) cancelBtn.focus();

  // Escape key
  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
}

// ========== Tab 导航 ==========

function switchTab(tab) {
  // 切走答题标签前自动保存进度
  if (quizState.questions.length > 0 && quizState.currentIndex > 0
      && quizState.currentIndex < quizState.questions.length) {
    saveQuizState();
  }

  // Update tab buttons
  const tabs = document.querySelectorAll(".tab-item");
  for (let i = 0; i < tabs.length; i++) {
    const isActive = tabs[i].getAttribute("data-tab") === tab;
    tabs[i].classList.toggle("active", isActive);
    if (isActive) {
      tabs[i].setAttribute("aria-current", "page");
    } else {
      tabs[i].removeAttribute("aria-current");
    }
  }

  // Update pages
  const pages = document.querySelectorAll(".page");
  for (let j = 0; j < pages.length; j++) {
    pages[j].classList.remove("active");
  }
  const page = document.getElementById("page-" + tab);
  if (page) {
    page.classList.add("active");
  }

  // Trigger page-specific rendering
  if (tab === "quiz") {
    renderQuizIntro();
  } else if (tab === "wrong") {
    renderWrongPage();
  } else if (tab === "tips") {
    renderTips();
  }

  window.scrollTo(0, 0);
}

// ========== 学习模式：分类标签 ==========

function renderCategoryTabs() {
  const tabsContainer = document.getElementById("categoryTabs");
  let html = '<button class="category-tab' + (currentCategory === "all" ? " active" : "") + '" onclick="filterCategory(\'all\')">全部</button>';

  const catKeys = ["warning", "prohibition", "mandatory", "guide", "auxiliary", "hand_signals"];
  for (let i = 0; i < catKeys.length; i++) {
    const k = catKeys[i];
    const c = CATEGORIES[k];
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
  const grid = document.getElementById("signGrid");
  if (!grid) return;
  const query = (currentSearch || "").trim().toLowerCase();

  const filtered = TRAFFIC_SIGNS.filter(function (s) {
    if (currentCategory !== "all" && s.category !== currentCategory) return false;
    if (query) {
      const matchName = s.name.toLowerCase().indexOf(query) !== -1;
      let matchTags = false;
      for (let t = 0; t < s.tags.length; t++) {
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

  let html = "";
  for (let i = 0; i < filtered.length; i++) {
    html += buildSignCardHTML(filtered[i]);
  }
  grid.innerHTML = html;
}

// ========== 搜索 (with debounce) ==========

let searchDebounceTimer = null;

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearch = this.value;
      // Show/hide clear button
      if (searchClearBtn) {
        searchClearBtn.style.display = this.value ? 'block' : 'none';
      }
      // Debounce rendering
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(function () {
        renderSignGrid();
      }, 200);
    });
    // Clear button
    if (searchClearBtn) {
      searchClearBtn.addEventListener("click", function () {
        searchInput.value = "";
        currentSearch = "";
        searchClearBtn.style.display = 'none';
        renderSignGrid();
        searchInput.focus();
      });
    }
  }
});

// ========== 标志详情弹窗 ==========

function showDetail(signId) {
  let sign;
  for (let i = 0; i < TRAFFIC_SIGNS.length; i++) {
    if (TRAFFIC_SIGNS[i].id === signId) {
      sign = TRAFFIC_SIGNS[i];
      break;
    }
  }
  if (!sign) return;

  const cat = CATEGORIES[sign.category];
  const catInfo = getCategoryInfo(sign.category);
  const signMedia = renderSignMedia(sign, 160, 160);

  const html =
    '<button class="modal-close" onclick="closeModal()" aria-label="关闭详情">✕</button>' +
    '<div class="modal-sign-img">' + signMedia + '</div>' +
    '<div class="modal-sign-name">' + sign.name + '</div>' +
    '<div class="modal-sign-category">' + cat.icon + ' ' + cat.name + '</div>' +
    '<div class="modal-sign-desc">' + sign.description + '</div>' +
    '<div class="modal-sign-tip">' + sign.tip + '</div>';

  document.getElementById("modalContent").innerHTML = html;
  document.getElementById("detailModal").style.display = "flex";
  document.body.style.overflow = "hidden";

  // Focus the close button
  setTimeout(function () {
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }, 100);
}

function closeModal() {
  document.getElementById("detailModal").style.display = "none";
  document.body.style.overflow = "";
}

// Modal: click backdrop + Escape key
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("detailModal");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modalEl = document.getElementById("detailModal");
      if (modalEl && modalEl.style.display === "flex") {
        closeModal();
      }
      // Also dismiss any open confirm dialog
      const confirmOverlay = document.querySelector('.confirm-overlay');
      if (confirmOverlay && confirmOverlay.parentNode) {
        confirmOverlay.parentNode.removeChild(confirmOverlay);
      }
    }
  });
});

// ========== 行车知识渲染 ==========

function renderTips() {
  const container = document.getElementById("tipsList");
  if (!container) return;

  // Group tips by category
  const groups = {};
  for (let i = 0; i < DRIVING_TIPS.length; i++) {
    const tip = DRIVING_TIPS[i];
    if (!groups[tip.category]) {
      groups[tip.category] = [];
    }
    groups[tip.category].push(tip);
  }

  const catNames = Object.keys(groups);

  let html = "";
  for (let g = 0; g < catNames.length; g++) {
    const cat = catNames[g];
    const tips = groups[cat];
    html += '<div class="tip-category-label">' + cat + '</div>';

    for (let t = 0; t < tips.length; t++) {
      html +=
        '<div class="tip-accordion" onclick="toggleTip(this)" role="button" tabindex="0"'
        + ' aria-expanded="false"'
        + ' onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleTip(this);}">' +
          '<div class="tip-header">' +
            '<span>' + tips[t].title + '</span>' +
            '<span class="tip-arrow" aria-hidden="true">▼</span>' +
          '</div>' +
          '<div class="tip-body">' + tips[t].content + '</div>' +
        '</div>';
    }
  }

  container.innerHTML = html;
}

function toggleTip(el) {
  const isOpen = el.classList.toggle("open");
  el.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

// ========== Tab 点击事件 (with keyboard) ==========

document.addEventListener("DOMContentLoaded", function () {
  const tabItems = document.querySelectorAll(".tab-item");
  for (let i = 0; i < tabItems.length; i++) {
    tabItems[i].addEventListener("click", function () {
      const tab = this.getAttribute("data-tab");
      switchTab(tab);
    });
    // Keyboard support for tabs
    tabItems[i].addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const tab = this.getAttribute("data-tab");
        switchTab(tab);
      }
    });
  }

  // Initial render
  renderCategoryTabs();
  renderSignGrid();
});

// ========== Global error handler ==========

window.addEventListener("error", function (e) {
  console.error("App error:", e.message, e.filename, e.lineno);
  // Don't show toast for every error — only for critical ones
});
