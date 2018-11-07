$(document).ready(function() {
  function createMenuItem(t) {
    return $('<li></li>')
      .css({
        lineHeight: '32px',
        height: 32,
      })
      .text(t)
  }

  function createSubMenu(o) {
    const title = o.title
    const items = o.items
    const sub = $('<ul></ul>')
    items.forEach(function(t) {
      createMenuItem(t).appendTo(sub)
    })
    return $('<div></div>')
      .css({ border: 'solid 1px lightgray' })
      .append(
        $('<div></div>')
          .text(title)
          .css({ background: 'skyblue' })
          .addClass('menu-header')
          .on('click', function() {
            sub.slideToggle()
            // and slideUp other submenu
            $('.container ul').not($(this).next())
            .slideUp()
          })
      )
      .append(sub)
  }

  const data = [
    {
      title: '衬衫',
      items: ['长袖', '短袖', 'T shirt'],
    },
    {
      title: '卫衣',
      items: ['有帽', '无帽', '加厚'],
    },
    {
      title: '裤子',
      items: ['男士', '女士'],
    },
  ]

  data.forEach(function(m) {
    createSubMenu(m).appendTo('.container')
  })

  // init to display none
  $('.container ul')
  .hide()
  .first()
  .show()
})
