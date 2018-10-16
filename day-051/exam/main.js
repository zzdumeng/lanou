function update(time) {
  requestAnimationFrame(update);
  TWEEN.update();
}
function equal(a,b) {
  return Math.abs(a-b) < 0.001;
}
requestAnimationFrame(update);
var pointer = document.getElementById('pointer');

var tabs = document.querySelectorAll('.tab');
var contents = 
document.querySelectorAll('.content');
tabs.forEach(function(tab, i) {
  tab.onclick = function() {
    switchTab(i);
  } 
})
function updateContent (n) {
  contents.forEach(function(c) {
    c.classList.remove('active')
  })
  contents[n].classList.add('active');
}
function switchTab(n) {
  // pointer.style.left = 120*n + 'px';
  snakeWalk(pointer, n)
  updateContent(n);
}

function snakeWalk(ele, n) {
  // ele.style.left = n*120 + 'px';
  ele.style.left = parseInt(ele.style.left , 10) || 0 + 'px';
  ele.style.top = '0px';
  var t0 = createjs.Tween.get(ele, {css: true}, true)
  .to({left: n*120, top: 0}, 300)
  .call(function() {
    ele.style.left = n*120 + 'px';
    var t = createjs.Tween.get(ele, {loop:true, css: true}, true)
    // .wait(300)
    .to({left: 110 + n * 120, top: 0}, 600)
    .to({left: 110 + n * 120, top: 60}, 600)
    .to({left: 0 + n * 120, top: 60}, 600)
    .to({left: 0 + n * 120, top: 0}, 600)
  })

  // .start();

}

function init() {
  createjs.CSSPlugin.install();
  snakeWalk(pointer, 0);

}
init()
// var a = {x: 3, y: 4}
// var t = new TWEEN.Tween(a)
// .to({x: 100, y: 400}, 1000)
// .onUpdate(function(o) {
//   console.log(o);
// }).start();