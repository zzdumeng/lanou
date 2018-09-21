function isLucky(n, luck, l) {
    if (l === void 0) { l = 1; }
    var d = Math.pow(10, (l - 1));
    var divider = parseInt(String(n / d), 10);
    var m = Number(divider) % 10;
    return m === luck;
}
function is7(n) {
    // return  n % 10 === 7
    return isLucky(n, 7);
}
function sum() {
}
function main() {
    var sum = 0;
    for (var i = 0; i < 100; i++) {
        if (is7(i)) {
            console.log(i);
            sum += i;
        }
    }
    console.log('sum is ', sum);
}
main();
