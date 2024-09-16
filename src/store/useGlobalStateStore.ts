import { create } from 'zustand'

interface GlobalStateStore {
  page: number
  setPage: (value: number) => void
  isSideBarOpen: boolean
  setIsSideBarOpen: (value: boolean) => void
  isRandomChatConnected: boolean
  setIsRandomChatConnected: (value: boolean) => void
  isGroupChatConnected: boolean
  setIsGroupChatConnected: (value: boolean) => void
}
const useGlobalStateStore = create<GlobalStateStore>((set) => ({
  page: 0,
  setPage: (value) => set({ page: value }),
  isSideBarOpen: false,
  setIsSideBarOpen: (value) => set({ isSideBarOpen: value }),
  isRandomChatConnected: false,
  setIsRandomChatConnected: (value) => set({ isRandomChatConnected: value }),
  isGroupChatConnected: false,
  setIsGroupChatConnected: (value) => set({ isGroupChatConnected: value }),
}))

export default useGlobalStateStore
