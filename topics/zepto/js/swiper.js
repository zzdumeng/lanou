var mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'vertical',
  loop: true,
  loopAdditionalSlides: 1,
  autoplay: {
    delay: 1000,
  },
  effect: "cube",
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})
$('.swiper-container').on('mouseleave', function() {
  mySwiper.autoplay.start()
})
