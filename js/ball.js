  class Ball {
    constructor() {
      this.x = 100;
      this.y = myCanvas.height/2;
      this.width = 40;
      this.height = 40;
      this.angle = 0;
      this.img = this.getImagePath();
      this.upButtonDown = false;
      this.downButtonDown = false;
      this.leftButtonDown = false;
      this.rightButtonDown = false;
      this.throttleDelay = 100; // Keyboard Throttle Delay (Milliseconds)
  
      // Select the mobile-controls buttons
      this.leftButton = document.getElementById('left-button');
      this.rightButton = document.getElementById('right-button');
      this.upButton = document.getElementById('up-button');
      this.downButton = document.getElementById('down-button');
  
  
      // Event listeners for keyboard controls
      document.addEventListener('keydown', (event) => this.handleKeyDown(event));
      document.addEventListener('keyup', (event) => this.handleKeyUp(event));
  
      // Throttle the keydown event listeners
      this.throttledUpStart = this.throttle(() => this.startMovingBall('up'), this.throttleDelay);
      this.throttledDownStart = this.throttle(() => this.startMovingBall('down'), this.throttleDelay);
      this.throttledLeftStart = this.throttle(() => this.startMovingBall('left'), this.throttleDelay);
      this.throttledRightStart = this.throttle(() => this.startMovingBall('right'), this.throttleDelay);
  
    }

    getImagePath() {
      // Return the appropriate image path based on the currentColor
      switch (currentColor) {
        case 'ballOne':
          return './images/ballOne.png';
        case 'ballTwo':
          return './images/ballTwo.png';
        case 'ballThree':
          return './images/ballThree.png';
        default:
          return './images/ballOne.png';
      }
    }  

    drawBall() {
      const ballImg = new Image();
      ballImg.src = this.img;
    
      // Calculate the angle of rotation based on the ball's current direction
      let angle = this.angle;
    
      // Calculate diagonal movement angles when both up and right or down and left buttons are pressed
      if (this.upButtonDown && this.rightButtonDown) {
        angle = Math.PI / 4; // Diagonal up-right
      } else if (this.downButtonDown && this.leftButtonDown) {
        angle = (-3 * Math.PI) / 4; // Diagonal up-left
      } else if (this.downButtonDown && this.rightButtonDown) {
        angle = (3 * Math.PI) / 4; // Diagonal down-left
      } else if (this.upButtonDown && this.leftButtonDown) {
        angle = (-Math.PI) / 4; // Diagonal up-left
      } else if (this.upButtonDown) {
        angle = 0;
      } else if (this.downButtonDown) {
        angle = Math.PI;
      } else if (this.leftButtonDown) {
        angle = -Math.PI / 2;
      } else if (this.rightButtonDown) {
        angle = Math.PI / 2;
      }
    
      // Translate and rotate the ball's image
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(angle);
      ctx.drawImage(ballImg, -this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    
      // Update the ball's current direction
      this.angle = angle;
    }
  
    handleKeyDown(event) {
      if (event.keyCode === 38 && !this.upButtonDown) {
        // up arrow key
        this.upButtonDown = true;
        this.throttledUpStart();
      } else if (event.keyCode === 40 && !this.downButtonDown) {
        // down arrow key
        this.downButtonDown = true;
        this.throttledDownStart();
      } else if (event.keyCode === 37 && !this.leftButtonDown) {
        // left arrow key
        this.leftButtonDown = true;
        this.throttledLeftStart();
      } else if (event.keyCode === 39 && !this.rightButtonDown) {
        // right arrow key
        this.rightButtonDown = true;
        this.throttledRightStart();
      }
    }    
  
    handleKeyUp(event) {
      if (event.keyCode === 38) {
        // up arrow key
        this.upButtonDown = false;
        this.stopMovingBall();
      } else if (event.keyCode === 40) {
        // down arrow key
        this.downButtonDown = false;
        this.stopMovingBall();
      } else if (event.keyCode === 37) {
        // left arrow key
        this.leftButtonDown = false;
        this.stopMovingBall();
      } else if (event.keyCode === 39) {
        // right arrow key
        this.rightButtonDown = false;
        this.stopMovingBall();
      } 
    }
  
    throttle(callback, delay) {
      let lastCallTime = 0;
      return function () {
        const now = Date.now();
        if (now - lastCallTime >= delay) {
          lastCallTime = now;
          callback.apply(this, arguments);
        }
      };
    }
  
    startMovingBall(direction) {
      
      // Use requestAnimationFrame to keep moving the ball continuously
      const moveBall = () => {
        if (this.upButtonDown || this.downButtonDown || this.leftButtonDown || this.rightButtonDown) {
          if (direction === 'up' && this.upButtonDown && this.y > 5) {
            this.y -= 7;
          } else if (direction === 'down' && this.downButtonDown && this.y < myCanvas.height - this.height - 5) {
            this.y += 7;
          } else if (direction === 'left' && this.leftButtonDown && this.x > 5) {
            this.x -= 7;
          } else if (direction === 'right' && this.rightButtonDown && this.x < myCanvas.width - this.width - 50) {
            this.x += 7;
          }
          requestAnimationFrame(moveBall);
        }
      };
      
      moveBall();
    }
    
  
    stopMovingBall() {
      // Stop the ball's movement when all buttons are released
      if (!this.upButtonDown && !this.downButtonDown && !this.leftButtonDown && !this.rightButtonDown) {
        cancelAnimationFrame(this.requestAnimationFrame);
      }
    }

  }
  
  function addTouchListeners() {
    // Touch event handling for leftButton
    currentBall.leftButton.ontouchstart = (event) => {
      event.preventDefault();
      currentBall.leftButtonDown = true;
      currentBall.throttledLeftStart();
    };
  
    currentBall.leftButton.ontouchend = () => {
      currentBall.leftButtonDown = false;
      currentBall.stopMovingBall();
    };
  
    // Touch event handling for rightButton
    currentBall.rightButton.ontouchstart = (event) => {
      event.preventDefault();
      currentBall.rightButtonDown = true;
      currentBall.throttledRightStart();
    };
  
    currentBall.rightButton.ontouchend = () => {
      currentBall.rightButtonDown = false;
      currentBall.stopMovingBall();
    };
  
    // Touch event handling for upButton
    currentBall.upButton.ontouchstart = (event) => {
      event.preventDefault();
      currentBall.upButtonDown = true;
      currentBall.throttledUpStart();
    };
  
    currentBall.upButton.ontouchend = () => {
      currentBall.upButtonDown = false;
      currentBall.stopMovingBall();
    };
  
    // Touch event handling for downButton
    currentBall.downButton.ontouchstart = (event) => {
      event.preventDefault();
      currentBall.downButtonDown = true;
      currentBall.throttledDownStart();
    };
  
    currentBall.downButton.ontouchend = () => {
      currentBall.downButtonDown = false;
      currentBall.stopMovingBall();
    };
  
    // Mouse event handling for leftButton
    currentBall.leftButton.onmousedown = () => {
      currentBall.leftButtonDown = true;
      currentBall.throttledLeftStart();
    };
  
    currentBall.leftButton.onmouseup = () => {
      currentBall.leftButtonDown = false;
      currentBall.stopMovingBall();
    };
  
    // Mouse event handling for rightButton
    currentBall.rightButton.onmousedown = () => {
      currentBall.rightButtonDown = true;
      currentBall.throttledRightStart();
    };
  
    currentBall.rightButton.onmouseup = () => {
      currentBall.rightButtonDown = false;
      currentBall.stopMovingBall();
    };
  
    // Mouse event handling for upButton
    currentBall.upButton.onmousedown = () => {
      currentBall.upButtonDown = true;
      currentBall.throttledUpStart();
    };
  
    currentBall.upButton.onmouseup = () => {
      currentBall.upButtonDown = false;
      currentBall.stopMovingBall();
    };
  
    // Mouse event handling for downButton
    currentBall.downButton.onmousedown = () => {
      currentBall.downButtonDown = true;
      currentBall.throttledDownStart();
    };
  
    currentBall.downButton.onmouseup = () => {
      currentBall.downButtonDown = false;
      currentBall.stopMovingBall();
    };
  }
