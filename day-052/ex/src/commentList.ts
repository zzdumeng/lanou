import h from './h'
import CommentItem, {CommentData} from './commentItem'
import ConvertService from './convertService' 

class CommentList {
  items: CommentItem[]
  element: HTMLElement
  convertService: ConvertService
  constructor(initialData: CommentData[] = []) {
    this.items = []
    const self = this
    // initialData.forEach((function(data) {
    //   const item = new CommentItem(data, self.removeComment)
    //   self.items.push(item)
    // }).bind(this))

    this.element = h('div', {className: 'comment-list'},
    [])  as HTMLElement
    // this.items.forEach(function(item) {
    //   self.addComment(item)
    // })
    const service = new ConvertService(this.items)
    this.convertService = service

    initialData.forEach(function(data) {
      self.addComment(data)
    })

    service.update()
    service.start()
  }

  addComment(data: CommentData) {
    const item = new CommentItem(data, this.removeComment.bind(this))
    this.items.push(item)
    this.element.insertBefore(item.element, this.element.firstChild)
    this.convertService.update(item)
  }

  removeComment(item: CommentItem) {
    const i = this.items.indexOf(item)
    if(i === -1) return;
    const self = this
    item.element.style.height = window.getComputedStyle(item.element).height
    self.items[i].element.classList.add('removed')
    setTimeout(function() {
      self.element.removeChild(self.items[i].element)
      self.items.splice(i, 1)

    }, 6000)
  }
}

export default CommentList