const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

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

  var sa = (s+ms/1000)
  var ma = (sa/60 + m)
  var ha = (ma/60 + h)
  return {s: sa * 6,
  m: ma * 6,
  h: ha * 30}
}

function drawClock(c,x, y, r) {
  c.save()
  // draw panel
  c.beginPath()
  c.arc(x, y, r, 0, d2r(360))
  c.fillStyle = '#333'
  c.fill()

c.strokeStyle ='white'
  // draw pointers
  var t = getTime()
  // hour
  c.save()
  c.translate(x, y)
  c.rotate(d2r(t.h -90))
  c.beginPath()
  c.moveTo(0,0)
  c.lineTo(0.4*r, 0)
  c.stroke()
  c.restore()

  // minute
  c.save()
  c.translate(x,y)
  c.rotate(d2r(t.m - 90))
  c.beginPath()
  c.moveTo(0,0)
  c.lineTo(0.6*r, 0)
  c.stroke()

  c.restore()
  // second
  c.save()
  c.translate(x,y)
  c.rotate(d2r(t.s - 90))
  c.beginPath()
  c.moveTo(0,0)
  c.lineTo(0.8*r, 0)
  c.stroke()

  c.restore()

  c.restore()
}

function update() {
  drawClock(ctx, 200,200, 180)
  window.requestAnimationFrame(update)
}

update()
