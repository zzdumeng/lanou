define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var TimeConvertor = /** @class */ (function () {
        function TimeConvertor(parameters) {
        }
        TimeConvertor.convert = function (date, relative) {
            if (relative === void 0) { relative = new Date(); }
            if (date > relative)
                return 'wow it comes from future';
            var seconds = Math.floor((Number(relative) - Number(date)) / 1000);
            var minutes = Math.floor(seconds / TimeConvertor.MINUTE);
            var hours = Math.floor(seconds / TimeConvertor.HOUR);
            var days = Math.floor(seconds / TimeConvertor.DAY);
            if (days > 0)
                return days + ' days ago';
            if (hours > 0)
                return hours + ' hours ago';
            if (minutes > 0)
                return minutes + ' minutes ago';
            return 'just now';
        };
        TimeConvertor.MINUTE = 60;
        TimeConvertor.HOUR = 3600;
        TimeConvertor.DAY = 3600 * 24;
        return TimeConvertor;
    }());
    exports["default"] = TimeConvertor;
});
//# sourceMappingURL=timeConvertor.js.map