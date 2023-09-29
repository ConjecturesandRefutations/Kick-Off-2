class Obstacle {
    constructor(x, y, width, height, direction) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
        this.img = this.getImagePath();
        this.direction = direction;
    }

    getImagePath() {
      // Return the appropriate image path based on the currentColor
      switch (currentOpponent) {
        case 'opponentOne':
          return './images/opponentOne.png';
        case 'opponentTwo':
          return './images/opponentTwo.png';
        case 'opponentThree':
          return './images/opponentThree.png';
        default:
          return './images/opponentOne.png';
      }
    }  

    drawObstacle(){
        const obstacleImg = new Image();
        obstacleImg.src = this.img;
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
      }
    }
