class TimeConvertor {
  private static MINUTE = 60
  private static HOUR = 3600
  private static DAY = 3600 * 24
  constructor(parameters) {

  }

  static convert(date: Date, relative: Date = new Date()): string {
    if (date > relative) return 'wow it comes from future'

    const seconds = Math.floor((Number(relative) - Number(date)) / 1000)
    const minutes = Math.floor( seconds / TimeConvertor.MINUTE)
    const hours = Math.floor( seconds / TimeConvertor.HOUR)
    const days = Math.floor( seconds / TimeConvertor.DAY)

    if(days > 0)
      return days + ' days ago'
    if(hours>0)
      return hours + ' hours ago'
    if(minutes > 0)
      return minutes + ' minutes ago'
    return 'just now'

  }
}

export default TimeConvertor
