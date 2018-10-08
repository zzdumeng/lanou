namespace 
namespace Freedrop {


  interface Velocity {
    x: number,
    y: number,
  }
  interface Position extends Velocity {

  }
  const G = -9.8;
  class Drop {
    private  timer = -1;
    private _position: Position;
    private _height:number;
    private _velocity: Velocity;
    private _items : HTMLElement[];
    constructor(height: number, v: Velocity = {x:0, y:0}) {

      this.timer = -1;
      this._height = height;
      this._items = [];
    }
    reset() {
      window.clearInterval(this.timer);
    }
    start() {
      const self = this;
      const dt = 1000/60;
      this.timer = setInterval(function() {
        self._velocity.y += G * dt;

        self._position.x += self._velocity.x * dt;
        self._position.y += self._velocity.y * dt;

        if(self._position.y < 0) {
          self._position.y = 0;
          self._velocity.y *= -1;
        }
      }, dt);
    }

    get velocity() {
      return this._velocity;
    }
    get position() {
      return this._position;
    }
    attach(ele: HTMLElement, ) {
      this._items.push(ele);
    }
  }

  const ball = document.getElementById('ball') as HTMLElement;

  const drop = new Drop(400);
  // drop.attach(ball, function() {

  // })
  drop.start()

}