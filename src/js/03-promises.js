import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const firstDelayInput = form.querySelector('input[name="delay"]');
const delayStepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const firstDelay = Number(firstDelayInput.value);
  const delayStep = Number(delayStepInput.value);
  const amount = Number(amountInput.value);

  createPromises(firstDelay, delayStep, amount);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(firstDelay, delayStep, amount) {
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + i * delayStep;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.success(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
