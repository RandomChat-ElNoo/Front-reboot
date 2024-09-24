import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface useOptionStoreProps {
  avatar: string
  setAvatar: (state: string) => void
  isRandomChatImgPreview: boolean
  setIsRandomChatImgPreview: (state: boolean) => void
  isGroupChatImgPreview: boolean
  setIsGroupChatImgPreview: (state: boolean) => void
  seeUpdateLogModal: boolean
  setSeeUpdateLogModal: (state: boolean) => void
}

const useOptionStore = create(
  persist<useOptionStoreProps>(
    (set) => ({
      avatar: '기타',
      setAvatar: (state) => {
        set({ avatar: state })
      },
      isRandomChatImgPreview: false,
      setIsRandomChatImgPreview: (state) => {
        set({ isRandomChatImgPreview: state })
      },
      isGroupChatImgPreview: false,
      setIsGroupChatImgPreview: (state) => {
        set({ isGroupChatImgPreview: state })
      },
      seeUpdateLogModal: true,
      setSeeUpdateLogModal: (state) => {
        set({ seeUpdateLogModal: state })
      },
    }),
    {
      name: 'options',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useOptionStore
