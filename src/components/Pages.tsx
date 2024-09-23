import { useEffect } from 'react'
import GroupChatPage from './chat/GroupChatPage'
import Home from './home/Home'
import useChatAlertStore from '../store/useChatAlertStore'
import useGlobalStateStore from '../store/useGlobalStateStore'
import RandomChatPage from './chat/RandomChatPage'

interface PagesProps {
  height: number
}

/**
 * 본문 부분에 랜더링 되는 부분
 * @param height 상위에서 내려주는 높이
 */

export default function Pages({ height }: PagesProps) {
  const { page } = useGlobalStateStore()
  const { setGroupChatAlert, setRandomChatAlert } = useChatAlertStore()
  const homePageShown = page === 0 ? '' : 'hidden'
  const groupChatPageShown = page === 1 ? '' : 'hidden'
  const randomChatPageShown = page === 2 ? '' : 'hidden'

  useEffect(() => {
    if (page === 1) {
      setGroupChatAlert(0)
    }
    if (page === 2) {
      setRandomChatAlert(0)
    }
  }, [page])

  return (
    <div style={{ height: `${height - 50}px` }} className="w-full">
      <div className={`${homePageShown} h-full w-full overflow-y-scroll`}>
        <Home />
      </div>
      <div className={`${groupChatPageShown} h-full w-full`}>
        <GroupChatPage />
      </div>
      <div className={`${randomChatPageShown} h-full w-full`}>
        <RandomChatPage />
      </div>
    </div>
  )
}
