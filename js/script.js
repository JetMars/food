import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

  tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  cards();
  forms('form', modalTimerId);
  slider({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: 'total',
    currentCounter: 'current',
    field: '.offer__slider-inner'
  });
  timer('.timer', '2022-12-10T10:00:00');
  calc();

});


