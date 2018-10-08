namespace ValueProvider {

  export class SquareValueProvider implements ValueProvider {
    private _timer: number;
    private _position: Point;
    private _originalPosition: Point;
    private _f: number;
    private _speed: Vec2;
    slaves: ValueProvider.Slave[]; 
    reactions: Function[];

    constructor(speed: Vec2, dt: number, start: Point = { x: 0, y: 0 }) {
      this._f = dt;
      this._originalPosition = start;
      this._position = start;
      this._speed = speed;
      this.slaves = [];
    }

    attach( cb: Function) {
      // this.slaves.push({element: ele, callback: cb});
      this.reactions.push(cb);
    }
    output() {
      return this._position;
    }
    detach(cb: Function) {
      const i = this.reactions.indexOf(cb) ;
      if(i<0) return -1;
      this.reactions.splice(i, 1);
      return i;
      // for(let i = 0; i < this.slaves.length; i++) {
      //   if(this.slaves[i].element === ele) {
      //     this.slaves.splice(i, 1);
      //     return 1;
      //   }
      // }
      // not detached.
      // return 0;

    }
    reset() {
      clearInterval(this._timer);
      this._position = this._originalPosition;
    }
    start() {
      const self = this;
      this._timer = setInterval(
        this.update.bind(this, this._f), this._f
      )
    }
    update(dt: number) {
      this._position.x += this._speed.x * dt;
      this._position.y += this._speed.y * dt;
      if(this._position.x > 1) {
        this._position.x = 1;
        this._speed.x *= -1;
      } else if(this._position.x < 0) {
        this._position.x = 0;
        this._speed.x *= -1;
      }
      if(this._position.y < 0) {
        this._position.y = 0;
        this._speed.y *= -1;
      }else if(this._position.y > 1) {
        this._position.y = 1;
        this._speed.y *= -1;
      }

      this._updateSlaves()
    }

    pause() {
      clearInterval(this._timer);
    }

    _updateSlaves() {
      const self = this;
      this.reactions.forEach(function(cb) {
        cb(this._position);
      })
      // this.slaves.forEach(function (slave) {
      //   const output = slave.callback(self._position);  
      //   Object.keys(output).forEach(function(k) {
      //     slave.element[k] = output[k];
      //   })
      // })
    }
  }
}