define(["require", "exports", "./timeConvertor"], function (require, exports, timeConvertor_1) {
    "use strict";
    exports.__esModule = true;
    var ConvertService = /** @class */ (function () {
        function ConvertService(items) {
            this.items = items;
        }
        ConvertService.prototype.start = function () {
            var self = this;
            this.timer = setInterval(function () {
                self.update();
            }, 1000 * 60);
        };
        ConvertService.prototype.stop = function () {
            clearInterval(this.timer);
        };
        ConvertService.prototype.update = function (item) {
            if (item) {
                item.updateStamp(timeConvertor_1["default"].convert(item.date));
                return;
            }
            var self = this;
            var now = new Date();
            var stamp;
            self.items.forEach(function (item) {
                stamp = timeConvertor_1["default"].convert(item.date, now);
                item.updateStamp(stamp);
            });
        };
        return ConvertService;
    }());
    exports["default"] = ConvertService;
});
//# sourceMappingURL=convertService.js.map