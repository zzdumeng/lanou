$('.box').on('click', function(e) {
  console.log(e)
})

$('#select').chosen({width: '120px'});

$('html').on('mousedown', function(e) {
  console.log(e.which, e.pageX,e.pageY)
})

$('html').on('keydown', function(e) {
  console.log(e.which, )
})