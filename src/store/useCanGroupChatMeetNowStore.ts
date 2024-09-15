import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IUseCanGroupChatMeetNowStore {
  canCreateGroupMeetNow: boolean
  setCanCreateGroupMeetNow: (state: boolean) => void
  expiredTime: string
  setExpiredTime: (state: string) => void
}

const useCanGroupChatMeetNowStore = create(
  persist<IUseCanGroupChatMeetNowStore>(
    (set) => ({
      canCreateGroupMeetNow: true,
      setCanCreateGroupMeetNow: (state) => {
        set({ canCreateGroupMeetNow: state })
      },
      expiredTime: '',
      setExpiredTime: (state) => {
        set({ expiredTime: state })
      },
    }),
    {
      name: 'CanGroupChatMeetNow',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useCanGroupChatMeetNowStore
