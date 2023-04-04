import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
};
let delayMs = null;
let step = null;
let amount = null;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, (delayMs += step));
  });
}

// Функция, которая обрабатывает отправку форм!
function handlerSubmit(evt) {
  evt.preventDefault();
  delayMs = Number(refs.formEl.delay.value);
  step = Number(refs.formEl.step.value);
  amount = Number(refs.formEl.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayMs)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  refs.formEl.reset();
}

refs.formEl.addEventListener('submit', handlerSubmit);