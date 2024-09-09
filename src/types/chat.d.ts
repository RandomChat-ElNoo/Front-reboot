interface Chat {
  isMine: boolean
  type?: 'chat ' | 'meetNow'
  context: string
  time: Date
  link?: string
}

interface MeetNow {
  message: string
  url: string
  endTime: Date
}
