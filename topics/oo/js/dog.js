function Dog() {
  this.age = 100
}

Dog.prototype.bark = function() {
  console.log('bark!')
}

Dog.prototype.type = "Canidae"

var dog = new Dog()

var Dog2 = Dog.bind(this)
Dog2.prototype.constructor = Dog2

var dog2 = new Dog2()

