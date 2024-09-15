import { useEffect } from 'react'
import usePageStore from '../store/usePageStore'
import GroupChatPage from './chat/GroupChatPage'
import Home from './home/Home'
import useChatAlertStore from '../store/useChatAlertStore'

/**
 * 본문 부분에 랜더링 되는 부분
 * @todo page 들 연결해주기
 */
export default function Pages() {
  const { page } = usePageStore()
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
    <div className="h-[calc(100vh-50px)] w-full">
      <div className={`${homePageShown} h-full w-full`}>
        <Home />
      </div>
      <div className={`${groupChatPageShown} h-full w-full`}>
        <GroupChatPage />
      </div>
      <div className={`${randomChatPageShown} h-full w-full`}></div>
    </div>
  )
}
