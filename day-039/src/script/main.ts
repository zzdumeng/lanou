/// <reference lib="es2017.string" />
const $ : (string) => HTMLElement = document.querySelector.bind(document);
const $$ : (string) => NodeList = document.querySelectorAll.bind(document);

const promptNumber = 4;

function clamp(n: number, a: number, b:number) {
  return  (n-b) % (b-a) +a ; 
}

function modify(n:number, a: number, b: number) {
  if(n>b) 
  return a
  if(n<a)
  return b
  return n
}
function initBG() {
  const ad = $('.ad');
  const prev = $('.btn-prev');
  const next = $('.btn-next');
  let currentPrompt = 0;
  function changeBg(b) {
    const url = "";
    currentPrompt = b ? currentPrompt + 1 : currentPrompt - 1;
    currentPrompt = modify(currentPrompt, 0, promptNumber-1);
    ad.style.backgroundImage = "url(/assets/promPic_" + currentPrompt+".jpg)";
  }

  prev.onclick = changeBg.bind(undefined, false)
  next.onclick = changeBg.bind(undefined, true)
}

function createTab() {
  const qrcodeTab = $('.login-qrcode');
  const accountTab = $('.login-account');
  const qrcodeContent = $('.qrcode-content')
  const accountContent = $('.account-content')

  function toggle(a:HTMLElement, b: HTMLElement) {
    console.log('clicked ', this.innerText);
    a.classList.add('active');
    b.classList.remove('active');

    qrcodeTab.classList.remove('active');
    accountTab.classList.remove('active');

    this.classList.add('active');
  }
  qrcodeTab.onclick  = toggle.bind(qrcodeTab, qrcodeContent, accountContent)
  accountTab.onclick  = toggle.bind(accountTab, accountContent, qrcodeContent)
}

function main() {
  initBG();
  createTab();
}

main();


