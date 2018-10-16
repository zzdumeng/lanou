var box = document.querySelector('.box')
var container = document.querySelector('.container')

var long = document.querySelector('.long')
var container2 = document.querySelector('.container2')

console.log(long.scrollWidth,
  long.scrollHeight)
container2.scrollTop = 300
container2.onscroll = function() {
  console.log('top: ',container2.scrollTop,
  '\n',
  'left: ', long.scrollLeft)
}


var scroll = document.querySelector('#scroll')
var top = document.querySelector('#top')
scroll.onclick = function() {
  var v = parseInt(top.value, 10) || 0;
  container2.scrollTop = v;
}

console.log(box.clientWidth,
  box.clientHeight,
  box.clientTop,
  box.clientLeft)
console.log(box.offsetWidth,
  box.offsetHeight,
  box.offsetTop,
  box.offsetLeft)


console.log(box.offsetParent)