const canvas = document.querySelector('#c')
const ctx = canvas.getContext('2d')
function d2r(d) {
  return (d * Math.PI) / 180
}

function drawBMW(c, x, y, r) {
  c.save()
  // draw the basic shape
  c.beginPath()
  c.strokeStyle = 'black'
  c.lineWidth = 2
  c.arc(x, y, r - 2, 0, 2 * Math.PI)
  c.stroke()

  c.beginPath()
  c.arc(x, y, r - 3, 0, 2 * Math.PI)
  c.stroke()

  c.beginPath()
  const g = c.createLinearGradient(x - r, y - r, 2 * r, 2 * r)
  g.addColorStop(0, 'black')
  g.addColorStop(0.5, '#444')
  g.addColorStop(1.0, 'black')

  c.fillStyle = g
  c.arc(x, y, r - 8, 0, 2 * Math.PI)
  c.fill()

  // draw center
  c.beginPath()
  c.fillStyle = 'white'
  c.arc(x, y, r / 2, 0, 2 * Math.PI)
  c.fill()

  c.beginPath()
  c.save()
  c.fillStyle = '#1A9CFC'
  c.moveTo(x, y)
  c.arc(x, y, r / 2 - 4, 0, d2r(90))
  c.moveTo(x, y)
  c.arc(x, y, r / 2 - 4, d2r(180), d2r(270))
  c.fill()
  c.restore()

  // draw text
  const fontSize = (r / 2) * 0.8
  console.log(fontSize)
  c.font = ` bold ${fontSize}px  sans-serif `
  const d = r / 2 - fontSize / 2
  c.fillStyle = 'white'
  c.textAlign = 'center'
  c.textBaseline = 'middle'
  c.save()
  c.translate(x - r / 2, y - r / 2)
  c.rotate(d2r(-45))
  c.fillText('B', 0, 0)
  c.restore()

  c.save()
  c.translate(x, r / 2 - fontSize / 2)
  c.fillText('M', 0, 0)
  c.restore()

  c.save()
  c.translate(x + r / 2, y - r / 2)
  c.rotate(d2r(45))
  c.fillText('W', 0, 0)

  c.restore()

  c.restore()
}
function drawPieChart(c, x, y, r, data) {
  c.save()
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'purple']
  const sr = 6
  // d is {value: 0.3}
  const sum = data.reduce((s, v) => s + v.value, 0)
  let a = 0
  c.lineWidth = 4
  c.strokeStyle = 'white'
  data.forEach(function(d, i) {
    c.save()
    const p = d.value / sum
    c.fillStyle = colors[i % colors.length]
    c.beginPath()
    const rad = d2r(a + p * 180)
    //draw a white line after each pie
    const rx = x //+ sr*Math.cos(rad)
    const ry = y //+ sr*Math.sin(rad)
    c.moveTo(rx, ry)
    c.arc(rx, ry, r - sr, d2r(a), d2r(a + p * 360))
    c.fill()
    a += p * 360
    c.restore()
  })
  let aa = 0
  c.resetTransform()
  // c.moveTo(0,0)
  // c.lineTo(100, 100)
  // c.stroke()
  data.forEach((d) => {
    c.save()
    const p = d.value / sum
    c.beginPath()
    c.translate(x, y)
    c.rotate(d2r(aa ))
    c.moveTo(0,0)
    c.lineTo(x + r, 0)
    c.stroke()
    c.restore()
    aa += p * 360
  })
  // draw a small circle in center
  c.beginPath()
  c.fillStyle = 'white'
  c.moveTo(x,y)
  c.arc(x,y, 0.2*r, 0, d2r(360))
  c.fill()
  c.restore()
}

function drawCat(c, x, y, r) {
  c.save()
  c.lineWidth = 1
  c.strokeStyle = '#333'
  c.fillStyle = '#2ABDED'
  const head = new Path2D()
  head.arc(x, y, r, 0, d2r(360))
  c.stroke(head)
  c.fill(head)

  c.fillStyle = 'white'
  const face = new Path2D()
  // face.arc(x, y+0.2*r, 0.7*r, 0, d2r(360))
  face.moveTo(x-0.8*r, y+0.1*r)
  face.bezierCurveTo(x-0.9*r, y-0.8*r,x+0.9*r, y-0.8*r  , x+0.8*r, y+0.1*r)
  face.bezierCurveTo( x+0.7*r, y+1.1*r,x-0.7*r, y+1.1*r  ,x-0.8*r, y+0.1*r)
  c.fill(face)
  c.stroke(face)

  // draw the eye
  c.beginPath()
  c.fillStyle = 'white'
  c.moveTo(x, y - 0.55 * r)
  c.arc(x + 0.2 * r, y - 0.55 * r, 0.2 * r, d2r(180), d2r(360))
  c.lineTo(x + 0.4 * r, y - 0.55 * r)
  c.arc(x + 0.2 * r, y - 0.4 * r, 0.2 * r, 0, d2r(180))
  c.lineTo(x, y - 0.55 * r)

  c.moveTo(x, y - 0.55 * r)
  c.arc(x - 0.2 * r, y - 0.55 * r, 0.2 * r, d2r(360), d2r(180), true)
  c.lineTo(x - 0.4 * r, y - 0.55 * r)
  c.arc(x - 0.2 * r, y - 0.4 * r, 0.2 * r, d2r(180), 0, true)
  c.lineTo(x, y - 0.55 * r)
  c.fill()
  c.stroke()

  c.beginPath()
  c.fillStyle = 'black'
  c.arc(x + 0.07 * r, y - 0.32 * r, 0.02 * r, 0, d2r(360))
  c.arc(x - 0.07 * r, y - 0.32 * r, 0.02 * r, 0, d2r(360))
  c.fill()
  // draw the nose
  const nose = new Path2D()
  nose.arc(x, y - 0.2 * r, 0.1 * r, 0, d2r(360))
  c.fillStyle = '#C54201'
  c.fill(nose)
  c.stroke(nose)
  /// the nose highlight
  c.save()
  const g = c.createRadialGradient(
    x + 0.05 * r,
    y - 0.19 * r,
    0.01 * r,
    x + 0.07 * r,
    y - 0.13 * r,
    0.1 * r
  )
  g.addColorStop(0, 'white')
  g.addColorStop(1, 'rgba(255,255,255, 0)')
  // c.shadowBlur = 0.05*r
  c.fillStyle = g
  c.beginPath()
  c.arc(x + 0.05 * r, y - 0.19 * r, 0.05 * r, 0, d2r(360))
  c.fill()
  c.restore()

  // draw the mouse, lip line, beard
  c.beginPath()
  c.moveTo(x, y - 0.1 * r)
  c.lineTo(x, y + 0.6 * r)
  c.stroke()
  c.beginPath()
  c.arc(x, y - 0.2 * r, r * 0.8, d2r(45), d2r(135))
  ;[0, 1, 2].forEach((i) => {
    c.moveTo(x - 0.2 * r, y - 0.1 * r)
    c.lineTo(x - 0.4 * r, y - 0.2 * r)
    c.moveTo(x + 0.2 * r, y - 0.1 * r)
    c.lineTo(x + 0.4 * r, y - 0.2 * r)

    c.moveTo(x - 0.1 * r, y)
    c.lineTo(x - 0.4 * r, y)
    c.moveTo(x + 0.1 * r, y)
    c.lineTo(x + 0.4 * r, y)

    c.moveTo(x - 0.1 * r, y + 0.1 * r)
    c.lineTo(x - 0.4 * r, y + 0.2 * r)
    c.moveTo(x + 0.1 * r, y + 0.1 * r)
    c.lineTo(x + 0.4 * r, y + 0.2 * r)
  })
  c.stroke()

  c.restore()
}

function drawLineChart(c, x, y, w, h, data, opts) {
  c.save()
  const color = (opts || {}).color || '#984B43'
  const p = 20
  const g = 10
  const r = 0.8
  c.fillStyle = 'rgba(30,30,30,0.3)'
  // c.fillRect(x, y, w, h)
  // draw the markers
  c.strokeStyle = 'black'
  c.moveTo(x + p, y + h - p)
  c.lineTo(x + w, y + h - p)
  c.moveTo(x + p, y + h - p)
  c.lineTo(x + p, y + p)
  c.stroke()

  /// draw vertical marker
  const max = Math.max.apply(undefined, data.map((d) => d.value))
  const sw = (w - 2 * p - 2 * g) / data.length / 2
  const numf = (h-2*p) / 50
  const num = Math.floor(numf)
  const slice = max/num

  c.fillStyle = 'black'
  for (let i = 0; i < num; i++) {
    c.beginPath()
    c.moveTo(x + p, y+h -p - i*50)
    c.lineTo(x + 0.1*p, y+h-p -i*50)
    c.stroke()
    c.fillText((slice*i/r).toFixed(1), x, y+h-p -i*50)
  }
  /// draw horizontal marker

  // draw the chart
  c.fillStyle = ''
  c.textAlign = 'center'
  data.forEach((d, i) => {
    c.beginPath()
    c.fillStyle = color
    // c.moveTo()
    const ox = x + p + g + i * 2 * sw
    const oh = (h - 2 * p) * (d.value / max) * r
    console.log(oh)
    const oy = y + h - p - oh
    c.rect(ox, oy, sw, oh)
    c.fill()
    c.fillStyle = 'black'
    c.fillText(d.name, ox + sw / 2, y + h)
  })

  c.restore()
}

// // drawA(ctx, 200, 200, 200)

function drawTaichi(c, x, y, r, opts) {
  const color = (opts || {}).color || '#25274D'
  c.save()
  // c.translate(-x, -y)
  // c.rotate(d2r(a))
  c.lineWidth = 1
  // outside circle
  c.strokeStyle = color
  c.fillStyle = color
  c.beginPath()
  c.arc(x, y, r, 0, d2r(360))
  c.stroke()
  // fill the right half
  c.beginPath()
  // c.moveTo(x, y - r)
  c.arc(x, y - r / 2, r / 2, d2r(270), d2r(90), true)
  // c.moveTo(x, y)
  c.arc(x, y + r / 2, r / 2, d2r(-90), d2r(90))

  // c.moveTo(x, y + r)
  c.arc(x, y, r, d2r(90), d2r(-90), true)
  // c.closePath()
  // c.stroke()
  c.fill()

  // draw the two small circles
  c.beginPath()
  c.arc(x, y - r / 2, r / 4, 0, d2r(360))
  // c.stroke()
  c.fillStyle = 'white'
  c.fill()

  c.beginPath()
  c.fillStyle = color
  c.arc(x, y + r / 2, r / 4, 0, d2r(360))
  c.fill()

  c.closePath()
  c.restore()
}

// drawCat(ctx, 200, 200, 180)
// drawTaichi(ctx, 210, 210, 200, {color: '#25274D'})
// drawBMW(ctx, 200, 200, 200 )
// drawPieChart(ctx, 200, 200, 200, [
//   { value: 10 },
//   { value: 20 },
//   { value: 5 },
//   { value: 30 },
//   { value: 40 },
//   { value: 50 },
//   { value: 50 },
// ])

drawLineChart(ctx, 0, 0, 300, 400,[
  {name: 'JAN', value: 20},
  {name: 'FEB', value: 285},
  {name: 'MAR', value: 26},
  {name: 'APR', value: 40},
  {name: 'MAY', value: 7},
])