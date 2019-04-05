const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvas2 = document.getElementById('back')
const ctx2 = canvas2.getContext('2d')

const r = 100
function d2r(d) {
  return (d * Math.PI) / 180
}

function getTime() {
  var now = new Date()
  var h = now.getHours()
  var m = now.getMinutes()
  var s = now.getSeconds()
  var ms = now.getMilliseconds()

  var sa = s + ms / 1000
  var ma = sa / 60 + m
  var ha = ma / 60 + h
  return {
    s: sa * 6,
    m: ma * 6,
    h: ha * 30,
  }
}

function drawClock() {
  var bodyDrawed = false
  return function(x, y, r) {
    if (!bodyDrawed) {
      bodyDrawed = true
      drawClockBody(ctx2, x, y, r)
    }
    drawClockPointers(ctx, x, y, r)
  }
}
function drawClockBody(c, x, y, r) {
  console.log('body drawed')
  c.save()
  // draw panel
  c.beginPath()
  c.arc(x, y, r, 0, d2r(360))
  c.shadowBlur = 10
  // c.shadowColor = 'rgba(100,100,100, 0.1)';
  c.shadowColor = 'black'
  c.shadowOffsetX = 0.01 * r
  c.shadowOffsetY = 0.01 * r
  c.fillStyle = '#333'
  c.fill()

  c.fillStyle = 'white'
  // draw the scales
  c.shadowBlur = 0.015 * r
  c.shadowColor = 'rgba(255,255,255, 0.8)'
  c.shadowOffsetX = 0
  c.shadowOffsetY = 0
  c.font = `${0.2 * r}px fantasy`
  c.textBaseline = 'middle'
  c.textAlign = 'center'
  for (let i = 0; i < 60; i++) {
    c.beginPath()
    let a = d2r(i * 6)
    if (i % 5 === 0) {
      // draw a text
      c.fillText(
        i / 5 === 0 ? 12 : i / 5,
        x + 0.65 * r * Math.sin(a),
        y - 0.65 * r * Math.cos(a)
      )
      // draw a big scale
      c.save()
      c.translate(x, y)
      c.rotate(a)
      c.strokeStyle = '#984B43'
      c.lineWidth = 0.05 * r
      c.lineCap = 'round'
      c.lineJoin = 'round'
      c.shadowColor = 'rgba(255,255,255, 0.2)'
      c.beginPath()
      c.moveTo(r * 0.8, 0)
      c.lineTo(r * 0.9, 0)
      c.closePath()
      c.stroke()
      c.restore()
    } else {
      c.arc(
        x + 0.9 * r * Math.sin(a),
        y - 0.9 * r * Math.cos(a),
        0.01 * r,
        0,
        Math.PI * 2
      )
    }
    c.closePath()
    c.fill()
  }
  // c.save()

  // c.restore()

  c.restore()
}
function drawClockPointers(c, x, y, r) {
  c.clearRect(0, 0, c.canvas.width, c.canvas.height)
  c.save()
  c.strokeStyle = 'white'
  // draw pointers
  var t = getTime()
  // hour
  c.save()
  c.translate(x, y)
  c.rotate(d2r(t.h - 90))
  c.beginPath()
  c.lineCap = 'round'
  c.lineWidth =  0.06*r
  c.moveTo(0, 0)
  c.lineTo(0.4 * r, 0)
  c.stroke()
  c.restore()

  // minute
  c.save()
  c.translate(x, y)
  c.rotate(d2r(t.m - 90))
  c.beginPath()
  c.lineCap = 'round'
  c.lineWidth = 0.02*r
  c.moveTo(0, 0)
  c.lineTo(0.6 * r, 0)
  c.stroke()

  c.restore()
  // second
  c.save()
  c.translate(x, y)
  c.rotate(d2r(t.s - 90))
  c.strokeStyle = 'red'
  c.beginPath()
  c.moveTo(0, 0)
  c.lineTo(0.8 * r, 0)
  c.stroke()

  c.restore()
  // center
  c.beginPath()
  c.fillStyle = 'red'
  c.arc(x,y, 0.02*r, 0, Math.PI *2)
  c.fill()
  c.restore()
}

function draw() {
  var d = drawClock()
  var f = () => {
    d(200, 200, 180)
    window.requestAnimationFrame(f)
  }
  window.requestAnimationFrame(f)
}

draw()
