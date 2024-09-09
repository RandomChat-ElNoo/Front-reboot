import MeetNowButton from './MeetNowButton'

interface ChatBoxProps {
  context: string
  writingTime: Date
  isMine: boolean
  type: 'chat' | 'meetNow'
  url?: string
}
/**
 * main 화면에서 보여일 버튼
 *
 * @component
 * @param title - 버튼의 큰 글씨
 * @param context - 버튼의 작은 글씨
 * @param onClick - 클릭시 이벤트 핸들러 함수
 *
 * @todo 시간 표시 해야됨
 */
export default function ChatBox({
  context,
  writingTime,
  isMine,
  type,
  url,
}: ChatBoxProps) {
  const color = isMine ? 'bg-chat-box-me' : 'bg-chat-box'
  const timeDirection = isMine ? 'flex-row-reverse' : ''
  const classNames = `${color} 'justify-start' flex flex-col gap-10pxr w-fit max-w-700pxr rounded-[15px] text-white`
  return (
    <div
      className={`${location} ${timeDirection} flex w-full items-end gap-5pxr`}
    >
      {type === 'chat' ? (
        <div className={`${classNames} px-15pxr py-7pxr text-16pxr`}>
          {context}
        </div>
      ) : (
        <div className={`${classNames} w-340pxr p-15pxr`}>
          <p className="text-24pxr">당장 만나</p>
          <p className="text-16pxr">{context}</p>
          <div className="flex w-full justify-end">
            <MeetNowButton onClick={() => open(url)} />
          </div>
        </div>
      )}
      <div className="text-13pxr text-white">{writingTime.toISOString()}</div>
    </div>
  )
}
