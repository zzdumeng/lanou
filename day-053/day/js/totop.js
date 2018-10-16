var totop = document.querySelector('.totop');
var main = document.querySelector('main');
var timer ;
var n = 0;
main.onscroll = function() {
  console.log('scroll..' , n++)
  if(main.scrollTop > 80) {
    totop.classList.add('visible')
    return
  }
    totop.classList.remove('visible')
}

totop.onclick = function() {
  var c = main.scrollTop;
  var d = c / 20
  timer = setInterval(function() {
    main.scrollTop -= d;
    if(main.scrollTop <= 0)
      clearInterval(timer)
  }, 1000/60)
  // main.scrollTop = 0
}

