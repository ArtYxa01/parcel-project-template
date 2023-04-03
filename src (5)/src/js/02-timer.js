import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
    checkValidDate();
  },
};

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  deys: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
console.log(refs.hours);
flatpickr('#datetime-picker', options);

function checkValidDate() {
  const currentData = new Date();
  if (selectDate > currentData) {
    refs.startBtn.disabled = false;
  } else {
    refs.startBtn.disabled = true;
    alert('Please choose a date in the future');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let timerID = null;
function startTimer() {
  if (timerID === null) {
    timerID = setInterval(stopTimer, 1000);
    refs.startBtn.textContent = 'Stop';
  } else {
    clearInterval(timerID);
    timerID = null;
    refs.startBtn.textContent = 'Start';
  }
}

function stopTimer() {
  const { startBtn, deys, hours, minutes, seconds } = refs;
  const timeMS = selectDate - new Date();
  if (timeMS <= 0) {
    clearInterval(timerID);
    timerID = null;
    startBtn.disabled = true;
    startBtn.textContent = 'Start';
    return;
  }
  const timer = convertMs(timeMS);
  deys.textContent = addLeadingZero(timer.days);
  hours.textContent = addLeadingZero(timer.hours);
  minutes.textContent = addLeadingZero(timer.minutes);
  seconds.textContent = addLeadingZero(timer.seconds);
  console.log(timer);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
refs.startBtn.addEventListener('click', startTimer);
