$(document).ready(
  function() {

    //add list

    ;['蔬菜', '松子', '蜂蜜', '苹果醋']
    .forEach(function(item, i) {
      $('<li></li>')
      .text(item)
      .css({background: i!==3?'#E0666A':'#F68C65'})
      .appendTo('.cart ul')
    })

    $('.shopping-list li')
    .on('click', function(e) {
      // this fade out
      $(this)
      .fadeOut()
      .animate({paddingLeft: '+100'},
       {queue: false})
      // text slide to right
      // use padding left to simulate
    })

    $('.header span')
    .on('click', function() {
      // fade in in a sequence 
      const d = 400
      $('.shopping-list li')
      .each(function(i, e) {
      //   $(this)
      //   .delay(d*i )
      //   .fadeIn({ease: 'linear',
      // start : function() {
      //   $(this).slideDown({queue: false})
      // }.bind(this)})

      $(this)
      .css({opacity: 0, height: 0})
      .delay(i*d)
      .show()
      .animate({opacity: 1,
      height: 80}, 600)
        // $(this).delay(d*i).slideDown({queue: false})

      })
    })
    
    $('.shopping-list li').hide()

  }
)