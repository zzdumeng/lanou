define(["require", "exports", "./h"], function (require, exports, h_1) {
    "use strict";
    exports.__esModule = true;
    var CommentItem = /** @class */ (function () {
        function CommentItem(data, onDelete) {
            this.data = data;
            this.onDelete = onDelete;
            var self = this;
            var now = data.date || new Date();
            var stampElement = h_1["default"]('div', {}, now.toDateString());
            var item = h_1["default"]('div', { 'className': 'comment-item' }, [h_1["default"]('div', { className: 'comment-item-left' }, [
                    h_1["default"]('div', {}, [h_1["default"]('img', { src: data.avatar }, [])]),
                    h_1["default"]('div', {}, data.name),
                ]),
                h_1["default"]('div', { className: 'comment-item-right' }, [h_1["default"]('div', {}, data.content),
                    stampElement,]),
                h_1["default"]('button', { className: 'delete', 'onclick': self["delete"].bind(self) }, '')]);
            this.element = item;
            this.id = now.getTime();
            this.date = now;
            this.stampElement = stampElement;
        }
        CommentItem.prototype.updateStamp = function (stamp) {
            this.stampElement.innerText = stamp;
        };
        CommentItem.prototype["delete"] = function () {
            this.onDelete(this);
            console.log(this.id, ': I am deleted...');
        };
        return CommentItem;
    }());
    exports["default"] = CommentItem;
});
//# sourceMappingURL=commentItem.js.map