;(function FlappyBirdGame() {
  var TOP_HEIGHT = 500;
  var FLOOR_HEIGHT = 90;
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
      clickCounter++;
    } else {
      newBird.moveUp();
    }
  });

  this.getRandomInt = function(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  this.initiatePipes = function() {
    this.pipeArr = [];
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
        if(parseInt(pipe.newTopPipeDiv.style.right) > (1300+103+17)) {
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
    initiatePipes();
    movePipe();
  })();


  function Bird() {
    var birdPositionTop = 250;
    var birdThis = this;

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
      birdDiv.style.top = birdPositionTop + 'px';
      birdDiv.style.left = '100px';
    })();

    this.moveDown = function() {
      var moveDownInterval = setInterval(function() {
        birdDiv.style.top = parseInt(birdDiv.style.top) + 8 + 'px';
      }, 30);
    };
    this.moveUp = function() {
      //moves 27*5 pixels
      var moveUpInterval = setInterval(function() {
        birdDiv.style.top = parseInt(birdDiv.style.top) - 5 + 'px';
      }, 5);
      setTimeout(function() {
        clearInterval(moveUpInterval);
      }, 135);
    };

  }

  function Pipe() {
    this.heightTop = getRandomInt(500 - 175 /*gap height*/ - 75, 75);
    this.heightBottom = 500 - 175 - this.heightTop;
    this.positionX = -200;

    this.draw = function() {
      //draw top
      this.newTopPipeDiv = document.createElement('div');
      this.newTopPipeDiv.style.width = '103px';
      this.newTopPipeDiv.style.height = this.heightTop + 'px';
      this.newTopPipeDiv.style.position = 'absolute';
      this.newTopPipeDiv.style.right = this.positionX + 'px';
      this.newTopPipeDiv.style.background = 'url("./assets/image_assets/pipe_1px.png")';
      this.newTopPipeDiv.style.backgroundRepeat = 'repeat-y';
      this.newTopPipeDiv.style.backgroundSize = '100%';
      this.newTopPipeDiv.style.top = '0px';

      //draw bottom
      this.newBottomPipeDiv = document.createElement('div');
      this.newBottomPipeDiv.style.width = '103px';
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
    };
  }


})();
