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

export default timer;