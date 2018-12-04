;(function FlappyBirdGame() {
  var TOP_HEIGHT = 500;
  var FLOOR_HEIGHT = 90;
  var CONTAINER_WIDTH = 1300;
  var CONTAINER_HEIGHT = 590;
  var PIPE_WIDTH = 103;
  var PIPE_DISAPPEAR_OFFSET = 17;
  var INITIAL_BIRD_YPOSITION = 250;
  var PIPE_GAP = 175;
  var MIN_PIPE_HEIGHT = 75;
  var MAX_PIPE_HEIGHT = TOP_HEIGHT - PIPE_GAP - MIN_PIPE_HEIGHT;
  var INITIAL_PIPE_OFFSET = -200;

  var gameThat = this;

  var topBackground = document.getElementById('top-background');
  var floorBackground = document.getElementById('floor-background');
  var mainContainer = document.getElementsByClassName('main_container');
  topBackground.style.overflow = 'hidden';

  var newBird = new Bird();
  // newBird.initializeBird();

  var clickCounter = 0;
  mainContainer[0].addEventListener('click', function() {
    // console.log('do sth');
    if (clickCounter == 0) {
      newBird.moveDown();
      initiatePipes();
      movePipe();
      clickCounter++;
    } else {
      newBird.moveUp();
    }
  });

  this.getRandomInt = function(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  this.pipeArr = [];

  gameThat.initiatePipes = function() {
    var createPipes = setInterval(function() {
      var newPipe = new Pipe();
      newPipe.draw();
      pipeArr.push(newPipe);
    }, 2000);
  };

  this.movePipe = function() {
    var movePipeInterval = setInterval(function() {
      gameThat.pipeArr.forEach(function(pipe) {
        pipe.updatePipePosition();
        //distance between pipes = (2000/10) * 2(updated Pixels) = 400;
        if (parseInt(pipe.newTopPipeDiv.style.right) > (CONTAINER_WIDTH + PIPE_WIDTH + PIPE_DISAPPEAR_OFFSET)) {
          gameThat.pipeArr.shift();
          pipe.newTopPipeDiv.parentNode.removeChild(pipe.newTopPipeDiv);
          pipe.newBottomPipeDiv.parentNode.removeChild(pipe.newBottomPipeDiv);
        }
      });
    }, 10);
  };

  // setInterval(function() {
  //   console.log(gameThat.pipeArr[0].newTopPipeDiv.style.right);
  // }, 2000);

  this.initiateBackground = function() {
    topBackground.style.height = TOP_HEIGHT + 'px';
    topBackground.style.width = '100%';

    floorBackground.style.height = FLOOR_HEIGHT + 'px';
    floorBackground.style.width = '100%';

    floorBackground.style.background = 'url("./assets/image_assets/base.png")';
    floorBackground.style.backgroundRepeat = 'repeat-x';

    topBackground.style.background = 'url("./assets/image_assets/background-day.png")';
    topBackground.style.backgroundRepeat = 'repeat-x';

    topBackground.style.position = 'relative';
    (function moveBackground() {
      var x = 0;
      setInterval(function() {
        x -= 1;
        floorBackground.style.backgroundPosition = x + 'px 0';
        topBackground.style.backgroundPosition = x + 'px 0';
      }, 10);
    })();
    // moveBackground();
  };

  (function() {
    initiateBackground();
  })();


  function Bird() {
    this.birdPositionTop = INITIAL_BIRD_YPOSITION;
    var birdThis = this;
    this.birdPositionY = INITIAL_BIRD_YPOSITION;
    this.birdPositionX = 100;
    this.birdHeight = 50;
    this.birdWidth = 50;

    (function() {
      //draw part
      this.birdDiv = document.createElement('div');
      birdDiv = document.createElement('div');
      birdDiv.style.width = '50px';
      birdDiv.style.height = '50px';
      birdDiv.style.background = 'url("./assets/image_assets/bluebird-midflap.png")';
      birdDiv.style.backgroundSize = '100%';
      birdDiv.style.backgroundRepeat = 'no-repeat';

      birdDiv.style.position = 'absolute';
      topBackground.appendChild(birdDiv);
      birdDiv.style.top = birdThis.birdPositionTop + 'px';
      birdDiv.style.left = '100px';
      this.birdPositionX = parseInt(birdDiv.style.left);
    })();

    this.moveDown = function() {
      var moveDownInterval = setInterval(function() {
        birdDiv.style.top = parseInt(birdDiv.style.top) + 8 + 'px';
        birdThis.birdPositionY = parseInt(birdDiv.style.top);
        birdThis.detectBirdCollision();
      }, 30);
    };
    this.moveUp = function() {
      //moves 27*5 pixels
      var moveUpInterval = setInterval(function() {
        birdDiv.style.top = parseInt(birdDiv.style.top) - 5 + 'px';
        birdThis.birdPositionY = parseInt(birdDiv.style.top);
        birdThis.detectBirdCollision();

      }, 5);
      setTimeout(function() {
        clearInterval(moveUpInterval);
      }, 135);
    };


    this.detectBirdCollision = function() {
      for (var i = 0; i < 4; i++) {
        //(1300-pipeArr[i].positionX-103 <= newBird.birdPositionX <= 1300-pipeArr[i].positionX)
        // 0<=newBird.birdPositionY<=pipeArr[i].heightTop || 500-pipeArr[i].heightBottom<=newBird.birdPositionY<=500

        // if (gameThat.pipeArr.length >= 5) {
        //   if ((1300 - gameThat.pipeArr[i].positionX - 103 <= newBird.birdPositionX + newBird.birdWidth && newBird.birdPositionX + newBird.birdWidth <= 1300 - gameThat.pipeArr[i].positionX) &&
        //     ((0 <= newBird.birdPositionY && newBird.birdPositionY <= gameThat.pipeArr[i].heightTop) ||
        //       (500 - gameThat.pipeArr[i].heightBottom <= newBird.positionY + newBird.birdHeight && newBird.birdPositionY + newBird.birdHeight <= 500))) {
        //     console.log('collision');
        //   }
        // }
        //      for(var i=0;i<pipeArray.length;i++){
        //     if(that.x+that.width>=pipeArray[i].x && that.x<=pipeArray[i].x+pipeArray[i].width){
        //       if(that.y<=pipeArray[i].heightTop || that.y+that.height>=pipeArray[i].yBottom){
        //         clearInterval(interval);
        //         clearInterval(pipeInterval);
        //       }
        //     }
        // }
        if (gameThat.pipeArr.length >= 4) {
          if (newBird.birdPositionX + newBird.birdWidth >= 1300 - gameThat.pipeArr[i].positionX - 103 && newBird.birdPositionX <= 1300 - gameThat.pipeArr[i].positionX) {
            console.log('x collision');
            if (newBird.birdPositionY <= gameThat.pipeArr[i].heightTop || newBird.birdPositionY + newBird.birdHeight >= gameThat.pipeArr[i].heightTop + PIPE_GAP) {
              console.log('y collision');
            }
          }
        }

      }
    };

  }

  function Pipe() {
    this.heightTop = getRandomInt(MAX_PIPE_HEIGHT, MIN_PIPE_HEIGHT);
    this.heightBottom = TOP_HEIGHT - PIPE_GAP - this.heightTop;
    this.positionX = INITIAL_PIPE_OFFSET;
    this.width = 103;

    this.draw = function() {
      //draw top
      this.newTopPipeDiv = document.createElement('div');
      this.newTopPipeDiv.style.width = PIPE_WIDTH + 'px';
      this.newTopPipeDiv.style.height = this.heightTop + 'px';
      this.newTopPipeDiv.style.position = 'absolute';
      this.newTopPipeDiv.style.right = this.positionX + 'px';
      this.newTopPipeDiv.style.background = 'url("./assets/image_assets/pipe_1px.png")';
      this.newTopPipeDiv.style.backgroundRepeat = 'repeat-y';
      this.newTopPipeDiv.style.backgroundSize = '100%';
      this.newTopPipeDiv.style.top = '0px';

      //draw bottom
      this.newBottomPipeDiv = document.createElement('div');
      this.newBottomPipeDiv.style.width = PIPE_WIDTH + 'px';
      this.newBottomPipeDiv.style.height = this.heightBottom + 'px';
      this.newBottomPipeDiv.style.position = 'absolute';
      this.newBottomPipeDiv.style.right = this.positionX + 'px';
      this.newBottomPipeDiv.style.background = 'url("./assets/image_assets/pipe_1px.png")';
      this.newBottomPipeDiv.style.backgroundRepeat = 'repeat-y';
      this.newBottomPipeDiv.style.backgroundSize = '100%';
      this.newBottomPipeDiv.style.bottom = '0px';

      topBackground.appendChild(this.newTopPipeDiv);
      topBackground.appendChild(this.newBottomPipeDiv);
    };

    this.updatePipePosition = function() {
      this.newTopPipeDiv.style.right = parseInt(this.newTopPipeDiv.style.right) + 2 + 'px';
      this.newBottomPipeDiv.style.right = parseInt(this.newBottomPipeDiv.style.right) + 2 + 'px';
      this.positionX = parseInt(this.newTopPipeDiv.style.right); //parseInt(this.newBottomPipeDiv.style.right);
    };
  }


})();
