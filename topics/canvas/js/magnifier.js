const canvas = document.getElementById('canvas')
canvas.width = 640
canvas.height = 480
const ctx = canvas.getContext('2d')

const canvas2 = document.getElementById('magnifier')
canvas2.width = 640
canvas2.height = 480
const ctx2 = canvas2.getContext('2d')

function init() {
  var image = new Image()
  image.onload = () => {
    var h = (image.height / image.width) * canvas.width
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, h)

    // add lisenter
    ctx2.fillStyle = 'white'
    function move(e) {
      var x = e.clientX - canvas2.offsetLeft
      var y = e.clientY - canvas2.offsetTop
      ctx2.clearRect(0,0, canvas.width, canvas.height)
      ctx2.save()
      ctx2.beginPath()
      const r  = 100
      const s = 0.5
      ctx2.arc(x, y, r, 0, Math.PI * 2)
      ctx2.fill()
      ctx2.globalCompositeOperation = 'source-in'
      // ctx2.drawImage(image, x/canvas.width * image.width - s*r,
      //  y/h * image.height -s* r, r*2*s, r*2*s, x-r, y-r, 2*r,2*r)
      ctx2.closePath()
      ctx2.drawImage(image, x/canvas.width * image.width - s*r,
       y/h * image.height -s* r, r*2*s, r*2*s, x-r, y-r, 2*r,2*r)
      //  console.log( x/canvas.width * image.width - s*r,
      //  y/h * image.height -s* r, r*2*s, r*2*s, x-r, y-r, 2*r,2*r)
       ctx2.restore()
    }
    canvas2.addEventListener('mousedown', (e) => {
      var x = e.clientX - canvas2.offsetLeft
      var y = e.clientY - canvas2.offsetTop

      canvas2.addEventListener('mousemove', move)
    })
    canvas2.addEventListener(
      'mouseup',
      () => {canvas2.removeEventListener('mousemove', move);
    ctx2.clearRect(0, 0, canvas.width, canvas.height)}
    )
  }
  image.src = '../img/eight.jpg'
}

init()
