(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function $(s) {
    return document.querySelector(s);
}
var count = 8;
function main() {
    var prev = $('.prev');
    var next = $('.next');
    var img = $('#img');
    var carousel = $('.carousel');
    var index = 0;
    function src(n) {
        return "./assets/" + (n + 1) + ".jpg";
    }
    function gotoIndex(_index) {
        index = _index;
        img.src = src(index);
    }
    function goPrev() {
        if (--index < 0)
            index = count;
        gotoIndex(index);
    }
    function goNext() {
        if (++index >= count)
            index = 0;
        gotoIndex(index);
    }
    prev.onclick = goPrev;
    next.onclick = goNext;
    var t;
    carousel.onmouseover = function () {
        clearInterval(t);
    };
    carousel.onmouseleave = function () {
        t = setInterval(goNext, 100);
    };
    gotoIndex(index);
    t = setInterval(goNext, 100);
}
main();

},{}]},{},[1]);
