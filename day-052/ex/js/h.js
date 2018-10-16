define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function h(tag, attrs, children) {
        attrs = attrs ? attrs : {};
        children = children ? children : [];
        if (tag === 'text')
            return document.createTextNode(children[0] || "");
        var d = document.createElement(tag);
        Object.keys(attrs).forEach(function (k) {
            d[k] = attrs[k];
        });
        if (typeof children === 'string') {
            d.appendChild(h('text', {}, [children]));
        }
        else {
            children.forEach(function (child) {
                d.appendChild(child);
            });
        }
        return d;
    }
    exports["default"] = h;
});
//# sourceMappingURL=h.js.map