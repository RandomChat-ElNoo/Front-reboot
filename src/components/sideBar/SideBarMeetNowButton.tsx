import { useState } from 'react'
import formatTime from '../../utills/formatTime'
import MeetNowModal from './MeetNowModal'

interface SideBarMeetNowButtonProps {
  context: string
  time: Date
  link: string
}

export default function SideBarMeetNowButton({
  context,
  time,
  link,
}: SideBarMeetNowButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        className="relative h-100pxr w-230pxr rounded-[10px] bg-button-sidebar py-10pxr pl-20pxr pr-15pxr"
      >
        <div className="flex h-full flex-col gap-10pxr">
          <div className="flex flex-row items-end gap-6pxr">
            <h1 className="text-18pxr text-white">당장만나!</h1>
            <p className="text-13pxr text-white">{formattedTime}</p>
          </div>
          <p className="text-left text-14pxr text-white">{slicedDescription}</p>
        </div>
        <div className="absolute left-0pxr top-0pxr h-full w-10pxr rounded-bl-[10px] rounded-tl-[10px] bg-button-blue" />
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
