const timer = document.getElementById('timer')
timer.style.display = 'none';
let startingSeconds = 45;
let isClockPaused = false

const countdown = document.getElementById('countdown')

function updateCountdown(){
    countdown.innerText = ` ${startingSeconds}`;
    if (!isClockPaused){
    startingSeconds--;
    }
    if (startingSeconds===-2){
        startingSeconds=45
    } 
}

