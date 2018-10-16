import CommentEditor from './commentEditor'
import CommentList from './commentList'
import { CommentData } from './commentItem'

class Comment {
  commentList: CommentList
  commentEditor: CommentEditor
  constructor(query: string, data?: CommentData[]) {
    const c = document.querySelector(query)
    const editor = new CommentEditor(this.addCommentItem.bind(this))
    const list = new CommentList(data || [])

    const fragment = document.createDocumentFragment()
    fragment.appendChild(editor.element)
    fragment.appendChild(list.element)
    c.appendChild(fragment)


    this.commentList = list
    this.commentEditor = editor
  }

  addCommentItem(data: CommentData) {
    this.commentList.addComment(data)
  }
}

export default Comment
