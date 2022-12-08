import { getResource } from '../services/services';

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


    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });
}

export default cards;