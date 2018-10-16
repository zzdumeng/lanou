define(["require", "exports", "./commentEditor", "./commentList"], function (require, exports, commentEditor_1, commentList_1) {
    "use strict";
    exports.__esModule = true;
    var Comment = /** @class */ (function () {
        function Comment(query, data) {
            var c = document.querySelector(query);
            var editor = new commentEditor_1["default"](this.addCommentItem.bind(this));
            var list = new commentList_1["default"](data || []);
            var fragment = document.createDocumentFragment();
            fragment.appendChild(editor.element);
            fragment.appendChild(list.element);
            c.appendChild(fragment);
            this.commentList = list;
            this.commentEditor = editor;
        }
        Comment.prototype.addCommentItem = function (data) {
            this.commentList.addComment(data);
        };
        return Comment;
    }());
    exports["default"] = Comment;
});
//# sourceMappingURL=comment.js.map