function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}
var TwoColorBall = /** @class */ (function () {
    function TwoColorBall() {
    }
    TwoColorBall.generate = function () {
        this.generateRedBalls();
        this.generateBlueBall();
    };
    TwoColorBall.generateRedBalls = function () {
        var balls = [];
        for (var i = 0; i < 33; i++) {
            balls[i] = i + 1;
        }
        for (var i = 0; i < 6; i++) {
            this._redBalls[i] = balls.splice(randomInt(0, balls.length - 1), 1)[0];
        }
    };
    TwoColorBall.generateBlueBall = function () {
        this._bludBall = randomInt(1, 16);
    };
    Object.defineProperty(TwoColorBall, "redBalls", {
        get: function () {
            return this._redBalls.sort(function (a, b) {
                return a - b;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwoColorBall, "blueBall", {
        get: function () {
            return this._bludBall;
        },
        enumerable: true,
        configurable: true
    });
    TwoColorBall._redBalls = [];
    TwoColorBall._bludBall = 0;
    return TwoColorBall;
}());
function repeat(s, n) {
    var r = "";
    while (n > 0) {
        r += s;
        n--;
    }
    return r;
}
function pad(n, size) {
    if (n.length < size) {
        return repeat("0", size - n.length) + n;
    }
    return n;
}
// TwoColorBall.generate();
// console.log(TwoColorBall.redBalls, TwoColorBall.blueBall);
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
function main() {
    var redBalls = $$('.ball-red');
    var blueBall = $('.ball-blue');
    var roll = $('.roll');
    var balls = Array.prototype.concat.apply([blueBall], redBalls);
    function gen() {
        balls.forEach(function (ball) {
            ball.classList.remove('animate');
            window.requestAnimationFrame(function () {
                ball.classList.add('animate');
            });
        });
        TwoColorBall.generate();
        redBalls.forEach(function (red, i) {
            red.innerText = pad(TwoColorBall.redBalls[i].toString(), 2);
        });
        blueBall.innerText = pad(TwoColorBall.blueBall.toString(), 2);
    }
    roll.onclick = gen;
    gen();
}
main();
