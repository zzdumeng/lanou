const canvas = document.getElementById('canvas')
canvas.width = 320
canvas.height = 568

const ctx = canvas.getContext('2d')

const canvas2 = document.getElementById('mask')
canvas2.width = 320
canvas2.height = 568

const ctx2 = canvas2.getContext('2d')

var img = new Image()
img.onload = () => {
  console.log(img)
  const h = (img.height / img.width) * 320
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 320, h)
  drawWatermark(ctx)
}
img.src = '../img/eight.jpg'

function drawWatermark(c) {
  c.save()
  c.fillStyle = 'black'
  c.font = '64px serif'
  // c.globalCompositeOperation = 'destination-out'
  c.fillText('eight', 20, 80)
  c.restore()
}

var exp = document.getElementById('export')
exp.onclick = () => {
  canvas.toBlob((blob) => {
    var a = document.createElement('a')
    document.body.append(a)
    var url = window.URL.createObjectURL(blob)

    a.href=  url
    a.download = 'image.png'
    a.click()
    window.URL.revokeObjectURL(url)
  }, 'image/png')
}
