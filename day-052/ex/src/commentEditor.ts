import h from './h'
function randomInt(a,b) {
  return Math.floor(Math.random() * (b-a+a) + a)
}
class CommentEditor {
  element: HTMLElement
  nameInput: HTMLInputElement
  contentInput: HTMLTextAreaElement
  constructor(public onSubmit: Function) {
    const nameInput = h('input', { className: 'comment-editor-name', type: 'text' },
      []) as HTMLInputElement

    const contentInput = h('textarea', {
      rows: '10', className: 'comment-editor-content',
    }, '') as HTMLTextAreaElement

    const submitButton = h('input', { type: 'submit',
      onclick: this.submit.bind(this) }, [])
    const editor = h('form', { 'className': 'comment-editor' },
      [nameInput,
        contentInput,
        h('div', { className: 'form-group' },
          [submitButton])]) as HTMLElement

    this.element = editor
    this.nameInput = nameInput
    this.contentInput = contentInput
  }

  submit(e:MouseEvent) {
    e.preventDefault()
    const name = this.nameInput.value.trim()
    const content = this.contentInput.value.trim()
    const avatar = './img/avatar-' + randomInt(0,7) + '.png'
    this.onSubmit({name, content, avatar})
    this.clear()
  }
  clear() {
    this.nameInput.value = ''
    this.contentInput.value = ''
  }
}

export default CommentEditor

