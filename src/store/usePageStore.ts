import create from 'zustand'

interface PageStore {
  page: number
  setPage: (value: number) => void
}
const usePageStore = create<PageStore>((set) => ({
  page: 0,
  setPage: (value) => set({ page: value }),
}))

export default usePageStore
