interface Chat {
  isMine: boolean
  type: 'chat' | 'meetNow'
  context: string
  time: Date
  link?: string
}

interface MeetNow {
  isRandomChat: boolean
  message: string
  url: string
  time: Date
  endTime: Date
}
