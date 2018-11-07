const canvas = document.getElementById('canvas')
canvas.width = 320
canvas.height = 568

const ctx = canvas.getContext('2d')

const canvas2 = document.getElementById('mask')
canvas2.width = 320
canvas2.height = 568

const ctx2 = canvas2.getContext('2d')

// ctx.beginPath()
// ctx.fillStyle = 'blue'
// ctx.fillRect( 20, 20, 80,80)

// ctx.globalCompositeOperation = 'destination-over'
// ctx.fillStyle = 'red'
// ctx.fillRect( 60, 60, 180,180)
// // ctx.beginPath()

// draw the image
var img = new Image()
img.onload = () => {
  ctx.drawImage(img, 0, 0, 320, 568)
  // draw others
  draw(ctx)
}
img.src = '../img/cark.png'

function draw(ctx) {
  // the prize
  // the mask layer
  // draw the image on the front
  ctx.fillStyle = 'gray'
  ctx.globalCompositeOperation = 'source-over'
  // ctx.fillRect(10, 150, 300, 200 )
  // and delete the white 
  var idata = ctx.getImageData(10, 150, 300, 200)
  for(let i =0; i<idata.length; i=i+4) {
    var r = idata.data[i]
    var g = idata.data[i+1]
    var b = idata.data[i+2]
    if(r>200&&g>200 && b>200) {
      // is white
      idata.data[i+3] = 0 
    }
  }
  // putback
  ctx.putImageData(idata, 10, 150, 300, 200)
}

function drawMask( ) {
  var i = new Image()
  img.src = '../img/cask.png'
  ctx.drawImage(i, 10, 250, 300, 200, 10, 250, 300, 200)
  ctx.getImageData()
}

canvas.addEventListener('touchstart', (e) => {

  ctx.beginPath()
  ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY)
  ctx.fillStyle = 'rgba(0,0,0,1)'
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 20
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.globalCompositeOperation = 'destination-out'
})

canvas.addEventListener('touchmove', (e) => {
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  // console.log(x)
  // ctx.arc( x, y, 20, 0, Math.PI * 2)
  ctx.lineTo(x, y)
  ctx.stroke()
})
canvas.addEventListener('touchend', (e) => {
  ctx.closePath()
})