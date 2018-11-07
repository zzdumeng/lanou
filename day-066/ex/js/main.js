$(function() {
  // get theme value from cookie
  const themes = ['light', 'dark', 'color']
  const theme = Cookies.get('theme')
  const themePalette = {
    'light': {
      'primary': '#333',
      'secondary': '#eee'
    },
    'dark': {
      'primary': '#eee',
      'secondary': '#333'
    },
    'color': {
      'primary': 'lightblue',
      'secondary': 'purple'
    },

  }
  function writeStyle(theme) {
    let sheet = $('style[data-use="theme"]')
    if (sheet.length === 0) {
      sheet = $('<style data-use="theme"></style>')
    }
    const palette = themePalette[theme]
    sheet.text(`:root{
      --primary: ${palette.primary} ;
      --secondary: ${palette.secondary};
      }`)
    sheet.appendTo('head')
  }
  function init() {
    if (themes.indexOf(theme) !== -1) {
      setTheme(theme)
    }
    $('.box').on('click', function() {
      changeTheme(this.dataset.theme)
    })
    $('#menu').scotchPanel({
      containerSelector: 'body', // As a jQuery Selector
      direction: 'left', // Make it toggle in from the left
      duration: 300, // Speed in ms how fast you want it to be
      transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
      clickSelector: '#open', // Enables toggling when clicking elements of this class
      distanceX: '30%', // Size fo the toggle
      enableEscapeKey: true, // Clicking Esc will close the panel
    })
  }

  function setTheme(t) {
    // themes.forEach(function(theme) {
    //   $('html').removeClass(`theme-${theme}`)
    // })
    // $('html').addClass(`theme-${t}`)
    writeStyle(t)
  }

  function changeTheme(t) {
    if (themes.indexOf(t) !== -1) {
      Cookies.set('theme', t, { expires: 365 })
    }
    setTheme(t)
  }

  init()
})
