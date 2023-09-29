//Key Variables
let currentGame;
let currentBall;
let obstaclesFrequency = 0; //Logic for supporting the generation of obstacles

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

//Main Menu Button
let mainMenuButton = document.getElementsByClassName('main-menu-button')
for (let i = 0 ; i < mainMenuButton.length; i++) {
  mainMenuButton[i].addEventListener('click',  ()=>{
    location.reload() 
  })  
}

//Start Button
let animationID; // Store the animation ID
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

};

function startGame() {
  setInterval(updateCountdown, 1000)

  currentGame = new Game();
  ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // draw background image

  //Instantiate a new ball
  currentBall = new Ball();
  currentBall.drawBall();

  addTouchListeners();

  // Clear any previous animation loop
  cancelAnimationFrame(animationID);

  // Start the animation loop
  animationID = requestAnimationFrame(updateCanvas);

}

function updateCanvas() {
  ctx.clearRect(0, 0, 700, 500); // clear canvas
  ctx.drawImage(background, 0, 0,myCanvas.width,myCanvas.height); // redraw the background

 currentBall.drawBall(); // redraw the ball at its current position
 obstaclesFrequency++;

 if (currentBall.x > 1310 && currentBall.y>275 && currentBall.y<380 ){
   goalSound.play();
   currentBall.x = 100;
   currentBall.y = myCanvas.height/2;
   currentGame.score++
   document.querySelector('.scoreOne').innerText = currentGame.score
  }

if (startingSeconds === 0){
  endGame()
}

const leftMargin = 250; 

if (obstaclesFrequency % 60 === 1) {
  let randomObstacleWidth = 50;
  let maxX = myCanvas.width - randomObstacleWidth;
  let randomObstacleX = Math.floor(Math.random() * (maxX - leftMargin)) + leftMargin;
  let randomObstacleY = -70;
  let randomObstacleHeight = 70;
  let newObstacle = new Obstacle(
    randomObstacleX,
    randomObstacleY,
    randomObstacleWidth,
    randomObstacleHeight
  );

  currentGame.obstacles.push(newObstacle);
}

for(let i = 0; i<currentGame.obstacles.length; i++) {
  currentGame.obstacles[i].y += 3; 
  currentGame.obstacles[i].drawObstacle();

  //Logic for getting tackled by obstacles

  if (detectCollision(currentGame.obstacles[i])) {
    currentGame.opponentsScore++ 
    document.querySelector('.scoreTwo').innerText = currentGame.opponentsScore
    currentBall.x = 100;
    currentBall.y = myCanvas.height/2;
    tackleSound.play()
  }
  // Logic for removing obstacles
  if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= myCanvas.height) {
    currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
  } 
}

function endGame(){
  currentBall.x = 100;
  currentBall.y = myCanvas.height/2;
  myCanvas.style.display = 'none';
  timer.style.display = 'none';
  fullTime.style.display = '';
  isClockPaused = true;
  arrowControls.style.display = 'none';
}
console.log(currentGame.obstacles.length)
animationID = requestAnimationFrame(updateCanvas);
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
