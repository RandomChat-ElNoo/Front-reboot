interface Chat {
  isMine: boolean
  type: 'chat' | 'meetNow'
  context: string
  time: string
  link?: string
}

interface MeetNow {
  isRandomChat: boolean
  message: string
  url: string
  time: string
  endTime?: Date
}
