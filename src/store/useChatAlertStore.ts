import create from 'zustand'

interface BearStore {
  randomChatAlert: number
  setRandomChatAlert: (value: number) => void
  groupChatAlert: number
  setGroupChatAlert: (value: number) => void
}
const useChatAlertStore = create<BearStore>((set) => ({
  randomChatAlert: 0,
  setRandomChatAlert: (value: number) => set({ randomChatAlert: value }),
  groupChatAlert: 0,
  setGroupChatAlert: (value: number) => set({ randomChatAlert: value }),
}))

export default useChatAlertStore
