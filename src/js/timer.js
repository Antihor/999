import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const inRef = document.querySelector('#datetime-picker');
const butRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minRef = document.querySelector('[data-minutes]');
const secRef = document.querySelector('[data-seconds]');

let timerDL;
let userSelectedDate;
let currentTime;

butRef.setAttribute('disabled', true);
butRef.addEventListener('click', onStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentTime = Date.now()
    userSelectedDate = selectedDates[0];
      if(userSelectedDate <= currentTime){
      butRef.setAttribute('disabled', true);
      iziToast.error({
      title:"Error!",
      message: "Please choose a date in the future",
      position: "topCenter"
    })
      }else{
    butRef.removeAttribute('disabled');
  }
  timerDL = new Date(userSelectedDate);
  },
};

flatpickr('#datetime-picker', options);

function onStart(){
  inRef.setAttribute('disabled', true);
  butRef.setAttribute('disabled', true);

  const timerID = setInterval(() => {
  const startTime = Date.now();
  const time = timerDL - startTime;
  const getTime = convertMs(time);

  daysRef.textContent = getTime.days;
  hoursRef.textContent = getTime.hours;
  minRef.textContent = getTime.minutes;
  secRef.textContent = getTime.seconds;

  if (time < 1000){
    clearInterval(timerID);
  }
}, 1000)
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function  addLeadingZero(value){
  return String(value).padStart(2, '0');
}

