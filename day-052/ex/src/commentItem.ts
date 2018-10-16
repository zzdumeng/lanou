import h from './h'
interface CommentData {
  name: string,
  content: string,
  date?: Date,
  avatar?: string,
}

class CommentItem {
  element: HTMLElement
  id: Number
  date: Date // the submit time
  stampElement: HTMLElement // displayed on the UI
  constructor(public data: CommentData, public onDelete: Function) {
    const self = this
    const now = data.date || new Date()
    const stampElement = h('div', {}, now.toDateString()) as HTMLElement
    const item = h('div', {'className': 'comment-item'},
      [h('div', {className: 'comment-item-left'}, [
        h('div', {}, [h('img', {src: data.avatar}, [])]),
        h('div', {}, data.name),
      ]),
      h('div', {className: 'comment-item-right'},
        [ h('div', {}, data.content),
       stampElement,  ]),
      h('button', {className: 'delete', 'onclick': self.delete.bind(self)}, '')]) as HTMLElement
    

    this.element = item
    this.id = now.getTime()
    this.date = now
    this.stampElement = stampElement
  }

  updateStamp(stamp: string) {
    this.stampElement.innerText = stamp
  }

  delete() {
    this.onDelete(this)
    console.log(this.id, ': I am deleted...')
  }
}

export default CommentItem;
export {CommentData}
