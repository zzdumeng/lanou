import TimeConvertor from './timeConvertor'
import CommentItem from './commentItem'

class ConvertService {
  timer: number
  constructor(public items: CommentItem[]) {

  }

  start() {
    const self = this
    this.timer = setInterval(function () {
      self.update()
    }, 1000 * 60)
  }

  stop() {
    clearInterval(this.timer)
  }

  update(item?: CommentItem) {
    if(item) {
      item.updateStamp(TimeConvertor.convert(item.date))
      return
    }
    const self = this
    const now = new Date()
    let stamp
    self.items.forEach(function (item) {
      stamp = TimeConvertor.convert(item.date, now)
      item.updateStamp(stamp)
    })
  }
}

export default ConvertService
