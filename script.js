const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.menu-btn');
const themeBtn = document.querySelector('.theme-btn');
const themeColor = document.getElementById('theme-color');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('mobile-open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('mobile-open'));
});

function getSystemTheme(){
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

let manualTheme = null;

function applyTheme(theme){
  document.documentElement.dataset.theme = theme;
  if(themeBtn){
    themeBtn.textContent = theme === 'light' ? '☾' : '☼';
    themeBtn.setAttribute('aria-label', theme === 'light' ? '切换到深色模式' : '切换到浅色模式');
    themeBtn.title = theme === 'light' ? '切换到深色模式' : '切换到浅色模式';
  }
  if(themeColor) themeColor.setAttribute('content', theme === 'light' ? '#fff6f2' : '#090809');
}

// 默认完全跟随系统主题，不保存主题偏好，系统变更会实时同步。
const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
applyTheme(getSystemTheme());

themeMedia.addEventListener?.('change', () => {
  manualTheme = null;
  applyTheme(getSystemTheme());
});

themeBtn?.addEventListener('click', () => {
  // 点击时允许临时手动预览；系统模式发生变化后会恢复自动跟随。
  manualTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(manualTheme);
});

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    if (window.innerWidth < 900 || document.documentElement.classList.contains('ua-mobile')) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
