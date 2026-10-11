(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return;
  const heading = document.querySelector('#intro-title');
  const credit = document.querySelector('.hero-credit');
  if (!heading || !credit) return;

  // Preserve the full accessible text and reserve each character's space.
  function prepare(element, label) {
    element.setAttribute('aria-label', label);
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const chars = [];
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const character of Array.from(node.textContent)) {
        const span = document.createElement('span');
        span.className = 'typing-char';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = character;
        fragment.appendChild(span);
        chars.push(span);
      }
      node.replaceWith(fragment);
    }
    return chars;
  }
  const headingChars = prepare(heading, 'A little about me. A few things I’ve made.');
  const creditChars = prepare(credit, '(vibed by Codex)');
  const logo = credit.querySelector('img');
  logo.classList.add('typing-char');
  const all = [...headingChars, ...creditChars, logo];
  let stopped = false;
  let cursor;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  function finish() {
    stopped = true;
    all.forEach(char => char.classList.add('typed'));
    cursor?.classList.remove('typing-cursor');
  }
  // Stop character updates as soon as the user begins scrolling.
  window.addEventListener('scroll', finish, { once: true, passive: true });
  motion.addEventListener('change', event => { if (event.matches) finish(); });
  async function type(chars, speed) {
    for (const char of chars) {
      if (stopped) return;
      cursor?.classList.remove('typing-cursor');
      char.classList.add('typed', 'typing-cursor');
      cursor = char;
      await wait(speed * (0.65 + Math.random() * 0.7));
    }
  }
  async function play() {
    await wait(250);
    await type([...heading.querySelectorAll('.hero-heading-about .typing-char')], 65);
    await wait(450);
    const lower = [...heading.querySelectorAll('.hero-heading-work > .typing-char')];
    await type(lower, 55);
    await wait(200);
    await type([...heading.querySelectorAll('em .typing-char')], 75);
    await wait(350);
    await type(creditChars.slice(0, -1), 38);
    if (!stopped) logo.classList.add('typed');
    await type(creditChars.slice(-1), 38);
    finish();
  }
  play().catch(finish);
})();
