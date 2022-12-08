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

export default calc;