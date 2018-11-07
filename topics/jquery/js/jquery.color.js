(function() {
  if($ || jQuery) {
  $ = $ || jQuery
  
  // extend the jquery itself
  $.extend({
    log: function() {
      console.log.apply(console, arguments)
    }
  })

  // extend the jquery collection

  $.fn.extend({
    uppercase: function() {
      return this.each(function(){
        $(this).text($(this).text().toUpperCase())
      })
    }
  })

  $.fn.highlight = function(o) {
    var opts = $.extend({}, $.fn.highlight.dkefaults, o)

    return this.css({color: opts.foreground,
    backgroundColor: opts.background})
  }

  $.fn.highlight.defaults = {
    foreground: 'red',
    background: 'green'
  }
}
})()