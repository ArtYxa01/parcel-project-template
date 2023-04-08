import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const timeUpdate = function (time) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
};

player.on('timeupdate', throttle(timeUpdate, 1000));

const saveTime = localStorage.getItem('videoplayer-current-time');
const timeStop = JSON.parse(saveTime);

try {
  player.setCurrentTime(timeStop.seconds || 0);
} catch (error) {
  console.log(error.message);
}
