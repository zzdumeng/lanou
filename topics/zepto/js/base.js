$(function() {
  $('.box').on('tap', function() {
    console.log('taggped')
  })
  .on('longTap', function() {
    console.log('you tapped two long')
  })
  .on('singleTap', ()=> {
    console.log('single..')
  })
  .on('doubleTap', ()=> {
    console.log('double..')
  })

  $('ul li')
    .on('swipeLeft', function() {
      $('.delete')
        .css({ right: '-100px' })
        .hide()
      $('.delete', this)
        .show()
        .animate({ right: '0px' }, 500)
      $('.delete').on('tap', function() {
        $(this)
          .parent()
          .remove()
      })
    })
    .on('swipeRight', function() {
      if (parseInt($('.delete', this).css('right'), 10) > -100) {
        $('.delete', this)
          .animate({
            right: '-100px',
          })
          // .hide()
      }
    })
})
