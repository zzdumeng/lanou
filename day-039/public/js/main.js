/// <reference lib="es2017.string" />
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var promptNumber = 4;
function clamp(n, a, b) {
    return (n - b) % (b - a) + a;
}
function modify(n, a, b) {
    if (n > b)
        return a;
    if (n < a)
        return b;
    return n;
}
function initBG() {
    var ad = $('.ad');
    var prev = $('.btn-prev');
    var next = $('.btn-next');
    var currentPrompt = 0;
    function changeBg(b) {
        var url = "";
        currentPrompt = b ? currentPrompt + 1 : currentPrompt - 1;
        currentPrompt = modify(currentPrompt, 0, promptNumber - 1);
        ad.style.backgroundImage = "url(/assets/promPic_" + currentPrompt + ".jpg)";
    }
    prev.onclick = changeBg.bind(undefined, false);
    next.onclick = changeBg.bind(undefined, true);
}
function createTab() {
    var qrcodeTab = $('.login-qrcode');
    var accountTab = $('.login-account');
    var qrcodeContent = $('.qrcode-content');
    var accountContent = $('.account-content');
    function toggle(a, b) {
        console.log('clicked ', this.innerText);
        a.classList.add('active');
        b.classList.remove('active');
        qrcodeTab.classList.remove('active');
        accountTab.classList.remove('active');
        this.classList.add('active');
    }
    qrcodeTab.onclick = toggle.bind(qrcodeTab, qrcodeContent, accountContent);
    accountTab.onclick = toggle.bind(accountTab, accountContent, qrcodeContent);
}
function main() {
    initBG();
    createTab();
}
main();
