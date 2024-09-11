import create from 'zustand'

interface GlobalStateStore {
  isSideBarOpen: boolean
  setIsSideBarOpen: (value: boolean) => void
}
const useGlobalStateStore = create<GlobalStateStore>((set) => ({
  isSideBarOpen: false,
  setIsSideBarOpen: (value) => set({ isSideBarOpen: value }),
}))

export default useGlobalStateStore
