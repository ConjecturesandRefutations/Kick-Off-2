//Key Variables
let animationID;
let currentGame;
let currentBall;
let background = new Image();
background.src = "./images/pitch.jpg";

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

 if (currentBall.x > 1310 && currentBall.y>290 && currentBall.y<380 ){
   currentBall.x = this.x = myCanvas.width/4;
   currentBall.y = myCanvas.height/2;
   currentGame.score++
   document.querySelector('.scoreOne').innerText = currentGame.score
}
}

function detectCollision(obstacle) {
  return ((currentBall.x < obstacle.x + obstacle.width) &&         // check left side of element 
  (currentBall.x + obstacle.width > obstacle.x) &&           // check right side
  (currentBall.y < obstacle.y + obstacle.height) &&         // check top side
  (currentBall.y + currentBall.height > obstacle.y));           // check bottom side
}