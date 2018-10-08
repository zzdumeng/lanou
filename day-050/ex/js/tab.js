var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var img = $('.content img');
var width = 100;
var index = 0;
var tabs = $$('.tab');
var indicator = $('.indicator');
var tween ;
var ease = $('#ease');



function init() {
  createjs.CSSPlugin.install();
  tween = createjs.Tween.get(indicator);
  tabs.forEach(function(tab, i) {
    // tab.onmouseover = switchTo.bind(undefined, i);
    tab.onclick = switchTo.bind(undefined, i);
  }) 
  createMethods();
  switchTo(0);
}

function createMethods() {
  var f = document.createDocumentFragment();
  Object.keys(createjs.Ease).forEach(function(method) {
    var o = document.createElement('option')
    o.value = method;
    o.innerText = method;
    f.appendChild(o);
  })
  ease.appendChild(f);
}

function updateContent() {
  img.src = './img/' + (index + 1 ) + '.jpeg';
}
function switchTo(i) {
  index = i;
  // indicator
  // tween.to({left: 100*i}, 300, createjs.Ease.linear);
  img.style.opacity = 0;
  createjs.Tween.get(indicator).to({left: 100*i}, 300, createjs.Ease[ease.value || "linear"]);
  createjs.Tween.get(img).to({opacity: 1}, 300, createjs.Ease[ease.value || "linear"]);
  updateContent(i);
}

init();