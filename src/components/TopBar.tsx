import { useEffect, useState } from 'react'
import usePageStore from '../store/usePageStore'
import CustomButton from './CustomButton'
import useChatStore from '../store/useChatStore'
import useGlobalStateStore from '../store/useGlobalStateStore'

interface TopBarProps {
  onClickSideBarButton: () => void
}

/** 상단 바
 * @param onClickSideBarButton 사이드 바를 닫아주는 함수
 * @todo indicatorColor 나중에 연결 상태값 넣어주기
 */

export default function TopBar({ onClickSideBarButton }: TopBarProps) {
  const { groupChatUserCount, opponentAvatar } = useChatStore()
  const { isRandomChatConnected, isGroupChatConnected } = useGlobalStateStore()
  const { page, setPage } = usePageStore()
  const [title, setTitle] = useState('홈')

  const indicatorColor = [
    { page: 0, color: '' },
    {
      page: 1,
      color: isGroupChatConnected ? 'bg-button-green' : 'bg-alert-red',
    },
    {
      page: 2,
      color: isRandomChatConnected ? 'bg-button-green' : 'bg-alert-red',
    },
  ]

  const isChatting = page === 0 ? 'hidden' : ''

  const clickMeetNow = () => {}
  const clickExit = () => {
    setPage(0)
  }

  useEffect(() => {
    switch (page) {
      case 0:
        setTitle('홈')
        break
      case 1:
        setTitle('전체 채팅')
        break
      case 2:
        setTitle('랜덤 채팅')
        break
    }
  }, [page])

  return (
    <div className="relative flex h-50pxr w-full shrink-0 flex-col items-center bg-background-main shadow-top-shadow">
      {page !== 0 && (
        <div className="flex h-full w-full max-w-1200pxr flex-row items-center justify-end gap-20pxr px-20pxr tb:gap-10pxr mb:px-10pxr">
          <CustomButton
            type="meetNow"
            size="l"
            text="당장만나"
            onClick={clickMeetNow}
          />
          <CustomButton
            type="exit"
            size="l"
            text="나가기"
            onClick={clickExit}
          />
        </div>
      )}
      <div className="absolute left-0pxr top-0pxr flex h-50pxr flex-row items-center gap-15pxr pl-5pxr">
        <button
          onClick={onClickSideBarButton}
          className="pointer-events-none flex h-40pxr w-40pxr items-center justify-center tb:pointer-events-auto"
        >
          <div className="w-35xr hidden h-35pxr flex-col justify-around tb:flex">
            <div className="h-5pxr w-35pxr rounded-full bg-white" />
            <div className="h-5pxr w-35pxr rounded-full bg-white" />
            <div className="h-5pxr w-35pxr rounded-full bg-white" />
          </div>
        </button>
        <div className="flex flex-row items-center gap-15pxr tb:gap-5pxr mb:flex-col mb:items-start">
          <h1 className="text-30pxr tb:text-25pxr mb:text-23pxr">{title}</h1>
          <div
            className={`${isChatting} flex flex-row items-center gap-5pxr text-20pxr tb:text-15pxr`}
          >
            <div
              className={`${indicatorColor[page].color} h-12pxr w-12pxr rounded-full`}
            />
            {page === 1 ? (
              <p>{groupChatUserCount}명 채팅중</p>
            ) : page === 2 ? (
              <p>{opponentAvatar}</p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
