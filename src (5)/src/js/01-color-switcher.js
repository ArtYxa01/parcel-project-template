
const refs = {
    body: document.querySelector('body'),
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    isActive: false,
  };
  let intervalId = null;
  const handlerStartBtn = () => {
    refs.isActive = true;
    const { start, isActive, stop } = refs;
    start.disabled = true;
    if (isActive) {
      stop.disabled = false;
      intervalId = setInterval(changeBodyColor, 1000);
      return;
    }
  };
  const handlerStopBtn = () => {
    refs.isActive = false;
    const { start, isActive, stop } = refs;
    if (!isActive) {
      start.disabled = false;
      stop.disabled = true;
      clearInterval(intervalId);
      return;
    }
  };
  
  function changeBodyColor() {
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
  }
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
  
  refs.start.addEventListener('click', handlerStartBtn);
  refs.stop.addEventListener('click', handlerStopBtn);
  