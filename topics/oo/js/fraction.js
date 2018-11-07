function rem(n, m) {
  return (n -  Math.floor(n/m) * m)
}

function Fraction(x, y) {
  this.numberator = x
  this.denominator = y
}

Fraction.prototype.add = function(f) {
  return new Fraction(
    this.numberator * f.denominator + this.denominator * f.numberator,
    this.denominator * f.denominator
  ).reduct()
}

Fraction.prototype.minus = function(f) {
  return new Fraction(
    this.numberator * f.denominator - this.denominator * f.numberator,
    this.denominator * f.denominator
  ).reduct()
}

Fraction.prototype.mul = function(f) {
  return new Fraction(
    this.numberator * f.numberator,
    this.denominator * f.denominator
  ).reduct()
}
Fraction.prototype.div = function(f) {
  return new Fraction(
    this.numberator*f.denominator,
    this.denominator*f.numberator
  ).reduct()
}

Fraction.prototype.reduct = function() {
  var a = this.numberator
  var b =  this.denominator
  while(b!==0) {
    var c = a %  b
    a = b
    b = c
  }
  this.numberator /= a
  this.denominator /= a
  return this
}
Fraction.prototype.reduct0 = function() {
  for(var i = 2; i<= this.numberator; i++) {
    if(rem(this.numberator, i) ===0 && rem(this.denominator,i) === 0 ) {
      return new Fraction(this.numberator/i, this.denominator/i).reduct()
    }
  }
  return this
}

Fraction.prototype.log = function() {
  console.log(this.numberator + '/' + this.denominator)
}

Fraction.prototype.toFloat = function() {
  return this.numberator / this.denominator
}

// var a = new Fraction(x, y)
var a = new Fraction(8, 24)
var b = new Fraction(7, 25)

var add = a.add(b)
var minus = a.minus(b)
var mul = a.mul(b)
var div = a.div(b)

add.log()
minus.log()
mul.log()
div.log()
