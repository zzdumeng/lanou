function randInt(a, b) {
    return Math.random();
    // return 3;
}
function max() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length === 2) {
        return args[0] > args[1] ? args[0] : args[1];
    }
    if (args.length === 1) {
        return args[0];
    }
    if (args.length === 0) {
        return undefined;
    }
    return max(args[0], max.apply(void 0, args.slice(1)));
}
function main() {
    console.log(max(3, 4, 20, 30, 1));
    console.log(max(2, 4));
    console.log(max());
}
main();
