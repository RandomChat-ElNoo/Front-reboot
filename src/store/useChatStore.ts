import { create } from 'zustand'
interface ChatStore {
  randomChat: Chat[]
  setRandomChat: (value: Chat[] | ((prev: Chat[]) => Chat[])) => void

  randomChatMeetNow: MeetNow[]
  setRandomChatMeetNow: (
    value: MeetNow[] | ((prev: MeetNow[]) => MeetNow[]),
  ) => void

  groupChat: Chat[]
  setGroupChat: (value: Chat[] | ((prev: Chat[]) => Chat[])) => void

  groupChatMeetNow: MeetNow[]
  setGroupChatMeetNow: (
    value: MeetNow[] | ((prev: MeetNow[]) => MeetNow[]),
  ) => void

  groupChatUserCount: number
  setGroupChatUserCount: (value: number) => void

  opponentAvatar: string
  setOpponentAvatar: (value: string) => void

  randomChatMatchingCount: number
  setRandomChatMatchingCount: (value: number) => void

  canCreateRandomChatMeetNow: boolean
  setCanCreateRandomChatMeetNow: (value: boolean) => void

  RandomChatMeetNowExpireTime: string
  setRandomChatMeetNowExpireTime: (value: string) => void
}

const useChatStore = create<ChatStore>((set) => ({
  randomChat: [],
  setRandomChat: (value) => {
    set((state) => ({
      randomChat: typeof value === 'function' ? value(state.randomChat) : value,
    }))
  },
  randomChatMeetNow: [],
  setRandomChatMeetNow: (value) => {
    set((state) => ({
      randomChatMeetNow:
        typeof value === 'function' ? value(state.randomChatMeetNow) : value,
    }))
  },
  groupChat: [],
  setGroupChat: (value) => {
    set((state) => ({
      groupChat: typeof value === 'function' ? value(state.groupChat) : value,
    }))
  },

  groupChatMeetNow: [],
  setGroupChatMeetNow: (value) => {
    set((state) => ({
      groupChatMeetNow:
        typeof value === 'function' ? value(state.groupChatMeetNow) : value,
    }))
  },
  groupChatUserCount: 0,
  setGroupChatUserCount: (value) => set({ groupChatUserCount: value }),

  opponentAvatar: '',
  setOpponentAvatar: (value) => set({ opponentAvatar: value }),

  randomChatMatchingCount: 0,
  setRandomChatMatchingCount: (value) =>
    set({ randomChatMatchingCount: value }),

  canCreateRandomChatMeetNow: true,
  setCanCreateRandomChatMeetNow: (value) =>
    set({ canCreateRandomChatMeetNow: value }),

  RandomChatMeetNowExpireTime: '',
  setRandomChatMeetNowExpireTime: (value) =>
    set({ RandomChatMeetNowExpireTime: value }),
}))

export default useChatStore
