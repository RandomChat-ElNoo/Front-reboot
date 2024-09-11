import { HomeFilled, MoreOutlined } from '@ant-design/icons'
import SideBarMenuButton from './SideBarMenuButton'
import usePageStore from '../../store/usePageStore'
import { Divider } from 'antd'
import useOptionStore from '../../store/useOptionStore'
import Options from './Options'
import { useState } from 'react'
import SideBarMeetNowButton from './SideBarMeetNowButton'
import useChatStore from '../../store/useChatStore'

const sideButtons = [
  { title: '홈', icon: <HomeFilled className="text-28pxr text-white" /> },
  {
    title: '전체 채팅',
    icon: (
      <img src="/imgs/svgs/group-chat.svg" className="text-28pxr text-white" />
    ),
  },
  {
    title: '랜덤 채팅',
    icon: (
      <img src="/imgs/svgs/random-chat.svg" className="text-28pxr text-white" />
    ),
  },
]

export default function SideBar() {
  const { randomChatMeetNow, groupChatMeetNow } = useChatStore()
  const { page, setPage } = usePageStore()
  const { avatar } = useOptionStore()
  const [isOptionOpen, setIsOptionOpen] = useState(false)
  const isMeetNow =
    randomChatMeetNow.length !== 0 || groupChatMeetNow.length !== 0

  const handleOption = () => {
    setIsOptionOpen((prev) => !prev)
  }

  const closeOption = () => {
    setIsOptionOpen(false)
  }
  const toggleOptionTransitionClass = isOptionOpen
    ? '-translate-y-[295px]'
    : '-translate-y-[60px]'
  return (
    <div className="z-0 h-screen w-260pxr shrink-0 select-none overflow-hidden bg-background-sidebar">
      <section className="flex h-50pxr w-full flex-row items-center justify-center bg-background-sidebar shadow-top-shadow">
        <img src="/imgs/svgs/logo-text.svg" className="h-40pxr" />
      </section>
      <section className="h-[calc(100%-110px)] w-full overflow-y-scroll pt-10pxr">
        <div className="flex flex-col items-center gap-10pxr">
          {sideButtons.map((item, index) => (
            <>
              <SideBarMenuButton
                title={item.title}
                icon={item.icon}
                actived={page === index}
                onClick={() => {
                  setPage(index)
                }}
              />
              {index === 0 && (
                <Divider
                  className="border-white px-10pxr"
                  style={{ borderColor: 'white', margin: '0px' }}
                >
                  채팅
                </Divider>
              )}
            </>
          ))}
          {isMeetNow && (
            <Divider
              className="border-white px-10pxr"
              style={{ borderColor: 'white', margin: '0px' }}
            >
              당장만나
            </Divider>
          )}
          <div className="flex w-full flex-col gap-10pxr px-10pxr">
            {randomChatMeetNow.map((item) => (
              <SideBarMeetNowButton
                key={item.time.toISOString()}
                context={item.message}
                time={item.time}
                link={item.url}
                isRandomChat={item.isRandomChat}
              />
            ))}
            {groupChatMeetNow.map((item) => (
              <SideBarMeetNowButton
                key={item.time.toISOString()}
                context={item.message}
                time={item.time}
                link={item.url}
                isRandomChat={item.isRandomChat}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative z-10">
        <div className="h-60pxr w-full bg-background-sidebar-bottom">
          <div className="z-20 flex h-full w-full flex-row items-center justify-between px-15pxr">
            <button
              onClick={() => {
                handleOption()
              }}
              className="flex flex-row items-center gap-10pxr"
            >
              <p className="text-18pxr">아바타</p>
              <p className="text-16pxr">{avatar}</p>
            </button>
            <button onClick={handleOption} className="">
              <MoreOutlined className="text-24pxr text-white" />
            </button>
          </div>
        </div>
        <div
          className={`${toggleOptionTransitionClass} absolute -z-10 transition-transform duration-300 ease-in-out`}
        >
          <Options closeOption={closeOption} />
        </div>
      </section>
    </div>
  )
}
