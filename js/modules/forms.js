import { closeModal } from "./modal";
import { openModal } from "./modal";
import { postForm } from '../services/services';

function forms(formSelector, modalTimerId) {

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Мы свяжемся с вами как можно быстрее!',
    error: 'Что-то пошло не так...'
  };

  forms.forEach(form => {
    bindFormServer(form);
  });

  function bindFormServer(form) {

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postForm('http://localhost:3000/requests', json)
        .then(data => {
          showThanksModal(message.success);
          console.log(data);
        })
        .catch((err) => {
          showThanksModal(message.error);
          console.log(err);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });
    });
  }

  function showThanksModal(message) {

    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    closeModal('.modal');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');

    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      closeModal('.modal');
    }, 2000);
  }

  fetch('http://localhost:3000/menu')
    .then(res => res.json())
    .then(data => console.log(data));
}

export default forms;