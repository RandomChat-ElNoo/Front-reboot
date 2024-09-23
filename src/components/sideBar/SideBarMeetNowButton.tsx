import { useState } from 'react'
import formatTime from '../../utills/formatTime'
import MeetNowModal from './MeetNowModal'

interface SideBarMeetNowButtonProps {
  context: string
  time: string
  link: string
  isRandomChat: boolean
}

export default function SideBarMeetNowButton({
  context,
  time,
  link,
  isRandomChat = true,
}: SideBarMeetNowButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tipColor = isRandomChat ? 'bg-alert-red' : 'bg-button-blue'
  const indicator = isRandomChat ? '랜덤' : '전체'
  const slicedDescription =
    context.length > 45 ? context.slice(0, 45) + '...' : context

  const formattedTime = formatTime(time)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsModalOpen(true)
        }}
        className="relative h-100pxr w-full shrink-0 break-all rounded-[10px] bg-button-sidebar py-10pxr pl-20pxr pr-15pxr"
      >
        <div className="flex h-full flex-col gap-10pxr">
          <div className="felx-row flex items-center justify-between">
            <div className="flex flex-row items-end gap-6pxr">
              <h1 className="text-18pxr">당장만나!</h1>
              <p className="text-16pxr">{formattedTime}</p>
            </div>
            <p className="text-13pxr">{indicator}</p>
          </div>
          <p className="text-left text-14pxr">{slicedDescription}</p>
        </div>
        <div
          className={`${tipColor} absolute left-0pxr top-0pxr h-full w-10pxr rounded-bl-[10px] rounded-tl-[10px]`}
        />
      </button>
      <MeetNowModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        link={link}
        context={context}
      />
    </>
  )
}
