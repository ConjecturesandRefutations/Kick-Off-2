const timer = document.getElementById('timer');
timer.style.display = 'none';
let startingSeconds = 45;
let isClockPaused = false;

const countdown = document.getElementById('countdown');

function updateCountdown() {
  countdown.innerText = ` ${startingSeconds}`;
  if (!isClockPaused) {
    if (startingSeconds <= 0) {
      startingSeconds = 45; // Restart the countdown from 45
    } else {
      startingSeconds--;
    }
  }
}
