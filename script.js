const navLinks = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('main section')];
function updateNavigation() {
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 180) current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.at(-1).id;
  for (const link of navLinks) {
    const active = link.hash === '#' + current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
let scrollPending = false;
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(() => { updateNavigation(); scrollPending = false; }); }
}, {passive:true});
updateNavigation();
document.getElementById('copy-citation').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(document.getElementById('bibtex').textContent);
    status.textContent = 'Citation copied.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('bibtex'));
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(range);
    status.textContent = 'Text selected. Press Ctrl+C (or ⌘C) to copy.';
  }
});
