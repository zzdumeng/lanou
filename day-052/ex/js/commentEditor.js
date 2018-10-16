define(["require", "exports", "./h"], function (require, exports, h_1) {
    "use strict";
    exports.__esModule = true;
    function randomInt(a, b) {
        return Math.floor(Math.random() * (b - a + a) + a);
    }
    var CommentEditor = /** @class */ (function () {
        function CommentEditor(onSubmit) {
            this.onSubmit = onSubmit;
            var nameInput = h_1["default"]('input', { className: 'comment-editor-name', type: 'text' }, []);
            var contentInput = h_1["default"]('textarea', {
                rows: '10', className: 'comment-editor-content'
            }, '');
            var submitButton = h_1["default"]('input', { type: 'submit',
                onclick: this.submit.bind(this) }, []);
            var editor = h_1["default"]('form', { 'className': 'comment-editor' }, [nameInput,
                contentInput,
                h_1["default"]('div', { className: 'form-group' }, [submitButton])]);
            this.element = editor;
            this.nameInput = nameInput;
            this.contentInput = contentInput;
        }
        CommentEditor.prototype.submit = function (e) {
            e.preventDefault();
            var name = this.nameInput.value.trim();
            var content = this.contentInput.value.trim();
            var avatar = './img/avatar-' + randomInt(0, 7) + '.png';
            this.onSubmit({ name: name, content: content, avatar: avatar });
            this.clear();
        };
        CommentEditor.prototype.clear = function () {
            this.nameInput.value = '';
            this.contentInput.value = '';
        };
        return CommentEditor;
    }());
    exports["default"] = CommentEditor;
});
//# sourceMappingURL=commentEditor.js.map