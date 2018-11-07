function extend(child, parent) {
  child.prototype = Object.create(parent.prototype)
  child.prototype.constructor = child
}

function Zombie(configs) {
  var {healthMax, harm, health} = configs
  this.healthMax = healthMax || 50
  this.harm = harm || 3
  this.health = health || this.healthMax
}

Zombie.prototype.attacked = function() {
  this.health -= this.harm
}

Zombie.prototype.die = function() {
  this.health = 0
}

function BlockZombie(configs) {

  var {healthMax, harm, health, equipment} = configs
  Zombie.call(this, {healthMax, harm, health})
  
  this.equipment = equipment
}

extend(BlockZombie, Zombie)

BlockZombie.prototype.lostEquipment = function(equip) {
  this.equipment = null
}

function IronZombie(configs) {
  var {healthMax, harm, health, equipment, weakpoint} = configs
  BlockZombie.call(this, {healthMax, harm, health, equipment })
  this.weakpoint = weakpoint
}

extend(IronZombie, BlockZombie)

function Equipment(power) {
  this.power = power
}
function RoadBlock() {
  Equipment.call(this, 10)
}

extend(RoadBlock, Equipment)

function IronBucket() {
  Equipment.call(this, 20)
}

var block = new RoadBlock()
var bucket = new IronBucket()
var zombie = new  Zombie({healthMax: 50, harm: 3})
var blockZombie = new  BlockZombie({healthMax: 80, harm: 2, equipment: block})
var ironZombie = new  IronZombie({healthMax: 120, harm: 1, equipment: bucket, })

