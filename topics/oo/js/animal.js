function Animal(specie, kind, name) {
  this.specie = specie
  this.kind = kind
  this.name = name
  this.prey = []
}

Animal.prototype.hunt = function(ani) {
  this.prey.push(ani)
}

function Cat(name, color) {
  Animal.call(this, 'Felidae', 'Cat', name)
  this.color = color
}


// var p = {}
// p.__proto__ = Animal.prototype
// Cat.prototype = p
Cat.prototype = Object.create(Animal.prototype)
Cat.prototype.constructor = Cat
Cat.prototype.run = function() {
  console.log('running')
}

var cat = new Cat('cachy')
var acat = new Cat('molly')
cat.hunt(acat)
cat.run()
