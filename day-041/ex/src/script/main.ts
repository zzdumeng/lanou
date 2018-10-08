
function $(s) {
  return document.querySelector(s);
}
const count = 8;
function main() {
  const prev = <HTMLElement>$('.prev');
  const next = <HTMLElement>$('.next');
  const img = <HTMLImageElement>$('#img');
  const carousel = <HTMLElement>$('.carousel');

  let index = 0;

  function src(n: number) {
    return "./assets/"+(n+1)+".jpg";
  }

  function gotoIndex(_index: number) {
    index = _index;
    img.src = src(index);
  }

  function goPrev() {
    if(--index < 0) index = count;
    gotoIndex(index);
  }

  function goNext() {
    if(++index >= count) index = 0;
    gotoIndex(index);
  }
  prev.onclick = goPrev;
  next.onclick = goNext;

  let t;
  carousel.onmouseover = function() {
    clearInterval(t);
  }
  carousel.onmouseleave = function () {
    t = setInterval(goNext, 100);
  }

  gotoIndex(index);
  t = setInterval(goNext, 100);
}

main();

