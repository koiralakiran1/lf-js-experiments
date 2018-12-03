;(function BallCollision() {

  var mainContainer = document.getElementById('main_container');
  mainContainer.style.position = 'relative';
  var NUMBER_OF_BALLS = 10;
  var ballArr = [];
  var BALL_SPEED = 2; //pixels to increase at each interval
  var INTERVAL_SPEED = 10; //interval for setInterval. can be used to control sp
  var CONTAINER_HEIGHT = 600;
  var CONTAINER_WIDTH = 900;
  var MAX_BALL_SIZE = 100; //max diameter
  var MIN_BALL_SIZE = 50; //min diameter

  var getRandomInt = function(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomDirection = function() {
    var rand = Math.random();
    return rand > 0.3332 ? (rand > 0.6667 ? 0 : 1) : -1;
  };

  var getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  function Ball() {
    var that = this;
    this.ballSize = getRandomInt(MAX_BALL_SIZE, MIN_BALL_SIZE); //diameter
    this.positionX = getRandomInt(CONTAINER_WIDTH - this.ballSize, 0);
    this.positionY = getRandomInt(CONTAINER_HEIGHT - this.ballSize, 0);
    this.speed = BALL_SPEED;
    this.color = getRandomColor();
    this.directionX = getRandomDirection();
    this.directionY = getRandomDirection();
    if (this.directionX == 0 && this.directionY == 0) { // initially, no movement condition
      this.directionX = 1;
      this.directionY = 1;
    }
    this.newDiv = document.createElement('div');

    this.draw = function() {
      this.newDiv.style.height = this.ballSize + 'px';
      this.newDiv.style.width = this.ballSize + 'px';
      this.newDiv.style.position = 'absolute';
      this.newDiv.style.top = this.positionY + 'px';
      this.newDiv.style.left = this.positionX + 'px';
      this.newDiv.style.background = this.color;
      this.newDiv.style.borderRadius = Math.floor(this.ballSize / 2) + 'px';
      mainContainer.appendChild(this.newDiv);
    };
    this.update = function() {
      this.newDiv.style.left = parseInt(this.newDiv.style.left) + this.speed * this.directionX + 'px';
      this.positionX = parseInt(this.newDiv.style.left);
      this.newDiv.style.top = parseInt(this.newDiv.style.top) + this.speed * this.directionY + 'px';
      this.positionY = parseInt(this.newDiv.style.top);
    };
    this.move = function() {
      var moveBall = setInterval(function() {
        that.update();
        that.detectCollision();
      }, INTERVAL_SPEED);
    };
    this.detectWallCollision = function() {
      if (parseInt(this.newDiv.style.left) <= 0 ||
        parseInt(this.newDiv.style.top) <= 0 ||
        parseInt(this.newDiv.style.top) >= 600 - this.ballSize ||
        parseInt(this.newDiv.style.left) >= 900 - this.ballSize) {
        this.directionX = -1 * this.directionX;
        this.directionY = -1 * this.directionY;
      }
    };
    this.detectCollision = function() {
      this.detectWallCollision();
      this.detectBallCollision();
    };

    this.detectBallCollision = function() {
      for (var i = 0; i < NUMBER_OF_BALLS; i++) {

        var ball1 = this;
        var ball2 = ballArr[i];

        if (i != ballArr.indexOf(ball1)) {

          var dx = ball1.positionX - ball2.positionX;
          var dy = ball1.positionY - ball2.positionY;

          var distance = Math.sqrt(dx * dx + dy * dy);
          var expectedDistance = ((ball1.ballSize / 2) + (ball2.ballSize / 2));

          if (distance <= expectedDistance) {
            //swap directions
            var tempX, tempY;
            tempX = ball1.directionX;
            tempY = ball1.directionY;

            ball1.directionX = ball2.directionX;
            ball1.directionY = ball2.directionY;

            ball2.directionX = tempX;
            ball2.directionY = tempY;
          }
        }
      }
    };
  }
  var init = function() {
    console.log('init');
    for (var i = 0; i < NUMBER_OF_BALLS; i++) {
      var newBall = new Ball();
      newBall.draw();
      newBall.move();
      ballArr[i] = newBall;
    }
  };

  init();
})();
