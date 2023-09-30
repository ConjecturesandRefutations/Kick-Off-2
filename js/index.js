//Key Variables
let currentGame;
let currentBall;
let animationID; // Store the animation ID
let obstaclesFrequency = 0; //Logic for supporting the generation of obstacles

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

//Instructions Section
const instructionSection = document.querySelector('.instruction-section');
instructionSection.style.display = 'none';
//Instruction Button
const instructionButton = document.querySelector('.instruction');
  instructionButton.onclick = () => {
    openingSection.style.display = 'none';
    instructionSection.style.display = '';
}

//Instructions Section
const settingsSection = document.querySelector('.settings-section');
settingsSection.style.display = 'none';
//settings Button
const settingsButton = document.querySelector('.settings');
  settingsButton.onclick = () => {
    openingSection.style.display = 'none';
    settingsSection.style.display = '';
}

// Back Button
const backButton = document.querySelectorAll('.back'); 

for (let i = 0; i < backButton.length; i++) {
  backButton[i].addEventListener('click', () => {
    instructionSection.style.display = 'none';
    settingsSection.style.display = 'none';
    openingSection.style.display = '';
  });
}


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

//Homepage button
let homeButton = document.querySelector('.homepage')
homeButton.style.display='none';
  homeButton.onclick = () =>{
    location.reload() 
  }

//Start Button
window.onload = () => {
    startButton.onclick = () => {
        opening.pause();
        opening.currentTime = 0;
        openingSection.style.display = 'none';
        myCanvas.style.display = '';
        arrowControls.style.display = '';
        yourScore.style.display = '' 
        opponentScore.style.display = ''
        timer.style.display = '';
        homeButton.style.display = '';
        startGame();
  };

};

function startGame() {
  setInterval(updateCountdown, 1000);

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

  if (startingSeconds <= 0) {
    whistle.play();
    endGame();
  }
  

const leftMargin = 250; 

for (let i = 0; i < currentGame.obstacles.length; i++) {
  const obstacle = currentGame.obstacles[i];

  // Update obstacle position based on direction
  if (obstacle.direction === 'down') {
    obstacle.y += 5;
  } else if (obstacle.direction === 'up') {
    obstacle.y -= 5;
  }

  obstacle.drawObstacle();

  // Logic for getting tackled by obstacles
  if (detectCollision(obstacle)) {
    currentGame.opponentsScore++;
    document.querySelector('.scoreTwo').innerText = currentGame.opponentsScore;
    currentBall.x = 100;
    currentBall.y = myCanvas.height / 2;
    tackleSound.play();
  }

  // Logic for removing obstacles when they leave the canvas
  if (
    (obstacle.direction === 'down' && obstacle.y >= myCanvas.height) ||
    (obstacle.direction === 'up' && obstacle.y + obstacle.height <= 0)
  ) {
    currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
  }
}

// Create new obstacles with random directions
if (obstaclesFrequency % 20 === 1) {
  let randomObstacleWidth = 50;
  let maxX = myCanvas.width - randomObstacleWidth;
  let randomObstacleX = Math.floor(Math.random() * (maxX - leftMargin)) + leftMargin;
  let randomObstacleY = Math.random() < 0.5 ? -70 : myCanvas.height; // Randomly select direction
  let randomObstacleHeight = 70;
  let direction = randomObstacleY === -70 ? 'down' : 'up';
  let newObstacle = new Obstacle(
    randomObstacleX,
    randomObstacleY,
    randomObstacleWidth,
    randomObstacleHeight,
    direction
  );

  currentGame.obstacles.push(newObstacle);
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
countdown.innerText = ` ${startingSeconds}`;
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
