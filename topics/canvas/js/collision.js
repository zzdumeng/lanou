const canvas = document.getElementById('canvas')
canvas.width = 480
canvas.height = 320
const ctx = canvas.getContext('2d')

function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a)
}
const randColor = () =>
  `rgba(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`

// vector2

function Vec2(x, y) {
  this.x = x
  this.y = y
}

Vec2.prototype.add = function(o) {
  return new Vec2(this.x + o.x, this.y + o.y)
}
Vec2.prototype.subtract = function(o) {
  return new Vec2(this.x - o.x, this.y - o.y)
}
Vec2.prototype.multiply = function(n) {
  return new Vec2(this.x * n, this.y * n)
}

Vec2.prototype.normalize = function(n) {
  var l = this.getLength()
  return new Vec2(this.x / l, this.y / l)
}
Vec2.prototype.dot = function(o) {
  return this.getLength() * o.getLength() * Math.cos(this.getAngle() - o.getAngle())
}

Vec2.prototype.getLength = function(o) {
  var l = Math.sqrt(this.x * this.x + this.y * this.y)
  return l
}
Vec2.prototype.getAngle = function() {
  return Math.atan2(this.x, this.y)
}

// Ball
function Ball({ color, radius, x, y, vx, vy }) {
  this.color = color || 'black'
  this.radius = radius || 10
  // this.x = x || 100
  // this.y = y || 100
  // this.vx = vx || 100
  // this.vy = vy || 100
  this.pos = new Vec2(x || 100, y || 100)
  this.v = new Vec2(vx || 100, vy || 100)
}
Ball.prototype.move = function(dt) {
  this.pos.x += this.v.x * dt
  this.pos.y += this.v.y * dt
  // console.log(this.x, this.y)
}
Object.defineProperty(Ball.prototype, 'speed', {
  get() {
    return this.v
  },
  set({ x, y }) {
    this.v.x = x || this.v.x
    this.v.y = y || this.v.y
  },
})

Object.defineProperty(Ball.prototype, 'mass', {
  get() { return this.radius * this.radius}
})
/**
 * return a boolean value
 *
 * @param {*} other
 */
Ball.prototype.testCollide = function(other /* Ball */) {
  if (!(other instanceof Ball)) return false
  return (
    (this.pos.x - other.pos.x) * (this.pos.x - other.pos.x) +
      (this.pos.y - other.pos.y) * (this.pos.y - other.pos.y) <
    (this.radius + other.radius)*(this.radius + other.radius)
  )
}

Ball.prototype.resolveCollide = function(other) {
  var d = this.pos.subtract(other.pos)
  var l = d.getLength()
  // TODO: consider mass
  var im1 = 1/this.mass
  var im2 = 1/other.mass
  var mtd = d.multiply((this.radius + other.radius - l) / l)
  this.pos = this.pos.add(mtd.multiply(im1/(im2+im1)))
  other.pos = other.pos.subtract(mtd.multiply(im2/(im2+im1)))

  var v = this.v.subtract(other.v)
  var vn = v.dot(mtd.normalize())
  if(vn>0) return

  var i = -vn/(im1+im2)
  var impulse = mtd.multiply(i)

  this.v = this.v.add(impulse.multiply(im1))
  other.v = other.v.subtract(impulse.multiply( im2))
}

// Scene
function Scene({ width, height }) {
  this.balls = []
  this.width = width
  this.height = height
  this.draw = this.draw.bind(this)
  this.play = this.play.bind(this)

  this.time
}
Scene.prototype.setContext = function(c) {
  this.context = c
}
Scene.prototype.add = function() {
  for (let i = 0; i < arguments.length; i++) {
    this.balls.push(arguments[i])
  }
}
Scene.prototype.draw = function() {
  var c = this.context
  c.clearRect(0, 0, c.canvas.width, c.canvas.height)
  c.save()
  this.balls.forEach((ball) => {
    c.fillStyle = ball.color
    c.beginPath()
    c.arc(ball.pos.x, ball.pos.y, ball.radius, 0, Math.PI * 2)
    c.fill()
  })
  c.restore()
}
Scene.prototype.play = function() {
  // move balls and  check collisions
  let dt = 0
  const now = Date.now()
  dt = (now - (this.time || now)) / 1000
  // console.log(dt)
  this.time = now

  this.balls.forEach((ball) => {
    if (ball.pos.x + ball.radius > this.width || ball.pos.x - ball.radius < 0) {
      if (ball.pos.x + ball.radius > this.width)
        ball.pos.x = this.width - ball.radius
      else ball.pos.x = ball.radius
      ball.speed = { x: ball.speed.x * -1 }
    }
    if (
      ball.pos.y + ball.radius > this.height ||
      ball.pos.y - ball.radius < 0
    ) {
      if (ball.pos.y + ball.radius > this.height)
        ball.pos.y = this.height - ball.radius
      else ball.pos.y = ball.radius
      ball.speed = { y: ball.speed.y * -1 }
    }

    ball.move(dt)
  })
  // check collisions
  var l = this.balls.length
  for(let i = 0;i<l;i++) {
    const ball = this.balls[i]
    for(let j=i+1; j<l;j++) {
      const other = this.balls[j]
      if(ball.testCollide(other)) {
        console.log('collide!')
        ball.resolveCollide(other)
      }
    }
  }

  this.draw()
  window.requestAnimationFrame(this.play)
}

function main() {
  var scene = new Scene({ width: 480, height: 320 })
  scene.setContext(ctx)

  // create 5 balls
  for (let i = 0; i < 5; i++) {
    var ball = new Ball({
      color: randColor(),
      radius: randInt(10, 20),
      x: randInt(100, 200),
      y: randInt(100, 200),
      vx: randInt(80, 150) * [-1, 1][randInt(0, 1)],
      vy: randInt(80, 200) * [-1, 1][randInt(0, 1)],
    })
    scene.add(ball)
  }

  scene.play()
}

main()
