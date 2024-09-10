import formatTime from '../utills/formatTime'
import CustomButton from './CustomButton'

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
  const classNames = `${color} text-wrap justify-start flex flex-col gap-10pxr max-w-600pxr rounded-[15px] text-white`

  const fomattedTime = formatTime(writingTime)

  return (
    <div className={`${timeDirection} flex w-full items-end gap-5pxr`}>
      {type === 'chat' ? (
        <div className={`${classNames} px-15pxr py-7pxr text-16pxr`}>
          {context}
        </div>
      ) : (
        <div className={`${classNames} w-340pxr p-15pxr`}>
          <p className="text-24pxr">당장 만나</p>
          <p className="text-16pxr">{context}</p>
          <div className="flex w-full justify-end">
            <CustomButton
              onClick={() => open(url)}
              type="meetNow"
              size="l"
              text="당장만나!"
            />
          </div>
        </div>
      )}
      <div className="text-13pxr text-white">{fomattedTime}</div>
    </div>
  )
}
