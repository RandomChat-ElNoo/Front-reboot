import { useEffect, useState } from 'react'
import formatTime from '../../utills/formatTime'
import isImageFile from '../../utills/isImageFile'
import CustomButton from '../CustomButton'
import ReplaceUrl from './ReplaceUrl'
import { Divider } from 'antd'

interface ChatBoxProps {
  context: string
  writingTime: string
  isMine: boolean
  type: 'chat' | 'meetNow' | 'connect'
  url?: string
}
/**
 * 채팅 내용을 보여주는 컨테이너 컴포넌트
 * @param context 버튼의 작은 글씨
 * @param writingTime 채팅친 시간
 * @param isMine 내꺼인지 boolean
 * @param type 채팅인지 당장만나인지
 * @param url 당장 만나의 주소 값
 */

export default function ChatBox({
  context,
  writingTime,
  isMine,
  type,
  url,
}: ChatBoxProps) {
  const [isImg, setIsImg] = useState(false)
  const color = isMine ? 'bg-chat-box-me' : 'bg-chat-box'
  const timeDirection = isMine ? 'flex-row-reverse' : ''
  const classNames = `${color} break-words text-wrap max-w-500pxr rounded-[15px]`

  const fomattedTime = formatTime(writingTime)

  useEffect(() => {
    const isImgUrl = async () => {
      const isImage = await isImageFile(context)
      setIsImg(type === 'chat' && isImage)
    }
    isImgUrl()
  }, [context])
  return (
    <pre className={`${timeDirection} flex w-full items-end gap-5pxr`}>
      {type === 'connect' ? (
        <Divider
          className="border-white px-20pxr"
          style={{ borderColor: 'white', margin: '0px' }}
        >
          {context}
        </Divider>
      ) : type === 'chat' ? (
        <>
          <ReplaceUrl
            className="text-16pxr leading-[140%]"
            text={context.trim()}
            isImage={isImg}
            isMine={isMine}
          />
          <div className="text-13pxr">{fomattedTime}</div>
        </>
      ) : (
        type === 'meetNow' && (
          <>
            <div
              className={`${classNames} flex w-340pxr flex-col justify-start gap-10pxr p-15pxr`}
            >
              <p className="text-24pxr">당장만나!</p>
              <p className="text-16pxr leading-[140%]">{context.trim()}</p>
              <div className="flex w-full justify-end">
                <CustomButton
                  onClick={() => open(url)}
                  type="meetNow"
                  size="l"
                  text="당장만나!"
                />
              </div>
            </div>
            <div className="text-13pxr">{fomattedTime}</div>
          </>
        )
      )}
    </pre>
  )
}
