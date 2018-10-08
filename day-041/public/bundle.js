(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main;
(function (Main) {
    function deg2rad(deg) {
        return deg * Math.PI / 180;
    }
    var Ball = /** @class */ (function () {
        function Ball(ball) {
            this.ball = ball;
            this.speed = 0.02 * 5;
            this.angle = 0;
            this.a = 1;
            setInterval(this.move.bind(this), 1000 / 60);
        }
        Ball.prototype.move = function (dt) {
            if (dt === void 0) { dt = 1000 / 60; }
            if (this.angle > 60) {
                this.a = -1;
            }
            if (this.angle < -60) {
                this.a = 1;
            }
            var delta = 1;
            this.angle += this.a * delta;
            var vx = this.speed * Math.sin(deg2rad(this.angle));
            var vy = this.speed * Math.cos(deg2rad(this.angle));
            var dx = vx * dt;
            var dy = vy * dt;
            this.ball.style.top = parseFloat(this.ball.style.top) + dx + 'px';
            this.ball.style.left = parseFloat(this.ball.style.left) + dy + 'px';
        };
        return Ball;
    }());
    function randInt(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    function main() {
        var ball = document.getElementsByClassName('ball')[0];
        setInterval(function () {
            ball.style.top = parseInt(ball.style.top, 10) + randInt(-5, 5) + 'px';
            ball.style.left = parseInt(ball.style.left, 10) + randInt(-5, 5) + 'px';
        }, 1000 / 60);
    }
    // const ball = new Ball(document.getElementsByClassName('ball')[0] as HTMLElement);
    // main();
    var value = new ValueProvider.SquareValueProvider({ x: 0.01, y: 0.01 }, 1000);
    value.attach(function (p) {
        console.log(p.x, p.y);
    });
})(Main || (Main = {}));
// function init() {
//   const ball = document.getElementsByClassName('ball')[0] as HTMLElement;
//   const effect = new AnimationEffect()
//   const animation = new Animation()
// }
// init()
// function f(a, b, c) {
//   console.log(a+b+c);
// }

},{}]},{},[1]);
