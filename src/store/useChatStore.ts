import { create } from 'zustand'

interface ChatStore {
  randomChat: Chat[]
  setRandomChat: (value: Chat[]) => void
  randomChatMeetNow: MeetNow[]
  setRandomChatMeetNow: (value: MeetNow[]) => void
  groupChat: Chat[]
  setGroupChat: (value: Chat[]) => void
  groupChatMeetNow: MeetNow[]
  setGroupChatMeetNow: (value: MeetNow[]) => void
  groupChatUserCount: number
  setGroupChatUserCount: (value: number) => void
  opponentAvatar: string
  setOpponentAvatar: (value: string) => void
}

const useChatStore = create<ChatStore>((set) => ({
  randomChat: [],
  setRandomChat: (value) => set({ randomChat: value }),
  randomChatMeetNow: [],
  setRandomChatMeetNow: (value) => set({ randomChatMeetNow: value }),

  groupChat: [],
  setGroupChat: (value) => set({ groupChat: value }),
  groupChatMeetNow: [],
  setGroupChatMeetNow: (value) => set({ groupChatMeetNow: value }),

  groupChatUserCount: 0,
  setGroupChatUserCount: (value) => set({ groupChatUserCount: value }),
  opponentAvatar: '기타',
  setOpponentAvatar: (value) => set({ opponentAvatar: value }),
}))

export default useChatStore
