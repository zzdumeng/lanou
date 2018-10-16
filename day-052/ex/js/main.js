define(["require", "exports", "./comment"], function (require, exports, comment_1) {
    "use strict";
    exports.__esModule = true;
    function main() {
        // const d = h('div', {}, 
        // [h('h1', {'style': 'color: red'}, 'heading 1'),
        // h('p', {'style': 'font-size: 32px'}, 'a paragraph'),
        // h('div', {}, [h('h2', {}, 'h2')])])
        // document.body.appendChild(d)
        var fakeData = [
            {
                name: 'mark',
                content: "one",
                date: new Date('2010'),
                avatar: './img/avatar-2.png'
            },
            {
                name: 'john',
                content: "two",
                date: new Date('2018-10-10'),
                avatar: './img/avatar-3.png'
            },
            {
                name: 'tom',
                content: "three",
                date: new Date('2018-11-10'),
                avatar: './img/avatar-5.png'
            }
        ];
        var c = new comment_1["default"]('.comment-area', fakeData);
        var button = document.querySelector('button');
        button.onclick = function () {
            c.addCommentItem({ name: String(Math.random()),
                content: Math.random().toString() });
        };
    }
    main();
});
//# sourceMappingURL=main.js.map