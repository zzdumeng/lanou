var ValueProvider;
(function (ValueProvider) {
    var SquareValueProvider = /** @class */ (function () {
        function SquareValueProvider(speed, dt, start) {
            if (start === void 0) { start = { x: 0, y: 0 }; }
            this._f = dt;
            this._originalPosition = start;
            this._position = start;
            this._speed = speed;
            this.slaves = [];
        }
        SquareValueProvider.prototype.attach = function (cb) {
            // this.slaves.push({element: ele, callback: cb});
            this.reactions.push(cb);
        };
        SquareValueProvider.prototype.output = function () {
            return this._position;
        };
        SquareValueProvider.prototype.detach = function (cb) {
            var i = this.reactions.indexOf(cb);
            if (i < 0)
                return -1;
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
        };
        SquareValueProvider.prototype.reset = function () {
            clearInterval(this._timer);
            this._position = this._originalPosition;
        };
        SquareValueProvider.prototype.start = function () {
            var self = this;
            this._timer = setInterval(this.update.bind(this, this._f), this._f);
        };
        SquareValueProvider.prototype.update = function (dt) {
            this._position.x += this._speed.x * dt;
            this._position.y += this._speed.y * dt;
            if (this._position.x > 1) {
                this._position.x = 1;
                this._speed.x *= -1;
            }
            else if (this._position.x < 0) {
                this._position.x = 0;
                this._speed.x *= -1;
            }
            if (this._position.y < 0) {
                this._position.y = 0;
                this._speed.y *= -1;
            }
            else if (this._position.y > 1) {
                this._position.y = 1;
                this._speed.y *= -1;
            }
            this._updateSlaves();
        };
        SquareValueProvider.prototype.pause = function () {
            clearInterval(this._timer);
        };
        SquareValueProvider.prototype._updateSlaves = function () {
            var self = this;
            this.reactions.forEach(function (cb) {
                cb(this._position);
            });
            // this.slaves.forEach(function (slave) {
            //   const output = slave.callback(self._position);  
            //   Object.keys(output).forEach(function(k) {
            //     slave.element[k] = output[k];
            //   })
            // })
        };
        return SquareValueProvider;
    }());
    ValueProvider.SquareValueProvider = SquareValueProvider;
})(ValueProvider || (ValueProvider = {}));
