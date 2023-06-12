import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

let selectedDate;
let timerId;

const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
  onOpen() {
    startButton.disabled = true;
  },
});

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startButton.addEventListener('click', () => {
  if (!selectedDate || selectedDate < new Date()) {
    Notiflix.Notify.failure('Please choose a valid future date');
    return;
  }

  clearInterval(timerId);

  const currentDate = new Date();
  const timeDiff = selectedDate - currentDate;
  updateTimer(timeDiff);

  timerId = setInterval(() => {
    const updatedTimeDiff = selectedDate - new Date();
    if (updatedTimeDiff <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.success('Timer has finished!');
      startButton.disabled = false;
      updateTimer(0);
    } else {
      updateTimer(updatedTimeDiff);
    }
  }, 1000);

  startButton.disabled = true;
});

function updateTimer(timeDiff) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(timeDiff / day);
  const hours = Math.floor((timeDiff % day) / hour);
  const minutes = Math.floor(((timeDiff % day) % hour) / minute);
  const seconds = Math.floor((((timeDiff % day) % hour) % minute) / second);

  daysElement.textContent = addLeadingZero(Math.max(0, days));
  hoursElement.textContent = addLeadingZero(Math.max(0, hours));
  minutesElement.textContent = addLeadingZero(Math.max(0, minutes));
  secondsElement.textContent = addLeadingZero(Math.max(0, seconds));
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
