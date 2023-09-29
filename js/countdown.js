const timer = document.getElementById('timer');
timer.style.display = 'none';
let startingSeconds = 45;
let isClockPaused = false;

const countdown = document.getElementById('countdown');

function updateCountdown() {
  if (!isClockPaused && startingSeconds > 0) {
    startingSeconds--;
    countdown.innerText = ` ${startingSeconds}`;
  }
}


