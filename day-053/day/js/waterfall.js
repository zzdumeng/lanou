var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var container = $('.container');
var cols = $$('.container .col');
var hint = $('.container .hint');
var progress = $('.progress')
var add = $('#add');
var counter = 0;
function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a)
}
function randColor() {
  var r = randInt(0, 255)
  var g = randInt(0, 255)
  var b = randInt(0, 255)
  return `rgba(${r}, ${g}, ${b}, 0.8)`
}
function min(items, f) {
  var m = Number.POSITIVE_INFINITY;
  var it = items[0];
  items.forEach(function(item) {
    var v = f(item);
    if(v < m) {
      m = v;
      it = item
    }
  })
  return it;
}

function addCard() {
  var card = document.createElement('div');
  card.className = 'card';
  card.style.height = randInt(50, 200) + 'px';
  card.style.backgroundColor = randColor();
  card.innerText = counter;
  var minItem = min(cols, function(col) {
    return col.offsetHeight;
  })
  minItem.appendChild(card);
  counter++;
}

function addCards(n) {
  for(var i = 0; i< n; i++) {
    addCard();
  }
}

add.onclick = addCard
var fetching = false;
document.onscroll = function() {
  var root = document.documentElement
  if(root.scrollTop === root.offsetHeight - root.clientHeight) {
    if(fetching) return;
    fetchMore();
    // addSomeCard()
  }
}
function fetchMore() {
  fetching = true;
  hint.innerText = 'ooo i am fetching...';
  progress.hidden = false
  progress.style.width = '0%'
  var t = setInterval(function () {
    //HACK: 
    var w = parseInt(progress.style.width) + Math.random()*2
    progress.style.width  = w + '%'
    if(w >= 100) {
      progress.hidden = true
      hint.innerText = 'give me more...';
      addCards(randInt(6, 12))
      fetching = false;
      clearInterval(t)
    }
  }, 1000/60)
}

function main() {
  addCards(10)
}

main()