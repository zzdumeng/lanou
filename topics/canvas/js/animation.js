const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

function extend(c, p) {
  var o = Object.create(p.prototype)
  c.prototype = o
  c.prototype.constructor = c
}

//
function Path() {
  this._current = 0
}
Object.defineProperty(Path.prototype, 'current', {
  get() {
    return this._current
  },
  set(v) {
    this._current = v > 1 ? 0 : v < 0 ? 1 : v
  },
})
Path.prototype.getPosition = function() {
  return this._position()
}

//
function CirclePath(x, y, r) {
  Path.call(this)
  this.x = x
  this.y = y
  this.r = r
}
extend(CirclePath, Path)

CirclePath.prototype._position = function() {
  var p = {
    x: this.x + this.r * Math.cos(Math.PI * 2 * this.current),
    y: this.y + this.r * Math.sin(Math.PI * 2 * this.current),
  }
  console.log(p)
  return p
}
// RectPath will start from the x,y
function RectPath(x, y, w, h) {
  Path.call(this)
  this.x = x
  this.y = y
  this.width = w
  this.height = h
}
extend(RectPath, Path)
RectPath.prototype._position = function() {
  var c = (this.width + this.height) * 2
  var l = this.current * c
  if (l > 2 * this.width + this.height) {
    return {
      x: this.x,
      y: this.y + c - l,
    }
  }
  if (l > this.width + this.height) {
    return {
      x: this.x + (2 * this.width + this.height - l),
      y: this.y + this.height,
    }
  }
  if (l > this.width) {
    return {
      x: this.x + this.width,
      y: this.y + l - this.width,
    }
  }

  var p = {
    x: this.x + l,
    y: this.y,
  }
  console.log(p)
  return p
}

function Rail() {
  this.path
}

Rail.prototype.draw = function(c) {
  c.clearRect(0, 0, c.canvas.width, c.canvas.height)
  c.save()
  var pos = this.path.getPosition()
  c.fillStyle = 'red'
  c.beginPath()
  c.arc(pos.x, pos.y, 10, 0, Math.PI * 2)
  c.fill()

  c.restore()
}
Rail.prototype.animate = function(c) {
  this.draw(c)
  this.path.current += 0.01
  window.requestAnimationFrame(this.animate.bind(this, c))
}

var rail = new Rail()
rail.path = new CirclePath(200, 200, 100)
// rail.path = new RectPath(200, 200, 100, 50)
rail.animate(ctx)
