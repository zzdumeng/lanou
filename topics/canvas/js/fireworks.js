const canvas = document.getElementById('canvas')
canvas.width = 480
canvas.height = 320
const ctx = canvas.getContext('2d')

function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a)
}

const randColor = () =>
  `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`
const G = 80

function Fire({ x, y, vx, vy, color, radius }) {
  this.x = x
  this.y = y
  this.vx = vx
  this.vy = vy
  this.radius = radius
  this.color = color
}

Fire.prototype.fall = function(dt) {
  this.vx = this.vx // * 0.95
  this.vy = this.vy + G * dt

  this.x += this.vx * dt
  this.y += this.vy * dt
}

function Fireworks(c, { x, y, w, h }) {
  this.x = x
  this.c = c
  this.y = y
  this.w = w
  this.h = h
  this.fires = []
  this.fire = this.fire.bind(this)
  this.time
  this.spryed=  false
}

Fireworks.prototype.spray = function() {
  var fire = new Fire({
    x: randInt(this.x, this.x + this.w),
    y: this.y,
    vx: randInt(-20,20),
    vy: randInt(180,220) * -1,
    color: randColor(),
    radius: randInt(2,5),
  })
  this.fires.push(fire)
}

Fireworks.prototype.draw = function() {
  //
  var c = this.c
  c.clearRect(0, 0, c.canvas.width, c.canvas.height)
  c.fillStyle = '#F91368'
  c.beginPath()
  c.fillRect(this.x, this.y, this.w, this.h)

  this.fires.forEach((fire) => {
    c.fillStyle = fire.color
    c.beginPath()
    c.arc(fire.x, fire.y, fire.radius, 0, Math.PI * 2)
    c.fill()
  })
}

Fireworks.prototype.fire = function() {
  let dt = 0
  var now = Date.now()
  dt = (now - (this.time || now))/1000
  this.time = now
  // if(!this.spryed){

  //   this.spray()
  //   this.spryed =true
  // }
  this.spray()
  this.fires.forEach((fire) => {
    fire.fall(dt)
    if(fire.y > this.c.canvas.height) 
    // this.fires.splice()
    this.fires.shift()
  })
  this.draw()
  window.requestAnimationFrame(this.fire)
}

function main() {
  var fireworks = new Fireworks(ctx, { x: 200, y: 280, w: 20, h: 40 })
  fireworks.fire()
}
main()
