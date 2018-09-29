namespace;
var Freedrop;
(function (Freedrop) {
    var G = -9.8;
    var Drop = /** @class */ (function () {
        function Drop(height, v) {
            if (v === void 0) { v = { x: 0, y: 0 }; }
            this.timer = -1;
            this.timer = -1;
            this._height = height;
            this._items = [];
        }
        Drop.prototype.reset = function () {
            window.clearInterval(this.timer);
        };
        Drop.prototype.start = function () {
            var self = this;
            var dt = 1000 / 60;
            this.timer = setInterval(function () {
                self._velocity.y += G * dt;
                self._position.x += self._velocity.x * dt;
                self._position.y += self._velocity.y * dt;
                if (self._position.y < 0) {
                    self._position.y = 0;
                    self._velocity.y *= -1;
                }
            }, dt);
        };
        Object.defineProperty(Drop.prototype, "velocity", {
            get: function () {
                return this._velocity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drop.prototype, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Drop.prototype.attach = function (ele) {
            this._items.push(ele);
        };
        return Drop;
    }());
    var ball = document.getElementById('ball');
    var drop = new Drop(400);
    drop.attach(ball, function () {
    });
    drop.start();
})(Freedrop || (Freedrop = {}));
