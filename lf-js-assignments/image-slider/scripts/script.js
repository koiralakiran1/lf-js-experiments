var slider, imageContainer, images, mar;
var slideImage;
var pauseAndStartAnimation, startAnimation;
var leftArrow, rightArrow;
var SLIDER_WIDTH = 300;
var SLIDER_HEIGHT = 300;
(function initializeAndStyleElements() {
  // mainContainer = document.getElementById('main_container');
  // mainContainer.style.overflow = 'hidden';
  slider = document.getElementById('slider');
  imageContainer = document.getElementById('image_container');

  images = imageContainer.children;
  mar = 0;


  console.log(images);
  for (var i = 0; i < images.length; i++) {
    images[i].setAttribute('id', 'image' + i);
    images[i].style.float = 'left';
    images[i].style.width = 'SLIDER_WIDTHpx';
  }

  slider.style.width = 'SLIDER_WIDTHpx';
  slider.setAttribute('class', 'clearfix');
  slider.style.border = '2px solid red';
  slider.style.margin = 'auto';
  slider.style.overflow = 'hidden';
  var calculatedMinWidth = SLIDER_WIDTH * images.length;
  imageContainer.style.minWidth = calculatedMinWidth + 'px';

})();

(function placeButtons() {
  slider.style.position = 'relative';
  leftArrow = document.createElement('a');
  rightArrow = document.createElement('a');

  leftArrowText = document.createTextNode('<');
  rightArrowText = document.createTextNode('>');
  leftArrow.appendChild(leftArrowText);
  rightArrow.appendChild(rightArrowText);

  leftArrow.setAttribute('href', '#');
  rightArrow.setAttribute('href', '#');
  leftArrow.setAttribute('id', 'slider_left_arrow');
  rightArrow.setAttribute('id', 'slider_right_arrow');

  leftArrow.style.position = 'absolute';
  rightArrow.style.position = 'absolute';
  leftArrow.style.top = '40%';
  rightArrow.style.top = '40%';
  rightArrow.style.right = '0px';
  leftArrow.style.color = 'white';
  rightArrow.style.color = 'white';
  leftArrow.style.fontSize = '3rem';
  rightArrow.style.fontSize = '3rem';
  leftArrow.style.padding = '5px';
  rightArrow.style.padding = '5px';
  leftArrow.style.textDecoration = 'none';
  rightArrow.style.textDecoration = 'none';

  slider.insertBefore(leftArrow, imageContainer);
  slider.appendChild(rightArrow);
  console.log('hello');


})();

var onClickedMargin;
leftArrow.addEventListener('click', function() {
  clearInterval(slideImage);
  onClickedMargin = -mar;
  console.log(onClickedMargin);
  mar = mar - mar % SLIDER_WIDTH;
  changeMargin();
  animate();
});

rightArrow.addEventListener('click', function() {
  //next image
  clearInterval(slideImage);

  onClickedMargin = -mar;
  console.log(onClickedMargin);
  mar = mar + (SLIDER_WIDTH - mar % SLIDER_WIDTH);
  mar = -mar;
  changeMargin();
  animate();
});


function changeMargin() {
  imageContainer.style.marginLeft = mar + 'px';
  mar -= 1;
}

function animate() {
  pauseAndStartAnimation = setTimeout(function() {
    slideImage = setInterval(function() {
      changeMargin();
      checkPauseAndPlay();
      checkMarginReset();
    }, 5);
  }, 1500);
}

function checkPauseAndPlay() {
  if (mar % SLIDER_WIDTH == 0) {
    clearInterval(slideImage);
    setTimeout(animate, 1000);
  }
}

function checkMarginReset() {
  if (mar * -1 + SLIDER_WIDTH == images.length * SLIDER_WIDTH) {
    clearInterval(slideImage);
    setTimeout(function() {
      mar = 0;
      imageContainer.style.marginLeft = mar + 'px';
    }, 1500);
  }
}

animate();
