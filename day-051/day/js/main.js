var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

function createCarousel(query) {
  var carousel = $(query);
  var indicator = $(query + ' .indicator' );
  var indicatorItems = $$(query + ' .indicator .indicator-item');
  var prev = $(query + ' .prev');
  var next = $(query + ' .next');
  var items = $$(query + ' .item');

  var index = 0;

  
  carousel.index = index;
  carousel.timer = 0;
  carousel.indicator = indicator;
  carousel.items = items;
  // prev.onclick = switchTo.bind(undefined, carousel, carousel.index - 1);
  // next.onclick = switchTo.bind(undefined, carousel, carousel.index + 1);
  indicatorItems.forEach(function(item, i) {
    item.onclick = function() {
      switchTo(carousel, i);
    }
  })
  prev.onclick = function() {
    switchTo(carousel, carousel.index - 1);
  }
  next.onclick = function() {
    switchTo(carousel, carousel.index + 1);
  }
  carousel.onmouseover = stop.bind(undefined, carousel)
  carousel.onmouseleave = play.bind(undefined, carousel)
  carousel.timer1 = 0;
  carousel.timer2 = 0;
  return carousel;
}

function indicate(ind, n) {
  for(let i=0; i<ind.childElementCount; i++) {
    ind.children[i].classList.remove('active');
  }
  //  ind.children.forEach(function(i) {
  //    i.classList.remove('active');
  //  })
   ind.children[n].classList.add('active');
}

function moveTo(ele, start, end) {
  ele.style.left = start + 'px';
  var t = setInterval(function() {
    var left =( parseInt(ele.style.left, 10) || 0) +(end-start)/15;
    if(( end >= start && left >= end ) || 
    (end <= start && left <= end)) {
      ele.style.left = end + 'px';
      clearInterval(t);
    } else {

      ele.style.left = left + 'px';
    }
  }, 1000/ 60);
}

function switchTo(c, n) {
  if(n === c.index) return;
  if(n<0) n = c.items.length - 1;
  if(n>=c.items.length) n = 0;
//TODO:
  if(n > c.index || (n===0 && c.index===c.items.length - 1)) {
    //move to left
    moveTo(c.items[c.index], 0, -480 );
    moveTo(c.items[n], 480, 0 );
  }else {

    moveTo(c.items[c.index], 0, 480 );
    moveTo(c.items[n], -480, 0 );
  }
  // c.items[c.index].classList.remove('active');
  // c.items[n].classList.add('active')


  c.index = n;
  indicate(c.indicator, n);
}

function play(carousel) {
  carousel.timer = setInterval(function() {
    switchTo(carousel, carousel.index + 1);
  }, 1500);

}

function stop(c) {
  clearInterval(c.timer);
}

function init() {
  var c = createCarousel('.carousel');
  switchTo(c, c.index);
  play(c);
}

init();