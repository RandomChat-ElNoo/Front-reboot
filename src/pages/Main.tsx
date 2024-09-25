import { useEffect, useRef, useState } from 'react'
import SideBar from '../components/sideBar/SideBar'
import TopBar from '../components/TopBar'
import Pages from '../components/Pages'
import useGlobalStateStore from '../store/useGlobalStateStore'
import useOptionStore from '../store/useOptionStore'
import UpdateLogModal from '../components/UpdateLogModal'
import { notification } from 'antd'

export const randomChatWorker = new Worker(
  new URL('../workers/randomChatWorker.js', import.meta.url),
)

export const groupChatWorker = new Worker(
  new URL('../workers/groupChatWorker.js', import.meta.url),
)

/** 메인페이지 컴포넌트 */

export default function Main() {
  const { page, isSideBarOpen, setIsSideBarOpen } = useGlobalStateStore()
  const { seeUpdateLogModal, setSeeUpdateLogModal } = useOptionStore()
  const [updateLogModalOpen, setUpdateLogModalOpenOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const preventRefreshTriggered = useRef(false)

  const openNotification = (msg: string) => {
    api['info']({
      message: `${msg}`,
      className: 'bg-[#343439] rounded-[5px]',
      closeIcon: null,
      duration: 20,
      placement: 'top',
      pauseOnHover: true,
      showProgress: true,
    })
  }

  const notificate = (msg: string) => {
    const notification = new Notification('VTalk 공지사항', {
      body: `${msg}`,
      icon: '/imgs/favicon.ico',
    })

    setTimeout(notification.close.bind(notification), 4000)

    notification.addEventListener(
      'click',
      () => {
        window.focus()
      },
      { once: true },
    )
  }

  const openSideBar = () => {
    setIsSideBarOpen(true)
  }

  const closeSideBar = () => {
    setIsSideBarOpen(false)
  }

  const closeModal = (seeNoMore: boolean = false) => {
    if (!seeNoMore) {
      setUpdateLogModalOpenOpen(false)
      return
    }
    setSeeUpdateLogModal(false)
    setUpdateLogModalOpenOpen(false)
  }

  useEffect(() => {
    const handleWorkerMessage = (e: MessageEvent) => {
      let data
      if (typeof e.data === 'string') {
        data = JSON.parse(e.data)
      } else {
        data = e.data
      }

      if (data[0] === 'broadcast') {
        notificate(data[1])
        openNotification(data[1])
      }
    }

    const closeConnections = () => {
      groupChatWorker.postMessage(['close'])
      randomChatWorker.postMessage(['close'])
    }

    const handlePageHide = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // 페이지가 백그라운드 캐시로 이동하는 경우
        closeConnections()
      } else {
        // 페이지가 완전히 언로드되는 경우
        closeConnections()
      }
    }

    // 새로고침 시 경고 메시지를 보여주는 함수
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      preventRefreshTriggered.current = true
      e.preventDefault()
      e.returnValue = ''
    }

    const handleUnload = () => {
      if (preventRefreshTriggered.current) {
        closeConnections()
      }
    }

    if ('sync' in navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((registration) => {
        ;(registration as any).sync.register('close-connections')
      })
    }

    // 이벤트 리스너 등록
    groupChatWorker.addEventListener('message', handleWorkerMessage)
    window.addEventListener('pagehide', handlePageHide)
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('unload', handleUnload)

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      groupChatWorker.removeEventListener('message', handleWorkerMessage)
      window.removeEventListener('pagehide', handlePageHide)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('unload', handleUnload)
    }
  }, [])

  useEffect(() => {
    if (seeUpdateLogModal) {
      setUpdateLogModalOpenOpen(true)
    }
  }, [])

  useEffect(() => {
    setIsSideBarOpen(false)
  }, [page])

  return (
    <div className="relative h-fit min-h-screen w-screen bg-background-main leading-none transition-all duration-300 ease-in-out">
      {contextHolder}
      <div
        data-open={isSideBarOpen}
        className="fixed z-[100] translate-x-0pxr transition-transform duration-300 ease-in-out tb:data-[open=false]:-translate-x-260pxr tb:data-[open=true]:translate-x-0pxr"
      >
        <SideBar />
      </div>
      {/* 사이드바 배경 검은 부분 */}
      {isSideBarOpen && (
        <button
          onClick={closeSideBar}
          className="fixed left-0pxr top-0pxr z-[90] hidden h-screen w-screen bg-black opacity-70 tb:block"
        />
      )}
      <div className="ml-260pxr flex h-full w-[calc(100%-260px)] flex-col tb:ml-0pxr tb:w-full">
        <TopBar onClickSideBarButton={openSideBar} />
        <section className="h-full w-full">
          <Pages />
        </section>
      </div>
      <UpdateLogModal open={updateLogModalOpen} closeModal={closeModal} />
    </div>
  )
}
