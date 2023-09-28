//Key Variables
let animationID;
let currentGame;
let currentBall;
let background = new Image();
background.src = "./images/pitch.png";

//Opening Area and Start Button
const startButton = document.getElementById('start-button');
const openingSection = document.getElementById('opening-section');

openingSection.style.display = '';

//Canvas
const myCanvas = document.getElementById('canvas');
const ctx = myCanvas.getContext('2d');

myCanvas.style.display = 'none';


//Arrow Controls
const arrowControls = document.querySelector('.arrow-controls');
arrowControls.style.display = 'none';

//Game-over Area
const fullTime = document.querySelector('.full-time')
fullTime.style.display = 'none'

//Scores
const yourScore = document.getElementById('your-score')
const opponentScore = document.getElementById('opponent-score')
yourScore.style.display = 'none'
opponentScore.style.display = 'none'

//Start Button
window.onload = () => {

    startButton.onclick = () => {
        openingSection.style.display = 'none';
        myCanvas.style.display = '';
        arrowControls.style.display = '';
        yourScore.style.display = '' 
        opponentScore.style.display = ''
        timer.style.display = '';
        startGame();
  };

  document.onkeydown = (e) => {
    let whereToGo = e.keyCode;
    currentBall.moveBall(whereToGo);
}
};

function startGame() {
  setInterval(updateCountdown, 1000)

  currentGame = new Game();
  ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // draw background image

  //Instantiate a new ball
  currentBall = new Ball();
  currentBall.drawBall();

  // Clear any previous animation loop
  cancelAnimationFrame(animationID);

  // Start the animation loop
  animationID = requestAnimationFrame(updateCanvas);

}

function updateCanvas() {
  ctx.clearRect(0, 0, 700, 500); // clear canvas
  ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // redraw the background

 currentBall.drawBall(); // redraw the ball at its current position

 animationID = requestAnimationFrame(updateCanvas);

 if (currentBall.x > 1310 && currentBall.y>275 && currentBall.y<380 ){
   goalSound.play();
   currentBall.x = this.x = 100;
   currentBall.y = myCanvas.height/2;
   currentGame.score++
   document.querySelector('.scoreOne').innerText = currentGame.score
}

if (startingSeconds === 0){
  endGame()
}

function endGame(){
  currentBall.x = this.x = 100;
  currentBall.y = myCanvas.height/2;
  myCanvas.style.display = 'none';
  timer.style.display = 'none';
  fullTime.style.display = '';
  isClockPaused = true;
  arrowControls.style.display = 'none';
}
}

function detectCollision(obstacle) {
  return ((currentBall.x < obstacle.x + obstacle.width) &&         // check left side of element 
  (currentBall.x + obstacle.width > obstacle.x) &&           // check right side
  (currentBall.y < obstacle.y + obstacle.height) &&         // check top side
  (currentBall.y + currentBall.height > obstacle.y));           // check bottom side
}

    //To reset the score
    function resetScore(){
      document.querySelector('.scoreOne').innerText = 0
      document.querySelector('.scoreTwo').innerText = 0
      currentGame.score = 0
      currentGame.opponentsScore = 0
    }

//Restart Button
let restartButton = document.getElementsByClassName('try-again-button')
for (let i = 0 ; i < restartButton.length; i++) {
restartButton[i].addEventListener('click',  ()=>{
startingSeconds = 45
isClockPaused= false;
fullTime.style.display = 'none';
openingSection.style.display = 'none'
myCanvas.style.display = ''
yourScore.style.display = '' 
opponentScore.style.display = ''
timer.style.display = ''
arrowControls.style.display = '';
resetScore()
}) 
} 
