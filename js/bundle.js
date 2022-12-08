/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {

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


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




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

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postForm)('http://localhost:3000/requests', json)
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 2000);
  }

  fetch('http://localhost:3000/menu')
    .then(res => res.json())
    .then(data => console.log(data));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ container, wrapper, slide, nextArrow, prevArrow, totalCounter, currentCounter, field }) {
    const slider = document.querySelector(container);
    const sliderWrap = document.querySelector(wrapper);
    const sliderInner = sliderWrap.querySelector(field);
    const sliders = sliderWrap.querySelectorAll(slide);
    const nextBtn = document.querySelector(nextArrow);
    const prevBtn = document.querySelector(prevArrow);
    const total = document.querySelector(`#${totalCounter}`);
    const current = document.querySelector(`#${currentCounter}`);
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsContentSelector, tabsSelector, tabsParentSelector, activeClass) {

  const tabs = document.querySelectorAll(tabsSelector);
  const tabContents = document.querySelectorAll(tabsContentSelector);
  const tabParent = document.querySelector(tabsParentSelector);

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

    if (target && target.classList.contains(tabsSelector.slice(1))) {


      tabs.forEach((item, i) => {

        item.classList.remove(activeClass);

        if (item == target) {
          item.classList.add(activeClass);

          hideTabContents();
          showTabContents(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {

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
    setTimer(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postForm": () => (/* binding */ postForm)
/* harmony export */ });
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

const getResource = async (url) => {
    const resp = await fetch(url);

    if (!resp.ok) {
        throw new Error(`Not found ${url}, status: ${resp.status}`);
    }

    return await resp.json();
};







/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









document.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 30000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: 'total',
    currentCounter: 'current',
    field: '.offer__slider-inner'
  });
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-12-10T10:00:00');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();

});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map