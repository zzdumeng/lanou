;(function($) {
  function Tabs(jq, options) {
    this.jq = jq
    this.tabs = this.jq.find('.tab')
    this.contents = this.jq.find('.tab-content')
    this.opts = $.extend({}, Tabs.defaults, options)
    var that = this
    this.tabs.on(this.opts.triggerType, function(e) {
      e.preventDefault()
      that.switchTo($(this).index())
    })
    this.switchTo(this.opts.initialIndex)
  }

  Tabs.defaults = {
    initialIndex: 0,
    triggerType: 'click',
    activeClass: 'active',
    inEffect: 'slideDown',
    outEffect: 'hide',
  }

  Tabs.prototype.switchTo = function(index) {
    this.tabs
      .eq(index)
      .addClass(this.opts.activeClass)
      .siblings()
      .removeClass('active')
    this.contents
      .eq(index)
      [this.opts.inEffect]()
      .siblings()
      [this.opts.outEffect]()
  }

  Tabs.prototype.setEffect = function(effects) {
    var { inEffect, outEffect } = effects
    $.extend(this.opts, { inEffect, outEffect })
  }

  $.fn.tab = function(options) {
    this.each(function() {
      new Tabs($(this))
    })
    return this
  }
})(jQuery)
