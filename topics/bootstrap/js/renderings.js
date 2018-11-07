var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
})

var placeholder = $('<div></div>')
  .css({
    position: 'positive',
    top: -10000000,
  })
  .appendTo(document.body)

var container = $('.grid')
var H = 200

function getImageSize(src, cb) {
  var img = $('<img>')
    .attr('src', src)
    .appendTo(placeholder)
  img.on('load', function() {
    // console.log( img.get(0).getBoundingClientRect())
    cb(img.get(0).getBoundingClientRect())
    img.remove()
  })
  // var r = img.get(0).getBoundingClientRect()
  // console.log('before ', r)
  // return { width: r.width, height: r.height }
}

function getSrc(n) {
  let nn = n < 10 ? '0' + n : n
  return `/img-ex/render-small-pic${nn}.jpg`
}

function getRatio() {}

// this return the percentage of width
function caculateWidth(sizes) {
  var c = sizes.length
  var ratios = sizes.map(function(s) {
    return s.width / s.height
  })

  var sum = ratios.reduce(function(s, e) {
    return s + e
  }, 0)

  return ratios.map(function(r) {
    return r / sum
  })
}

function createRow() {}

function main() {
  for (let i = 10; i < 26; i++) {
    const row = $('<div></div>')
      .addClass('image-row')
      .appendTo(container)
    let count = 0
    let sizes = []
    ;[getSrc(i++), getSrc(i++), getSrc(i++)].forEach(function(src, index) {
      getImageSize(src, function(size) {
        count += 1
        sizes[index] = size
        if (count === 3) {
          let ws = caculateWidth(sizes)
          ;[3,2,1,].forEach(function(e, ind) {
            const col = $(`<div><img src="${getSrc(i-e)}" /></div>`)
              .addClass('image-col')
              .css({ width: ws[ind] * 100 + '%' })
              .data('ratio', ws[ind]  )
              .on('click', function() {
                console.log('click')
                $('#image-modal')
                .modal('show')
                .find('img')
                .attr('src', getSrc(i-e))
              })
              .appendTo(row)
          })
        }
      })
    })
  }

  $(window).on('resize', function() {
    $('.image-col img').each(function() {
      $(this).css({height: $(this).width / $(this).data('ratio')})
    })
  })



}

main()
