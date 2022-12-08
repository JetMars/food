/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
  var __webpack_exports__ = {};
  /*!**********************!*\
    !*** ./js/script.js ***!
    \**********************/


  document.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabContents = document.querySelectorAll('.tabcontent');
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabParent = document.querySelector('.tabheader__items');

    function hideTabContents() {
      tabContents.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show');
      });
    }

    function showTabContents(i = 0) {
      tabContents[i].classList.remove('hide', 'fade');
      tabContents[i].classList.add('show', 'fade');
    }


    hideTabContents();
    showTabContents();

    tabParent.addEventListener('click', (e) => {

      const target = e.target;

      if (target && target.classList.contains('tabheader__item')) {


        tabs.forEach((item, i) => {

          item.classList.remove('tabheader__item_active');

          if (item == target) {
            item.classList.add('tabheader__item_active');

            hideTabContents();
            showTabContents(i);
          }
        });
      }
    });

    // Timer

    const deadLine = '2022-12-07T15:00:00';

    function getTimerRemaining(endtime) {

      const t = Date.parse(endtime) - Date.now();
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor(t / (1000 * 60 * 60) % 24);
      const minutes = Math.floor(t / (1000 * 60) % 60);
      const seconds = Math.floor(t / 1000 % 60);

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
      };
    }

    function setTimer(selector, endtime) {

      const timer = document.querySelector(selector);
      const days = timer.querySelector('#days');
      const hours = timer.querySelector('#hours');
      const minutes = timer.querySelector('#minutes');
      const seconds = timer.querySelector('#seconds');
      const timeId = setInterval(updateTimer, 1000);

      updateTimer();

      function updateTimer() {

        const timerDB = getTimerRemaining(endtime);

        days.innerHTML = getZero(timerDB.days);
        hours.innerHTML = getZero(timerDB.hours);
        minutes.innerHTML = getZero(timerDB.minutes);
        seconds.innerHTML = getZero(timerDB.seconds);

        if (timerDB.total <= 0) {
          days.innerHTML = '00';
          hours.innerHTML = '00';
          minutes.innerHTML = '00';
          seconds.innerHTML = '00';
          clearInterval(timeId);
        }
      }
    }

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    getTimerRemaining(deadLine);
    setTimer('.timer', deadLine);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    function openModal() {
      modal.classList.remove('hide');
      modal.classList.add('show');

      const padding = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = padding + 'px';
      clearTimeout(modalTimerId);
    }

    function closeModal() {
      modal.classList.add('show');
      modal.classList.remove('show');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
    });


    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') === '') {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalBottom() {

      const winScrollTop = Math.round(window.pageYOffset || document.documentElement.scrollTop);

      if (winScrollTop + document.documentElement.clientHeight === document.documentElement.offsetHeight) {
        openModal();
        document.removeEventListener('scroll', showModalBottom);
      }
    }

    document.addEventListener('scroll', showModalBottom);

    // Metod Class Card

    class MenuCard {
      constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
        this.img = img;
        this.alt = alt;
        this.subtitle = subtitle;
        this.descr = descr;
        this.parentSelector = document.querySelector(parentSelector);
        this.classes = classes.length ? classes : ['menu__item'];
        this.price = price;
        this.convert = 1.65;
        this.convertUAH();
      }

      convertUAH() {
        this.price = Math.round(this.price / this.convert);
      }

      render() {
        const div = document.createElement('div');
        this.classes.forEach(className => div.classList.add(className));
        div.innerHTML = `
        <img src=${this.img} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr" style="min-height: 130px">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
        this.parentSelector.append(div);
      }
    }


    const getResource = async (url) => {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`Not found ${url}, status: ${resp.status}`);
      }

      return await resp.json();
    };

    getResource('http://localhost:3000/menu')
      .then(data => {
        data.forEach(({ img, altimg, title, descr, price }) => {
          new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
        });
      });

    // POST Server Script

    const forms = document.querySelectorAll('form');

    const message = {
      loading: 'img/form/spinner.svg',
      success: 'Мы свяжемся с вами как можно быстрее!',
      error: 'Что-то пошло не так...'
    };

    forms.forEach(form => {
      bindFormServer(form);
    });

    const postForm = async (url, json, type = 'application/json') => {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': type
        },
        body: json
      });

      if (!resp.ok) {
        throw new Error(`Not found ${url}, status: ${resp.status}`);
      }

      return await resp.json();
    };

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
      closeModal();
      openModal();

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
        closeModal();
      }, 2000);
    }

    fetch('http://localhost:3000/menu')
      .then(res => res.json())
      .then(data => console.log(data));


    // Slider

    const slider = document.querySelector('.offer__slider');
    const sliderWrap = document.querySelector('.offer__slider-wrapper');
    const sliderInner = sliderWrap.querySelector('.offer__slider-inner');
    const sliders = sliderWrap.querySelectorAll('.offer__slide');
    const nextBtn = document.querySelector('.offer__slider-next');
    const prevBtn = document.querySelector('.offer__slider-prev');
    const total = document.querySelector('#total');
    const current = document.querySelector('#current');
    const width = window.getComputedStyle(sliderWrap).width;

    let slideIndex = 1;
    let offset = 0;
    const dots = [];

    sliderInner.style.width = 100 * sliders.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = 'all 0.5s';
    sliderWrap.style.overflow = 'hidden';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    slider.style.position = 'relative';

    for (let i = 0; i < sliders.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dot.dataset.sliderCount = i + 1;

      indicators.append(dot);
      dots.push(dot);
      dots[(slideIndex - 1)].style.opacity = 1;

    }

    if (sliders.length < 10) {
      total.textContent = `0${sliders.length}`;
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = sliders.length;
      current.textContent = slideIndex;
    }

    sliders.forEach(slide => slide.style.width = width);

    function showActiveDot(dots) {
      dots.forEach(dot => dot.style.opacity = 0.5);
      dots[(slideIndex - 1)].style.opacity = 1;
    }

    function showCurrentCounter(elment, index) {
      if (index < 10) {
        elment.textContent = `0${index}`;
      } else {
        elment.textContent = index;
      }
    }

    nextBtn.addEventListener('click', () => {

      if (offset === parseInt(width) * (sliders.length - 1)) {
        offset = 0;
        slideIndex = 1;
      } else {
        offset += parseInt(width);
        slideIndex++;
      }

      sliderInner.style.transform = `translateX(-${offset}px)`;

      showCurrentCounter(current, slideIndex);
      showActiveDot(dots);
    });

    prevBtn.addEventListener('click', () => {

      if (offset === 0) {
        offset = parseInt(width) * (sliders.length - 1);
        slideIndex = sliders.length;
      } else {
        offset -= parseInt(width);
        slideIndex--;
      }

      sliderInner.style.transform = `translateX(-${offset}px)`;

      showCurrentCounter(current, slideIndex);
      showActiveDot(dots);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {

        slideIndex = dot.dataset.sliderCount;
        offset = parseInt(width) * (slideIndex - 1);

        sliderInner.style.transform = `translateX(-${offset}px)`;

        showCurrentCounter(current, slideIndex);
        showActiveDot(dots);
      });
    });

    // Calc

    const result = document.querySelector('.calculating__result span');

    let sex, ratio, height, weight, age;

    if (!localStorage.getItem('sex')) {
      sex = 'female';
      localStorage.setItem('sex', sex);
    } else {
      sex = localStorage.getItem('sex');
    }

    if (!localStorage.getItem('ratio')) {
      ratio = '1.375';
      localStorage.setItem('ratio', ratio);
    } else {
      ratio = localStorage.getItem('ratio');
    }

    function initLocalSettings(selector, active) {

      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
        elem.classList.remove(active);

        if (elem.getAttribute('data-sex') === localStorage.getItem('sex')) {
          elem.classList.add(active);
        }

        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
          elem.classList.add(active);
        }
      });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcResultInformation() {
      if (!ratio || !sex || !height || !weight || !age) {
        result.textContent = '____';
        return;
      }

      if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);

      }
      console.log(ratio, sex, height, weight, age);
    }

    calcResultInformation();

    function getStaticInformation(selector, active) {

      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {

        elem.addEventListener('click', (e) => {

          if (e.target.hasAttribute('data-sex')) {
            sex = e.target.getAttribute('data-sex');
            localStorage.setItem('sex', e.target.getAttribute('data-sex'));
          } else {
            ratio = +e.target.getAttribute('data-ratio');
            localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
          }

          elements.forEach(elem => elem.classList.remove(active));
          e.target.classList.add(active);

          calcResultInformation();
        });
      });
    }

    function getDynamicInformation(selector) {
      const input = document.querySelector(`${selector}`);

      input.addEventListener('input', () => {

        if (input.value.match(/\D/g)) {
          input.style.border = '1px solid red';
          return;
        } else {
          input.style.border = '';
        }

        switch (input.getAttribute('id')) {
          case 'height':
            height = +input.value;
            break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break;
        }

        calcResultInformation();
      });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

  });



  /******/
})()
  ;
//# sourceMappingURL=bundle.js.map