EventTarget.prototype.on = EventTarget.prototype.addEventListener
EventTarget.prototype.off = EventTarget.prototype.removeEventListener

function Draggable(query) {

  this.target = document.querySelector(query)
  this.dx = 0
  this.dy = 0
  this.target.on('mousedown', this.onMouseDown.bind(this))
}

Draggable.fn = Draggable.prototype

Draggable.fn.onMouseMove = function(e) {
  var left = e.clientX - this.dx
  var top = e.clientY - this.dy
  this.target.style.left = left + 'px'
  this.target.style.top = top + 'px'
}

Draggable.fn.onMouseUp = function(e) {

}

Draggable.fn.onMouseDown = function(e) {
  this.dx = e.clientX - this.target.offsetLeft
  this.dy = e.clientY - this.target.offsetTop
  var move = this.onMouseMove.bind(this)
  var mouseUp =  function() {
    document.off('mousemove', move)
    document.off('mouseup', mouseUp)
  }
  document.on('mousemove', move)
  document.on('mouseup', mouseUp)
}


