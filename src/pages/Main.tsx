import { useEffect } from 'react'
import SideBar from '../components/sideBar/SideBar'
import TopBar from '../components/TopBar'
import Pages from '../components/Pages'
import useGlobalStateStore from '../store/useGlobalStateStore'

export const randomChatWorker = new Worker(
  new URL('../workers/randomChatWorker.js', import.meta.url),
)

export const groupChatWorker = new Worker(
  new URL('../workers/groupChatWorker.js', import.meta.url),
)

/** 메인페이지 컴포넌트
 * @todo 이모지 디자인
 * @todo 툴팁넣기
 * @todo 에러처리( socket.onerror, 소켓에서 날라오는 에러 )
 */

export default function Main() {
  const { page, isSideBarOpen, setIsSideBarOpen } = useGlobalStateStore()

  const openSideBar = () => {
    setIsSideBarOpen(true)
  }

  const closeSideBar = () => {
    setIsSideBarOpen(false)
  }

  useEffect(() => {
    const closeSocket = () => {
      groupChatWorker.postMessage(['close'])
      randomChatWorker.postMessage(['close'])
    }

    window.addEventListener('beforeunload', closeSocket)
    return () => {
      window.removeEventListener('beforeunload', closeSocket)
    }
  }, [])

  useEffect(() => {
    setIsSideBarOpen(false)
  }, [page])

  return (
    <div className="relative h-fit min-h-screen w-screen bg-background-main leading-none">
      <div
        data-open={isSideBarOpen}
        className="fixed z-20 translate-x-0pxr transition-transform duration-300 ease-in-out tb:data-[open=false]:-translate-x-260pxr tb:data-[open=true]:translate-x-0pxr"
      >
        <SideBar />
      </div>
      {/* 사이드바 배경 검은 부분 */}
      {isSideBarOpen && (
        <button
          onClick={closeSideBar}
          className="fixed left-0pxr top-0pxr z-10 hidden h-screen w-screen bg-black opacity-70 tb:block"
        />
      )}
      <div className="ml-260pxr flex h-full w-[calc(100%-260px)] flex-col tb:ml-0pxr tb:w-full">
        <TopBar onClickSideBarButton={openSideBar} />
        <section className="h-full w-full">
          <Pages />
        </section>
      </div>
    </div>
  )
}
