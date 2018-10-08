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
