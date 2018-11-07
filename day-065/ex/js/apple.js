$(document).ready(function() {
  //
  const container = $('<div><ul></ul></div>')
    .find('ul')
    .css({
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'row',
      border: 'solid 1px gray',
    })
    .end()
    .css({})
    .appendTo(document.body)

  const hover = $('<div><img /></div>')
    .find('img')
    .css({ width: '100%' })
    .end()
    .css({
      pointerEvents: 'none',
      position: 'absolute',
      // width: 320,
      // height: 320,
      border: 'solid 1px gray',
      boxShadow: '0 0 4px rgba(30,30,30,0.2)'
    })
    .appendTo(container)

  function createItem(url) {
    // FIXME:
    const item = $(`<li><img src="${url}"/></li>`)
      // .css({width: 150, height: 150})
      .find('img')
      .css({ width: '100%' })
      .end()
      .css({ width: 150, height: 150 })
    // item.find('img')
    //  .css({width: '100%'})

    return item
  }

  ;[1, 2, 3, 4].forEach(function(i) {
    const item = createItem('/img/apple' + i + '.jpeg')
    item.appendTo(container.find('ul'))
  })
  function getSrc(i) {
    return '/img/apple' + i + '.jpeg'
  }
  function onMove(e) {
      const dx = e.pageX - container.offset().left
      const dy = e.pageY - container.offset().top
      hover.css({ left: dx, top: dy })

  }
  function onEnter(e) {
    $(this).one('mouseleave', onLeave)
    hover.stop(true)
      hover.animate({width: 400,height: 400}, 400)

      console.log('enter')
      hover.find('img').attr('src', getSrc($(this).index() + 1))
  }
  function onLeave(e) {

    $(this).one('mouseenter', onEnter)
      // hover.hide()
    hover.stop(true)
      hover.animate({width:0,height: 0}, 400)
  }
  $('div ul li')
    .one('mouseenter', onEnter )
    .on('mousemove',  onMove)
})
