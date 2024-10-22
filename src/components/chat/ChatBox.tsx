import formatTime from '../../utills/formatTime'
import CustomButton from '../CustomButton'
import { Divider } from 'antd'
import { randomChatWorker } from '../../pages/Main'
import useChatStore from '../../store/useChatStore'
import { EMOJI_ARRAY } from '../../constant/emoji'
import ReplaceToAtag from './ReplaceToAtag'
import { useState } from 'react'
import RandomChatLastAD from '../Ads/RandomChatLastAD'

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
  const { setOpponentAvatar } = useChatStore()
  const [isShow, setIsShow] = useState(true)
  const color = isMine ? 'bg-chat-box-me' : 'bg-chat-box'
  const timeDirection = isMine ? 'flex-row-reverse' : ''
  const classNames = `${color} break-words text-wrap max-w-500pxr rounded-[15px]`

  const emojiNames = EMOJI_ARRAY.map((emoji) => emoji.name).join('|')
  const regex = new RegExp(`::(${emojiNames})::`)
  const isEmoji = regex.test(context)

  const formattedTime = formatTime(writingTime)

  const onClickRematching = () => {
    randomChatWorker.postMessage(['join'])
    setOpponentAvatar('')
  }

  return (
    <pre
      className={`${timeDirection} group flex w-full items-end gap-5pxr break-all`}
    >
      {isShow ? (
        type === 'connect' ? (
          <div className="flex w-full flex-col items-center gap-10pxr">
            <Divider
              className="border-white px-20pxr"
              style={{ borderColor: 'white', margin: '0px' }}
            >
              {context}
            </Divider>
            {context === '상대방이 퇴장하였습니다' && (
              <>
                <button
                  onClick={onClickRematching}
                  className="h-30pxr w-80pxr rounded-full bg-chat-box shadow-top-shadow"
                >
                  재매칭
                </button>
                <RandomChatLastAD />
              </>
            )}
          </div>
        ) : type === 'chat' ? (
          <>
            {isEmoji ? (
              <div
                className={`${color} aspect-square max-w-150pxr rounded-[15px] p-15pxr`}
              >
                <img
                  className="object-contain"
                  alt={`emoji-${context.replace(/::/g, '')}.webp`}
                  src={`/imgs/emojis/${context.replace(/::/g, '')}.webp`}
                  onLoad={() => {
                    window.scrollTo(0, document.body.scrollHeight)
                  }}
                />
              </div>
            ) : (
              <ReplaceToAtag
                className="text-16pxr leading-[140%]"
                text={context.trim()}
                isMine={isMine}
              />
            )}
            <div className="text-13pxr">{formattedTime}</div>
            <div className="h-22pxr w-25pxr shrink-0 text-14pxr">
              {!isMine && (
                <p
                  className="hidden cursor-pointer text-slate-400 group-hover:block"
                  onClick={() => {
                    setIsShow(false)
                  }}
                >
                  숨기기
                </p>
              )}
            </div>
          </>
        ) : (
          <div className={`${timeDirection} flex flex-row items-end gap-5pxr`}>
            <div
              className={`${classNames} flex w-340pxr flex-col justify-start gap-10pxr p-15pxr`}
            >
              <p className="text-24pxr">당장만나!</p>
              <p className="text-16pxr leading-[140%]">{context.trim()}</p>
              <div className="flex w-full justify-end">
                <CustomButton
                  onClick={() => window.open(url, '_blank')}
                  type="meetNow"
                  size="l"
                  text="당장만나!"
                />
              </div>
            </div>
            <div className="text-13pxr">{formattedTime}</div>
          </div>
        )
      ) : (
        <>
          <p
            className="block cursor-pointer text-slate-400"
            onClick={() => {
              setIsShow(true)
            }}
          >
            펼치기
          </p>
          <div className="text-13pxr">{formattedTime}</div>
        </>
      )}
    </pre>
  )
}
