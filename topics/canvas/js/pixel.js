const canvas = document.getElementById('canvas')
canvas.width = 320
canvas.height = 568

const ctx = canvas.getContext('2d')

var img = new Image()
img.onload = () => {
  var h = (img.height / img.width) * 320
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 320, h)
}

img.src = '../img/eight.jpg'

const gray = document.getElementById('gray')
const reverseBtn = document.getElementById('reverse')
function grayen(iData) {
  let i = 0
  for (let i = 0; i < iData.data.length; i = i + 4) {
    let r = iData.data[i],
      g = iData.data[i + 1],
      b = iData.data[i + 2]
    var s = (r + g + b) / 3
    iData.data[i] = s
    iData.data[i + 1] = s
    iData.data[i + 2] = s
  }
  return iData
}
function grayen2(iData) {
  let i = 0
  for (let i = 0; i < iData.data.length; i = i + 4) {
    let r = iData.data[i],
      g = iData.data[i + 1],
      b = iData.data[i + 2]
    s = r * 0.299 + g * 0.587 + b * 0.114
    iData.data[i] = s
    iData.data[i + 1] = s
    iData.data[i + 2] = s
  }
  return iData
}

function reverse(iData) {
  let i = 0
  for (let i = 0; i < iData.data.length; i = i + 4) {
    let r = iData.data[i],
      g = iData.data[i + 1],
      b = iData.data[i + 2]
    iData.data[i] = 255-r
    iData.data[i + 1] = 255-g
    iData.data[i + 2] = 255-b
  }
  return iData
}
gray.onclick = () => {
  var iData = ctx.getImageData(0, 0, 160, 200)
  iData = grayen(iData)
  ctx.putImageData(iData, 0, 0)

  iData = ctx.getImageData(160, 0, 160, 200)
  iData = grayen2(iData)
  ctx.putImageData(iData, 160, 0)
}

reverseBtn.onclick = () => {
  var iData = ctx.getImageData(0, 0, 320, 200)
  iData = reverse(iData)
  ctx.putImageData(iData, 0, 0)

}
