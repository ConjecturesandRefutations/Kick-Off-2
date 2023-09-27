class Ball {
  constructor(){
    this.x = 231;
    this.y = 520;
    this.width = 40;
    this.height = 40;
    this.img = './images/pitch.jpg';
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
      if(this.x > canvas.x){
        this.x -= 10;
      }
        break;
      case 39: //right
      if (this.x < canvas.width ){
        this.x += 10;
      }
        break;
        case 38: //up
        if(this.y>50){
           this.y -= 10;
        }
        break;
        case 40: //down
       if(this.y<50){
           this.y += 10;
       }
    }
  }
}