import { create } from 'zustand'

interface ChatAlertStore {
  randomChatAlert: number
  setRandomChatAlert: (value: number | ((prev: number) => number)) => void
  groupChatAlert: number
  setGroupChatAlert: (value: number | ((prev: number) => number)) => void
}

const useChatAlertStore = create<ChatAlertStore>((set) => ({
  randomChatAlert: 0,
  setRandomChatAlert: (value) => {
    set((state) => ({
      randomChatAlert:
        typeof value === 'function' ? value(state.randomChatAlert) : value,
    }))
  },
  groupChatAlert: 0,
  setGroupChatAlert: (value) => {
    set((state) => ({
      groupChatAlert:
        typeof value === 'function' ? value(state.groupChatAlert) : value,
    }))
  },
}))

export default useChatAlertStore
