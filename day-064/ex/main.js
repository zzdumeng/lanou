$(function(){
  const username = $('#username')
  const content = $('#content')
  
  $('input[type="submit"]')
  .on('click', function(e) {
    e.preventDefault()
    if(username.val().trim() && content.val().trim()) {

      addComment(username.val().trim(),
        content.val().trim())
      username.val("")
      content.val("")
    }
  })

  function addComment(n, c) {
    const comment = $('<div></div>')
    .text(n+" " + c)
    .appendTo('.comments')
    .hide()
    .slideDown(600)
    const d = $('<div>')
    .text('delete')
    .css({color: 'red'})
    .addClass('delete')
    .on('click', function() {
      comment.slideUp(600, function() {
        comment.remove()
      })
    })
    .appendTo(comment)


  }
})