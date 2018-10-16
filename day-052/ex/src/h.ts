 
function h(tag: string, attrs?: object, children?: any[] | string) {
  attrs = attrs ? attrs : {}
  children = children ? children : []

  if(tag === 'text')
    return document.createTextNode(children[0] || "")

  const d = document.createElement(tag)
  Object.keys(attrs).forEach(function(k) {
    d[k] = attrs[k]
  })

  if(typeof children === 'string') {
    d.appendChild(h('text', {}, [children]))
  }else {
    children.forEach(function(child) {
      d.appendChild(child)
    })

  }
  return d
}

export default h
