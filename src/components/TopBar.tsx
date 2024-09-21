import { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import useChatStore from '../store/useChatStore'
import useGlobalStateStore from '../store/useGlobalStateStore'
import { groupChatWorker, randomChatWorker } from '../pages/Main'
import CreateMeetNowModal from './chat/CreateMeetNowModal'
import useCanGroupChatMeetNowStore from '../store/useCanGroupChatMeetNowStore'
import useChatAlertStore from '../store/useChatAlertStore'
import { Tooltip } from 'antd'

interface TopBarProps {
  onClickSideBarButton: () => void
}

/** 상단 바
 * @param onClickSideBarButton 사이드 바를 닫아주는 함수
 * @todo canCreateMeetNow 랜덤챗 만들때 수정해야함
 */

export default function TopBar({ onClickSideBarButton }: TopBarProps) {
  const {
    groupChatUserCount,
    setGroupChatUserCount,
    opponentAvatar,
    canCreateRandomChatMeetNow,
    RandomChatMeetNowExpireTime,
  } = useChatStore()
  const { isRandomChatConnected, isGroupChatConnected, page, setPage } =
    useGlobalStateStore()
  const { randomChatAlert } = useChatAlertStore()
  const { canCreateGroupMeetNow, expiredTime } = useCanGroupChatMeetNowStore()
  const [title, setTitle] = useState('홈')
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
  const [meetNowTooltip, setMeetNowTooltip] = useState('')

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

  // 연결되어있어야 버튼이 활성화 되는 조건문
  const isConnected =
    (page === 1 && isGroupChatConnected) ||
    (page === 2 && isRandomChatConnected)

  // 당장만나 버튼의 비활성화 조건문
  const canCreateMeetNow =
    page === 1
      ? canCreateGroupMeetNow
      : page === 2 && canCreateRandomChatMeetNow

  const closeModal = () => {
    setIsOpenCreateModal(false)
  }

  // 당장만나 버튼 클릭시
  const handleClickMeetNow = () => {
    setIsOpenCreateModal(true)
  }

  const handleClickExit = () => {
    // 나가기 버튼 클릭시
    if (page === 1) {
      groupChatWorker.postMessage(['exit'])
      setGroupChatUserCount(0)
    } else if (page === 2) {
      randomChatWorker.postMessage(['exit'])
    }

    setPage(0)
  }

  useEffect(() => {
    const cooltime = (time: string) => {
      return Math.floor(
        (new Date(time).getTime() - new Date().getTime()) / 1000 / 60,
      )
    }

    const createMeetNowTooltipText =
      !canCreateMeetNow && page === 1
        ? `${cooltime(expiredTime)}분 후에 가능해요`
        : !canCreateMeetNow && page === 2
          ? `${cooltime(RandomChatMeetNowExpireTime)}분 후에 가능해요`
          : ''

    setMeetNowTooltip(createMeetNowTooltipText)
  }, [page, expiredTime, canCreateMeetNow, RandomChatMeetNowExpireTime])

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
          <Tooltip title={meetNowTooltip} placement="bottom">
            <div>
              <CustomButton
                type="meetNow"
                size="l"
                text="당장만나"
                onClick={handleClickMeetNow}
                disabled={isConnected ? !canCreateMeetNow : true}
              />
            </div>
          </Tooltip>
          <CreateMeetNowModal
            isOpen={isOpenCreateModal}
            closeModal={closeModal}
            isOpenSetter={setIsOpenCreateModal}
          />
          <CustomButton
            type="exit"
            size="l"
            text="나가기"
            onClick={handleClickExit}
            disabled={false}
          />
        </div>
      )}
      <div className="absolute left-0pxr top-0pxr flex h-50pxr flex-row items-center gap-15pxr pl-5pxr">
        <button
          onClick={onClickSideBarButton}
          className="pointer-events-none relative flex h-40pxr w-40pxr items-center justify-center tb:pointer-events-auto"
        >
          <div className="w-35xr hidden h-35pxr flex-col justify-around tb:flex">
            <div className="h-5pxr w-35pxr rounded-full bg-white" />
            <div className="h-5pxr w-35pxr rounded-full bg-white" />
            <div className="h-5pxr w-35pxr rounded-full bg-white" />
          </div>
          {randomChatAlert > 0 && (
            <div className="absolute -right-5pxr top-0pxr hidden h-18pxr w-18pxr items-center justify-center rounded-full bg-alert-red text-14pxr tb:flex">
              {randomChatAlert > 10 ? '10⁺' : randomChatAlert}
            </div>
          )}
        </button>
        <div className="flex flex-row items-center gap-15pxr tb:gap-5pxr mb:flex-col mb:items-start">
          <h1 className="text-30pxr tb:text-25pxr mb:text-23pxr">{title}</h1>
          <div
            className={`${isChatting} flex flex-row items-center gap-5pxr text-20pxr tb:text-15pxr`}
          >
            <div
              className={`${indicatorColor[page].color} h-12pxr w-12pxr rounded-full`}
            />
            {page === 1 && groupChatUserCount !== 0 ? (
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
