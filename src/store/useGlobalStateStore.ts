import { create } from 'zustand'

interface GlobalStateStore {
  isSideBarOpen: boolean
  setIsSideBarOpen: (value: boolean) => void
  isRandomChatConnected: boolean
  setIsRandomChatConnected: (value: boolean) => void
  isGroupChatConnected: boolean
  setIsGroupChatConnected: (value: boolean) => void
}
const useGlobalStateStore = create<GlobalStateStore>((set) => ({
  isSideBarOpen: false,
  setIsSideBarOpen: (value) => set({ isSideBarOpen: value }),
  isRandomChatConnected: false,
  setIsRandomChatConnected: (value) => set({ isRandomChatConnected: value }),
  isGroupChatConnected: false,
  setIsGroupChatConnected: (value) => set({ isGroupChatConnected: value }),
}))

export default useGlobalStateStore
