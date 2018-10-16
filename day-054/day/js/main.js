var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var container = $('.container')
var progress = $('.progress')

function addImage(url) {
  toggleProgress()
  progress.style.width = '0'
  var img = new Image()
  img.src = url
  img.onloadstart = function(e) {
    var t = e.total
    img.
    var timer = setInterval(function() {
      updateProgress(img, t)
    }, 200)
  }
  img.onload = function() {
    
  }
}

function updateProgress(ele, t) {
  
}

function toggleProgress(f) {
  if(arguments.length > 0) {

  }
  if( progress.style.display === 'none' )
     progress.style.display = 'block' 
  else
    progress.style.display = 'none' 
}


document.addEventListener('DOMContentLoaded', function() {
  console.log('dom contentloaded')
})
document.onreadystatechange = function() {
  if(document.readyState === 'interactive')

  console.log('interactive')
  else if (document.readyState === 'complete')
  console.log('complete')
}

window.onload = function() {
  console.log('all loaded.')
}