import { useEffect } from 'react'
import SideBar from '../components/sideBar/SideBar'
import TopBar from '../components/TopBar'
import Pages from '../components/Pages'
import useGlobalStateStore from '../store/useGlobalStateStore'
import usePageStore from '../store/usePageStore'

export const randomChatWorker = new Worker(
  new URL('../workers/randomChatWorker.js', import.meta.url),
)
export const groupChatWorker = new Worker(
  new URL('../workers/groupChatWorker.js', import.meta.url),
)

/** 메인페이지 컴포넌트
 * @todo 채팅에 타이머 1초걸기
 * @todo 채팅방 연결하기 디자인넣기
 * @todo 채팅링크 판별 + 이미지 미리보기
 * @todo 이모지 디자인
 */

export default function Main() {
  const { isSideBarOpen, setIsSideBarOpen } = useGlobalStateStore()
  const { page } = usePageStore()

  const openSideBar = () => {
    setIsSideBarOpen(true)
  }

  const closeSideBar = () => {
    setIsSideBarOpen(false)
  }

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
