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

export default slider;