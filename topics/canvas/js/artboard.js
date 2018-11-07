var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener
EventTarget.prototype.off = EventTarget.prototype.removeEventListener

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

function capitalize(s) {
  return s[0].toUpperCase() + s.substring(1).toLowerCase()
}

function Toolbox(query, c) {
  this.toolbox = $(query)
  this.colors = this.toolbox.querySelectorAll('.colors .color')
  this.sizes = this.toolbox.querySelectorAll('.sizes .size')
  this.actions = this.toolbox.querySelectorAll('.actions .action')
  this.c = c
  this.brush = {
    color: 'black',
    size: 5,
    lineJoin: 'round',
    lineCap: 'round',
  }
  this.status = 'draw'
  // set colors
  this.colors.forEach((color) => {
    var c = color.classList[1]
    color.style.backgroundColor = c

    // add listeners
    color.on('click', this.selectColor.bind(this, c))
  })

  // set sizes
  this.sizes.forEach((size) => {
    var s = size.classList[1].substring(5)
    s = parseInt(s, 10)
    console.log(s)
    var e = document.createElement('div')
    e.classList.add('size-in')
    size.appendChild(e)
    e.style.width = s + 'px'
    e.style.height = s + 'px'

    // add listeners
    size.on('click', this.selectSize.bind(this, s))
  })

  this.actions.forEach((action) => {
    var act = action.classList[1].toLowerCase()
    // add a prefix to prevent native method override
    this.actions[`action-${act}`] = action
    action.on('click', this[`action${capitalize(act)}`].bind(this))
  })

  // draw!
  var canvas = this.c.canvas
  this.draw = this.draw.bind(this)
  this.move = this.move.bind(this)
  canvas.on('mousedown', (e) => {
    this.c.save()
    this.c.strokeStyle = this.brush.color
    this.c.lineWidth = this.brush.size
    this.c.lineJoin = this.brush.lineJoin
    this.c.lineCap = this.brush.lineCap

    this.c.beginPath()
    this.c.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    canvas.on('mousemove', this.move)
  })
  canvas.on('mouseup', () => {
    this.c.restore()
    canvas.off('mousemove', this.move)
  })
}

Toolbox.fn = Toolbox.prototype
// draw
Toolbox.fn.move = function(e) {
  switch (this.status) {
    case 'erase':
      this.erase(e)
      break
    case 'draw':
    default:
      this.draw(e)
  }
}
Toolbox.fn.draw = function(e) {
  this.c.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  this.c.stroke()
}
Toolbox.fn.erase = function(e) {
  this.c.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
  this.c.stroke()
}
// operations
Toolbox.fn.selectColor = function(c) {
  // need to set the composite operation back
  this.status = 'draw'
  this.c.globalCompositeOperation = 'source-over'
  this.brush.color = c
  this.status = 'draw'
}

Toolbox.fn.selectSize = function(s) {
  this.brush.size = s
}

Toolbox.fn.actionClear = function() {
  var can = this.c.canvas
  this.c.clearRect(0, 0, can.width, can.height)
}

Toolbox.fn.actionExport = function() {
  this.c.canvas.toBlob((blob) => {
    var a = document.createElement('a')
    var url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = 'image.png'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  })
}

Toolbox.fn.actionReset = function() {
  this.brush = {
    color: 'black',
    size: 5,
    lineJoin: 'round',
    lineCap: 'round',
  }
}

Toolbox.fn.actionEraser = function() {
  this.status = 'erase'
  this.brush.color = 'rgba(0,0,0,1)'
  this.c.globalCompositeOperation = 'destination-out'
}

const toolbox = new Toolbox('.toolbox', ctx)
