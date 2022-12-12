function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.remove('hide');
  modal.classList.add('show');

  const padding = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = padding + 'px';

  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
}


function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('show');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {

  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalBottom() {

    const winScrollTop = Math.round(window.pageYOffset || document.documentElement.scrollTop);


    if (winScrollTop + document.documentElement.clientHeight === document.documentElement.offsetHeight) {
      openModal(modalSelector, modalTimerId);
      document.removeEventListener('scroll', showModalBottom);
    }
  }

  document.addEventListener('scroll', showModalBottom);
}

export default modal;
export { closeModal };
export { openModal };
