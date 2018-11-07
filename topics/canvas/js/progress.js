const canvas = document.getElementById('canvas')
canvas.width = 640
canvas.height = 568

const d2r = (d) => (d * Math.PI) / 180
const c = canvas.getContext('2d')

function draw(x, y, r, p) {
  // the p should be the real progress,
  // here we just mock it.
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.save()

  // draw bg
  c.fillStyle = 'lightgray'
  c.beginPath()
  c.arc(x, y, r, 0, Math.PI * 2)
  c.fill()
  c.beginPath()
  c.arc(x, y, 0.8 * r, 0, Math.PI * 2)
  c.fillStyle = '#F1F1F1'
  c.fill()

  // draw the progress
  var g = c.createLinearGradient(x, y - r, x, y + r)
  g.addColorStop(0, 'cyan')
  g.addColorStop(1, '#E600FE')
  c.fillStyle = g
  c.beginPath()
  c.moveTo(x, y - 0.6 * r)
  c.lineTo(x, y - 0.8 * r)
  var a = p * 3.6 - 90
  c.arc(x, y, 0.8 * r, d2r(-90), d2r(a))
  // console.log( a,   x + 0.7 * r * Math.sin(d2r(a)),
  // y - 0.7 * r * Math.cos(d2r(a)),)
  c.arc(
    x + 0.7 * r * Math.sin(d2r(a+90)),
    y - 0.7 * r * Math.cos(d2r(a+90)),
    0.1 * r,
    d2r(a),
    d2r(a + 180)
  )
  c.arc(x, y, 0.6 * r, d2r(-90 + p * 3.6), d2r(-90), true)
  c.closePath()
  c.fill()
  // draw text
  c.font = ` ${r * 0.2}px sans-serif`
  c.textAlign = 'center'
  c.fillStyle = '#DE9DDE'
  c.fillText(`${p.toFixed()}%`, x, y - 0.2 * r)

  c.fillStyle = 'green'
  c.textBaseline = 'middle'
  var status = p < 100 ? 'LOADING' : 'COMPLETE'
  c.fillText(status, x, y)

  c.restore()
  p += .5
  if (p <= 100) window.requestAnimationFrame(draw.bind(undefined, x, y, r, p))
}

draw(220, 220, 200, 0)
