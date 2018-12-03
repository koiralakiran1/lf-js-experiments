;(function FlappyBirdGame() {
  var TOP_HEIGHT = 500;
  var FLOOR_HEIGHT = 90;

  var topBackground = document.getElementById('top-background');
  var floorBackground = document.getElementById('floor-background');
  var mainContainer = document.getElementsByClassName('main_container');

  var newBird = new Bird();
  newBird.initializeBird();

  var clickCounter = 0;
  mainContainer[0].addEventListener('click', function() {
      // console.log('do sth');
      if(clickCounter == 0) {
          newBird.moveDown();
          clickCounter++;
      } else {
        newBird.moveUp();
      }
  });

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
    (function moveBackground(){
        var x = 0;
        setInterval(function(){
            x-=1;
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
    var birdPositionTop = 250;
    var birdThis = this;
    this.birdDiv = document.createElement('div');

    this.initializeBird = function() {
      //draw part
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
    };

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
})();
