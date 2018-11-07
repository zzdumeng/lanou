var $ = document.querySelector.bind(document)
var magnifier = $('.magnifier')
var magnify = $('.magnify')
var magImage = $('.magnify img')
var show = $('.show')

var zooming = false
var ox;
var oy;
var rx;
var ry;

function restrict(x, a, b) {
  if(x>b) return b
  if(x < a) return a
  return x
}

function init() {
  // set  the magnifier size
  magnify.style.display = 'block'
  var x = magImage.clientWidth;
  var y = magImage.clientHeight;
  rx = x / 300;
  ry = y / 300;
  magnifier.style.width = 300/ rx + 'px'
  magnifier.style.height = 300/ ry + 'px'

  magnify.style.display = 'none'
}
function getClientPosition(ele) {
  var x = 0;
  var y = 0;
  var e = ele;
  while(e.parentElement) {
    x += e.offsetLeft
    y += e.offsetTop
    e = e.parentElement
  }
  return {x, y}
}
function setPosition(ele, x, y) {
  ele.style.left = x + 'px'
  ele.style.top = y + 'px'
}
show.onclick = (e) => {
  zooming = !zooming
  if (zooming) {
    // ox = 
    magnify.style.display = 'block'
    magnifier.style.display = 'block'
    magnifier.style.cursor = 'move'
  } else {
    magnify.style.display = 'none'
    magnifier.style.display = 'none'
    magnifier.style.cursor = 'normal'
  }
}

show.onmousemove = (e) => {
  if(zooming) {
    // e.offsetX
    // magnifier.style.left = 
    var now = getClientPosition(show)
    var x = e.clientX - now.x - magnifier.offsetWidth/2
    var y = e.clientY - now.y - magnifier.offsetHeight/2
    x = restrict(x, 0, show.offsetWidth - magnifier.offsetWidth)
    y = restrict(y, 0, show.offsetHeight - magnifier.offsetHeight)
    setPosition(magnifier, x, y)

    // // move the mag image
    setPosition(magImage, - x * rx,
-y * ry)
  }
}
init()
console.log(getClientPosition(show))
