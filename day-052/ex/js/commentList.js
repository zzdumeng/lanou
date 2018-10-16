define(["require", "exports", "./h", "./commentItem", "./convertService"], function (require, exports, h_1, commentItem_1, convertService_1) {
    "use strict";
    exports.__esModule = true;
    var CommentList = /** @class */ (function () {
        function CommentList(initialData) {
            if (initialData === void 0) { initialData = []; }
            this.items = [];
            var self = this;
            // initialData.forEach((function(data) {
            //   const item = new CommentItem(data, self.removeComment)
            //   self.items.push(item)
            // }).bind(this))
            this.element = h_1["default"]('div', { className: 'comment-list' }, []);
            // this.items.forEach(function(item) {
            //   self.addComment(item)
            // })
            var service = new convertService_1["default"](this.items);
            this.convertService = service;
            initialData.forEach(function (data) {
                self.addComment(data);
            });
            service.update();
            service.start();
        }
        CommentList.prototype.addComment = function (data) {
            var item = new commentItem_1["default"](data, this.removeComment.bind(this));
            this.items.push(item);
            this.element.insertBefore(item.element, this.element.firstChild);
            this.convertService.update(item);
        };
        CommentList.prototype.removeComment = function (item) {
            var i = this.items.indexOf(item);
            if (i === -1)
                return;
            var self = this;
            item.element.style.height = window.getComputedStyle(item.element).height;
            self.items[i].element.classList.add('removed');
            setTimeout(function () {
                self.element.removeChild(self.items[i].element);
                self.items.splice(i, 1);
            }, 6000);
        };
        return CommentList;
    }());
    exports["default"] = CommentList;
});
//# sourceMappingURL=commentList.js.map