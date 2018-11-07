const canvas = document.getElementById('canvas')
canvas.width = 800
canvas.height = 800
const ctx = canvas.getContext('2d')

  var video = document.createElement('video')

  video.addEventListener('canplay', (e) =>{
    var w = video.videoWidth
    var h = video.videoHeight
    console.log('sdf', w,h )
    var h2 = h/w * 320
    // if(!video.ended) {
    //   ctx.drawImage(video, 0,0,w,h, 0,0, 320, h2)
    //   ctx.drawImage(video, 0,0,w,h,  340, 0, 320, h2)
    // }
  })

  video.src = '../res/diqiu.mp4'

  // video.addEventListener('seeked', (e) => {
  //   // draw
  //   var w = video.videoWidth
  //   var h = video.videoHeight
  //   var h2 = h/w * 320
  //     ctx.drawImage(video, 0,0,w,h, 0,0, 320, h2)
  //     ctx.drawImage(video, 0,0,w,h,  340, 0, 320, h2)

  // })
  var t = 0
  var start = Date.now()
  function play() {
    var now = Date.now()
    var passed  = (now - start) / 1000
    t = passed
    if(t > video.duration) {
      t = 0
      start = now
    }
    // video.currentTime = t
    var w = video.videoWidth
    var h = video.videoHeight
    // var h2 = h/w * 320
    //   ctx.drawImage(video, 0,0,w,h, 0,0, 320, h2)
    //   ctx.drawImage(video, 0,0,w,h,  340, 0, 320, h2)

  window.requestAnimationFrame(play)
  }
  window.requestAnimationFrame(play)

// init()
