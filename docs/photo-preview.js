(() => {
  const dialog = document.querySelector('#photo-preview');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const dish = dialog.querySelector('.preview-dish');
  const restaurant = dialog.querySelector('.preview-restaurant');
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
      const caption = link.parentElement.querySelector('figcaption');
      dish.textContent = caption.children[0]?.textContent || '';
      restaurant.textContent = caption.children[1]?.textContent || '';
      dialog.showModal();
      document.documentElement.classList.add('preview-open');
      close.focus();
    });
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('preview-open');
    image.removeAttribute('src');
    opener?.focus({ preventScroll: true });
  });
})();
