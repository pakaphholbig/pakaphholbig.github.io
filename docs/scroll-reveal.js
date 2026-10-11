(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const elements = [...document.querySelectorAll('.section')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('reveal-pending');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0, rootMargin: '0px 0px 100px 0px' });
  for (const element of elements) {
    // Preserve content already visible, including direct section links.
    if (element.getBoundingClientRect().top < window.innerHeight) continue;
    element.classList.add('scroll-reveal', 'reveal-pending');
    observer.observe(element);
  }
  function revealAll() {
    observer.disconnect();
    elements.forEach(element => element.classList.remove('reveal-pending'));
  }
  motion.addEventListener('change', event => { if (event.matches) revealAll(); });
  window.addEventListener('beforeprint', revealAll);
  document.addEventListener('focusin', event => {
    event.target.closest('.reveal-pending')?.classList.remove('reveal-pending');
  });
})();
