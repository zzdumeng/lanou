$(function() {
  const tabs = $('.tab')
  const contents = $('.content')
  let swiper;
  function setTab(n) {
    $('#title').text(tabs.eq(n).text().trim())
    ;[ tabs].forEach(function(d) {
      d.eq(n)
        .addClass('active')
        .siblings()
        .removeClass('active')
    })
    swiper.slideTo(n, 500)
  }
  function init() {
    //create swiper
     swiper = new Swiper('.main',
    {
      // Optional parameters
      direction: 'horizontal',
      // loop: true,
      // loopAdditionalSlides: 1,
      // autoplay: {
      //   delay: 1000,
      // },
      // effect: "",
      // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true
      // },
    
      // // Navigation arrows
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
    
      // // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    })


    tabs.on('click touch', function(e) {
      // console.log(e.type);
      setTab($(this).index())
    })
    setTab(0)
  }

  init()
})
