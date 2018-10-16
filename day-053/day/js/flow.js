var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

//helpers
function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a)
}

function randColor() {
  var r = randInt(0, 255)
  var g = randInt(0, 255)
  var b = randInt(0, 255)
  return `rgba(${r}, ${g}, ${b}, 0.8)`
}

// main
var container = $('.container')
var cards = []
var counter = 0;
var heights = []
var colNumber = 0;
var colWidth = 0;
var heightArr = []

function min(items, f) {
  var m = Number.POSITIVE_INFINITY;
  var it = items[0];
  items.forEach(function (item) {
    var v = f(item);
    if (v < m) {
      m = v;
      it = item
    }
  })
  return it;
}

function getColumn() {

  var w = window.innerWidth
  var colNumber = parseInt(w / 200, 10) || 1
  var colWidth = w / colNumber
  return [colNumber, colWidth]
}

function setColumn() {
  var info = getColumn()
  colNumber = info[0]
  colWidth = info[1]
  heights.length = colNumber
  for (var i = 0; i < colNumber; i++) {
    // if(heights[i] === undefined) {
    //   heights[i] = 0
    // }
    heights[i] = 0
  }
}

function min() {
  var m = Math.min.apply(undefined, heights)
  return heights.indexOf(m)
}

function addCard() {

  var card = document.createElement('div');
  card.className = 'card';
  var h = randInt(50, 200)

  card.style.width = 200 + 'px';
  card.style.height = h + 'px';
  card.style.backgroundColor = randColor();
  card.innerText = counter;
  // var minItem = min(cols, function(col) {
  //   return col.offsetHeight;
  // })
  var index = min()
  card.style.left = index * colWidth + 'px'
  card.style.top = heights[index] + 'px'
  heightArr.push(h)
  heights[index] += h
  container.appendChild(card);
  counter++;
}

function insertCard(card, c) {
  var h = parseInt(card.style.height, 10) || 0
  var index = min()
  card.style.left = index * colWidth + 'px'
  card.style.top = heights[index] + 'px'
  heights[index] += h
  c.appendChild(card);
}

function addCards(n) {
  for (var i = 0; i < n; i++) {
    addCard();
  }
}

function virtualAdd(i, hs) {
  var m = Math.min.apply(undefined, hs);
  var index = hs.indexOf(m)
  var left = 200 * index
  var top = hs[index]
  hs[index] += heightArr[i]
  return { x: left, y: top }
}
function virtualAddAll() {
  var hs = []
  var cards = container.children
  var posArr = []
  for (let i = 0; i < colNumber; i++) {
    hs[i] = 0
  }

  for (let i = 0; i < cards.length; i++) {
    posArr.push(virtualAdd(i, hs))
  }
  return posArr
}

function rearrangeCards() {
  var cards = container.children
  var newPosArr = virtualAddAll()
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.left = newPosArr[i].x + 'px'
    cards[i].style.top = newPosArr[i].y + 'px'
  }
  // var d = document.createDocumentFragment()

  // while(cards.length > 0) {
  //   insertCard(cards[0], d)
  // }
  // container.appendChild(d)

  // while(cards.length > 0) {
  //   container.removeChild(cards[0])
  // }

}

function main() {
  setColumn()
  console.log(colNumber, colWidth)
  addCards(110)

  window.onresize = function () {
    var oldNumber = colNumber
    var info = getColumn()
    if (info[0] !== colNumber) {
      setColumn()
      console.log(colNumber, colWidth)
      rearrangeCards()
    }
  }
}

main()
