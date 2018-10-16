var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

function update(time) {
  requestAnimationFrame(update);
  TWEEN.update();
}
requestAnimationFrame(update);


function Carousel(q) {
  this.carousel = $(q);
  this.timer = 0;
}

Carousel.prototype.play = function() {

}
Carousel.prototype.pause = function() {

}
Carousel.prototype.play = function() {

}

function init() {
  var carousel = new Carousel('.carousel');
}

init()


