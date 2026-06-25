/* ===================================================
   main.js — 五股區綠能與社會爭議 互動功能
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavHighlight();
  initBarAnimation();
  initCardHover();
});

/* ----- 導覽列：捲動時自動高亮對應區塊連結 ----- */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* ----- 橫條圖：進入畫面時才播放寬度動畫 ----- */
function initBarAnimation() {
  const bars = document.querySelectorAll('.bar-fill');

  // 先把寬度設為 0，等動畫觸發再展開
  bars.forEach((bar) => {
    bar.dataset.targetWidth = bar.style.width;
    bar.style.width = '0%';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.bar-fill').forEach((bar) => {
            bar.style.width = bar.dataset.targetWidth;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const chartWrap = document.querySelector('.chart-wrap');
  if (chartWrap) observer.observe(chartWrap);
}

/* ----- 爭議卡片：點擊展開/收合詳細說明 ----- */
function initCardHover() {
  // 目前以 CSS hover 為主，此處保留擴充彈性
  // 未來可在此加入 modal 或 drawer 互動
  const cards = document.querySelectorAll('.controversy-card');
  cards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        card.classList.toggle('expanded');
      }
    });
  });
}
