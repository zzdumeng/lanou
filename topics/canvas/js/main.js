const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.strokeStyle = 'red'
ctx.lineWidth = 10
ctx.lineCap = 'square'
ctx.lineJoin = 'round'
ctx.moveTo(20, 20)
// ctx.lineTo(200, 200)

// ctx.lineTo(100, 0)
// ctx.stroke()

ctx.beginPath()
ctx.strokeStyle = 'blue'
ctx.fillStyle = 'green'
ctx.lineWidth = 10
ctx.lineCap = 'butt'
ctx.moveTo(120, 20)
ctx.lineTo(200, 100)
ctx.lineTo(200, 150)
ctx.closePath()
// ctx.stroke()
// ctx.fill()

// draw rectangel
// ctx.strokeRect(100, 100, 50,50)

function deg2rad(d) {
  return (d * Math.PI) / 180
}
// function
//draw a star
function drawStar(context, center, r) {
  context.save()
  context.strokeStyle = 'red'
  context.lineWidth = 2

  // caculate the points
  const pts = []
  for (let i = 0; i < 5; i++) {
    let x = center.x + r * Math.cos(deg2rad(-90 + (i * 360) / 5))
    let y = center.y + r * Math.sin(deg2rad(-90 + (i * 360) / 5))
    pts.push({ x, y })
  }
  context.beginPath()
  pts.forEach((pt, i) => {
    context.moveTo(pts[i].x, pts[i].y)
    let ind = i + 2 >= pts.length ? i + 2 - pts.length : i + 2
    context.lineTo(pts[ind].x, pts[ind].y)
  })
  context.closePath()
  context.shadowBlur = 3
  context.shadowColor = 'red'
  context.shadowOffsetX = 4
  context.stroke()
  context.restore()
}

// draw circle, arc
function drawArc(c) {
  c.beginPath()
  c.moveTo(0, 0)
  c.arc(200, 400, 50, deg2rad(30), deg2rad(60))
  c.stroke()
  c.fill()
  c.closePath()
}

drawArc(ctx)

function drawText(c) {
  c.save()
  c.lineWidth = 1
  ctx.font = '32px sans-serif'
  c.translate(50, 300)
  c.rotate(deg2rad(90))
  c.strokeText('hello canvas', 0, 0)
  c.restore()
}

drawText(ctx)

function drawGradient(c) {
  c.save()
  const g = c.createLinearGradient(0, 0, 200, 200)
  g.addColorStop(0, 'red')
  g.addColorStop(0.5, 'purple')
  g.addColorStop(1, 'blue')
  c.fillStyle = g
  c.strokeStyle = g
  c.lineWidth = 20
  c.strokeRect(10, 10, 200, 200)

  c.restore()
}

function drawColorText(c) {
  c.save()
  const g = c.createLinearGradient(100, 100, 300, 200)
  g.addColorStop(0, 'blue')
  g.addColorStop(0.5, 'green')
  g.addColorStop(1.0, 'red')
  c.strokeStyle = g
  c.lineWidth = 2
  c.font = 'italic 64px  serif'

  console.log('d')
  c.strokeText('hello canvas', 100, 100)
  c.restore()
}

function drawBezier(c) {
  c.save()
  c.strokeStyle = 'black'
  c.lineWidth = 2
  c.beginPath()
  c.moveTo(0, 0)
  c.quadraticCurveTo(100, 0, 100, 100)
  c.quadraticCurveTo(100, 200, 200, 200)

  c.stroke()
  c.beginPath()
  c.strokeStyle = 'red'
  c.moveTo(200, 200)

  c.bezierCurveTo(250, -100, 350, 500, 400, 200)
  c.stroke()
  c.restore()
}
function drawTaichi(c, o, r, a) {
  c.clearRect(0, 0, 800, 600)
  c.save()
  c.translate(-o.x, -o.y)
  c.rotate(deg2rad(a))
  c.lineWidth = 2
  // outside circle
  c.strokeStyle = 'black'
  c.fillStyle = 'black'
  c.beginPath()
  c.arc(o.x, o.y, r, 0, deg2rad(360))
  c.stroke()
  // fill the right half
  c.beginPath()
  // c.moveTo(o.x, o.y - r)
  c.arc(o.x, o.y - r / 2, r / 2, deg2rad(270), deg2rad(90), true)
  // c.moveTo(o.x, o.y)
  c.arc(o.x, o.y + r / 2, r / 2, deg2rad(-90), deg2rad(90))

  // c.moveTo(o.x, o.y + r)
  c.arc(o.x, o.y, r, deg2rad(90), deg2rad(-90), true)
  // c.closePath()
  // c.stroke()
  c.fill()

  // draw the two small circles
  c.beginPath()
  c.arc(o.x, o.y - r / 2, r / 4, 0, deg2rad(360))
  // c.stroke()
  c.fillStyle = 'white'
  c.fill()

  c.beginPath()
  c.fillStyle = 'black'
  c.arc(o.x, o.y + r / 2, r / 4, 0, deg2rad(360))
  c.fill()

  c.closePath()
  c.restore()
}
// drawStar(ctx, {x: 300, y: 300}, 50)
// drawColorText(ctx)
// drawGradient(ctx)
// drawBezier(ctx)
drawTaichi(ctx, { x: 300, y: 300 }, 200)

var a = 0
function update() {
  a += 1
  drawTaichi(ctx, { x: 300, y: 300 }, 200, a)
  window.requestAnimationFrame(update)
}
// update()
