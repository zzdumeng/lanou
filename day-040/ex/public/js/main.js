/// <reference lib="es6"/>
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var Carousel = /** @class */ (function () {
    function Carousel(ele, images) {
        this.container = ele;
        this.index = 0;
        this.images = images;
        this.items = Array.from(this.container.children).slice(0, -1);
        this.indicator = new Carousel.Indicator(ele.lastChild, this.gotoIndex.bind(this));
    }
    Carousel.prototype.gotoIndex = function (n) {
        this.items.forEach(function (item) {
            // item.style.display = "none";
            item.className = "item";
        });
        var current = this.items[this.index];
        var item = this.items[n];
        if (n > this.index) {
            item.classList.add('slide-left-in');
            current.classList.add('slide-left-out');
        }
        else {
            item.classList.add('slide-right-in');
            current.classList.add('slide-right-out');
        }
        // item.style.display = "block";
        this.index = n;
    };
    Carousel.prototype.goNext = function () {
    };
    Carousel.prototype.goPrevious = function () {
    };
    return Carousel;
}());
(function (Carousel) {
    var Indicator = /** @class */ (function () {
        function Indicator(ele, cb, light) {
            if (light === void 0) { light = 0; }
            this.index = 0;
            this.container = ele;
            // init
            this.count = ele.childNodes.length;
            this.index = light;
            this.items = Array.apply(undefined, ele.childNodes);
            var self = this;
            this.items.forEach(function (item, i) {
                item.onclick = self.gotoIndex.bind(self, i, cb);
            });
            this.gotoIndex(this.index, cb);
        }
        Indicator.prototype.gotoIndex = function (n, cb) {
            this.items.forEach(function (item) {
                item.classList.remove('active');
            });
            this.items[n].classList.add('active');
            cb(n);
        };
        return Indicator;
    }());
    Carousel.Indicator = Indicator;
})(Carousel || (Carousel = {}));
var images = [];
[1, 2, 3, 4, 5].forEach(function (i) {
    images.push("/assets/" + i + ".jpg");
});
var carousel = new Carousel($('.carousel'), images);
