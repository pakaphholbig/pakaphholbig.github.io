(() => {
  const dialog = document.querySelector('#photo-preview');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const close = dialog.querySelector('button');
  let opener;
  for (const link of document.querySelectorAll('.food-photo > a')) {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      caption.textContent = [...link.parentElement.querySelector('figcaption').children].map(el => el.textContent).join(' · ');
      dialog.showModal();
      document.documentElement.classList.add('preview-open');
      close.focus();
    });
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('preview-open');
    image.removeAttribute('src');
    opener?.focus({ preventScroll: true });
  });
})();
