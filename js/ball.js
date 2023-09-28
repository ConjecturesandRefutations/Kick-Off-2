class Ball {
  constructor(){
    this.x = 231;
    this.y = 520;
    this.width = 40;
    this.height = 40;
    this.img = './images/football.jpg';
  }
  
  drawBall(){
    const ballImg = new Image();
    ballImg.src = this.img;
    ctx.drawImage(ballImg, this.x, this.y, this.width, this.height);
  }

  moveBall(keyCode){
    ctx.clearRect(this.x, this.y, this.width, this.height);
    switch(keyCode){
      case 37: //left
      if(this.x > 40){
        this.x -= 10;
      }
        break;
      case 39: //right
      if (this.x < canvas.width-80 ){
        this.x += 10;
      }
        break;
        case 38: //up
        if(this.y>40){
           this.y -= 10;
        }
        break;
        case 40: //down
       if(this.y<canvas.height-80){
           this.y += 10;
       }
    }
  }
}

// Event listeners for arrow buttons for touch and click events
const upButton = document.getElementById('up-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');

// Touch event listeners
upButton.addEventListener('touchstart', () => {
  currentBall.moveBall(38); // 38 is the keycode for "up"
});

downButton.addEventListener('touchstart', () => {
  currentBall.moveBall(40); // 40 is the keycode for "down"
});

leftButton.addEventListener('touchstart', () => {
  currentBall.moveBall(37); // 37 is the keycode for "left"
});

rightButton.addEventListener('touchstart', () => {
  currentBall.moveBall(39); // 39 is the keycode for "right"
});

// Click event listeners
upButton.addEventListener('click', () => {
  currentBall.moveBall(38); // keycode for "up"
});

downButton.addEventListener('click', () => {
  currentBall.moveBall(40); // the keycode for "down"
});

leftButton.addEventListener('click', () => {
  currentBall.moveBall(37); // the keycode for "left"
});

rightButton.addEventListener('click', () => {
  currentBall.moveBall(39); // the keycode for "right"
});