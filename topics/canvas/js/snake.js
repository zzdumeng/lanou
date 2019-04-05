var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
// helpers
function extend(c, p) {
  var o = Object.create(p.prototype)
  c.prototype = o
  c.prototype.constructor = c
}
function clear(c) {
  c.clearRect(0, 0, c.canvas.width, c.canvas.height)
}
// Game

function Game({ query, width, height, rows, cols, size }) {
  this.container = $(query)
  this.width = width || 640
  this.height = height || 480
  this.rows = rows || 32
  this.cols = cols || 24
  this.size = size || 20

  this.init()
}

Game.prototype.init = function() {
  this.layers = {}
  this.layers.bg = this.container.querySelector('#bg')
  this.layers.bg = {
    canvas: this.layers.bg,
    context: this.layers.bg.getContext('2d'),
  }

  this.layers.food = this.container.querySelector('#food')
  this.layers.food = {
    canvas: this.layers.food,
    context: this.layers.food.getContext('2d'),
  }

  this.layers.snake = this.container.querySelector('#snake')
  this.layers.snake = {
    canvas: this.layers.snake,
    context: this.layers.snake.getContext('2d'),
  }
  for (let l in this.layers) {
    this.layers[l].canvas.width = this.width
    this.layers[l].canvas.height = this.height
  }

  this.snake = new Snake(this)
  this.bg = new Background(this)

  // draw
  this.bg.draw()
  this.update = this.update.bind(this)
}

Game.prototype.start = function() {
  this.update()
}

Game.prototype.update = function() {
  this.snake.move()
  this.snake.draw(this.layers.snake.context)
  window.requestAnimationFrame(this.update)
}

// Background
function Background(game) {
  this.game = game
}

Background.prototype.draw = function() {
  var ctx = this.game.layers.bg.context
  var rows = this.game.rows
  var cols = this.game.cols
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, this.game.width, this.game.height)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // draw
    }
  }
}

// Snake
function Snake(game, opts) {
  opts = opts || {}
  let { position, length, direction } = opts
  length = length || 5
  this.game = game
  this.direction = direction || 'right'
  this.head = position || { x: 10, y: 10 }
  this.knobs = []
  this.v = { x: 1, y: 0 }
  this.init(length)
}
Snake.prototype.init = function(l) {
  // TODO: consider direction
  for (let i = 0; i < l; i++) {
    this.knobs.push({
      x: this.head.x - i - 1,
      y: this.head.y,
    })
  }
}
Snake.prototype.draw = function(c) {
  // console.log(this.knobs)
  clear(c)
  var size = this.game.size
  c.save()
  // draw head
  c.fillStyle = 'red'
  c.fillRect(this.head.x * size+2, this.head.y * size, size, size)
  // draw body
  c.fillStyle = 'aqua'
  this.knobs.forEach((knob) => {
    c.fillRect(knob.x * size+2, knob.y * size+2, size-4, size-4)
  })
  c.restore()
}
Snake.prototype.turn = function(d) {

}
Snake.prototype.move = function() {
  // insert the head position to the first of
  // knobs
  var rows = this.game.rows
  var cols = this.game.cols
  this.knobs.unshift({x: this.head.x, y: this.head.y})
  // remove the last
  this.knobs.pop()
  switch (this.direction) {
    case 'up':
      // this.head.y = this.head.y-1 <
      // break
    case 'right':
      this.head.x = this.head.x+1 > rows? 0: this.head.x+1
      break
    case 'down':
      this.head.y += 1
      break
    case 'left':
      this.head.x -= 1
    default:
      break
  }
}

var game = new Game({ query: '.game' })

game.start()
