var w = 180;
var InfiniteCarousel = /** @class */ (function () {
    function InfiniteCarousel(selector, images, dt) {
        if (dt === void 0) { dt = 1000 / 60; }
        this.images = images;
        this.container = document.querySelector(selector);
        this.head = 0;
        this.dt = dt;
        this.items = [];
        this.init();
    }
    InfiniteCarousel.prototype.init = function () {
        // for(let i = 0; i)
        var self = this;
        this.images.forEach(function (image, i) {
            var item = document.createElement('div');
            item.className = 'item';
            item.style.backgroundImage = 'url("' + image + '")';
            item.style.left = w * i + 'px';
            self.items.push(item);
            self.container.appendChild(item);
        });
    };
    InfiniteCarousel.prototype.play = function () {
        this.timer = setInterval(this.update.bind(this, this.dt), this.dt);
    };
    InfiniteCarousel.prototype.update = function (delta) {
        // const 
        var reset = false;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var left = parseFloat(item.style.left);
            left = left - delta / 1000 * 50;
            var d = -w - left;
            if (d > 0) {
                reset = true;
                left = w * 5;
                continue;
            }
            if (reset)
                item.style.left = w * (i - 1) + 'px';
            else
                item.style.left = left + 'px';
        }
        // this.items.forEach(function(item) {
        //   let left = parseFloat(item.style.left);
        //   left = left - delta /1000 * 50
        //   const d = -w - left;
        //   if(d > 0) {
        //     left = w * 5 - d;
        //   }
        //   item.style.left = left + 'px';
        // }.bind(this));
    };
    InfiniteCarousel.prototype.pause = function () {
        clearInterval(this.timer);
    };
    return InfiniteCarousel;
}());
var images = [
    './assets/0.jpeg',
    './assets/1.jpeg',
    './assets/2.jpeg',
    './assets/3.jpeg',
    './assets/4.jpeg',
    './assets/5.jpeg',
];
var carousel = new InfiniteCarousel('.carousel', images);
carousel.play();
