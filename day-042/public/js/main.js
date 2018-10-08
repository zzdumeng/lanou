var Clock = /** @class */ (function () {
    function Clock(fq) {
        if (fq === void 0) { fq = 1000; }
        this.fq = fq;
        this.timer = setInterval(this.update.bind(this, this.fq), fq);
        this.reactions = [];
        this.update(this.fq);
    }
    Clock.prototype.update = function (dt) {
        var date = new Date();
        var _a = [date.getHours(),
            date.getMinutes(),
            date.getSeconds()], h = _a[0], m = _a[1], s = _a[2];
        this.reactions.forEach(function (cb) {
            cb(h, m, s);
        });
    };
    Clock.prototype.attach = function (cb) {
        if (this.reactions.indexOf(cb) > 0)
            return this;
        this.reactions.push(cb);
        return this;
    };
    return Clock;
}());
var clock = new Clock();
var hourPointer = document.getElementsByClassName('hour-pointer')[0];
var minutePointer = document.getElementsByClassName('minute-pointer')[0];
var secondPointer = document.getElementsByClassName('second-pointer')[0];
function setRotate(ele, deg) {
    ele.style.transform = "rotate(" + deg + "deg)";
}
function updateHour(h, m, s) {
    // hourPointer.style.transform = "rotate"
    var hh = h + m / 60 + s / 3600;
    setRotate(hourPointer, hh * 30 - 90);
}
function updateMinute(h, m, s) {
    var mm = m + s / 60;
    setRotate(minutePointer, mm * 6 - 90);
}
function updateSecond(h, m, s) {
    setRotate(secondPointer, s * 6 - 90);
}
clock.attach(updateHour)
    .attach(updateMinute)
    .attach(updateSecond);
