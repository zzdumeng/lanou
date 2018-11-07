
  function swap(a,b) {
    return [b,a]
  }
  function getSrc(i) {
    return '../img/0' + (i+1) + '.jpg'
  }
  function setSrc(suite, n) {
      suite.find('img').each(function() {
        $(this).attr('src', getSrc(n))
  })
}

  const n = 4;
  let index = 0;
  let currentSuite, nextSuite;
  let indicator
  function createSuite() {
    return $('<div class="suite"><img /> <img /><img /><img /></div>')
    .appendTo('.content')
  }

  // create 2 suites
  
  //create indicator
  function createIndicator() {
    const indicators = $('<div></div>')
    .addClass('dots')
    ;[1,2,3,4,].forEach(function(i) {
      $('<div></div>')
      .addClass('dot')
      .appendTo(indicators)
    })

    indicators.insertAfter('.header .title')
    return indicators
  }


  currentSuite = createSuite()
  nextSuite = createSuite()
  setSrc(currentSuite, 0)
  indicator = createIndicator()
  indicator.find('.dot').eq(index).addClass('active')
  //add listeners
  $('.btn-group button').on('click', function(i) {
    nextSuite.finish()
    currentSuite.finish()
    if($(this).index()===0) {
      index = index + 1 >= n ? 0 : index+1
      currentSuite.animate({left: -400}, {
        duration: 500,})
      setSrc(nextSuite, index)
      nextSuite.css({left: 400})
      nextSuite.animate({left: 0}, 500)
    } else {
      // move right
      index = index - 1 <0? n -1: index-1
      currentSuite.animate({left: 400}, 500) 
      setSrc(nextSuite, index)
      nextSuite.css({left: -400})
      nextSuite.animate({left: 0}, 500)

    }
    indicator.find('.dot').eq(index).addClass('active')
    .siblings().removeClass('active')
    //  
      // [ nextSuite, currentSuite]=swap(currentSuite, nextSuite)
      let t= nextSuite
      nextSuite = currentSuite
      currentSuite = t
  })