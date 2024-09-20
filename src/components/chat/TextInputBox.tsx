import EmojiBox from './EmojiBox'
import EmojiButton from './EmojiButton'
import SendButton from './SendButton'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface TextInputBoxProps {
  inputValue: string
  disabled: boolean
  isConnected: boolean
  setInputValue: Dispatch<SetStateAction<string>>
  onEmojiClick: (emojiName: string) => void
  onSendButtonClick: () => void
  handleSendMessage: (event: React.KeyboardEvent) => void
}

/**
 * 채팅를 작성할 input과 이모지,채팅 보내기 버튼
 * @param disabled 버튼과 인풋의 비활성화 상태
 * @param inputValue 상위 State에서 내려줄 input값
 * @param isConnected 채팅에 연결 되어있는지
 * @param setInputValue 상위 State에서 내려줄 inputValueSetter 함수
 * @param onEmojiClick 이모지를 누를 시 작동할 함수
 * @param onSendButtonClick 메시지 보내기 버튼을 누를 시 작동할 함수
 * @param handleSendMessage 엔터 누를 시 작동할 함수
 */

export default function TextInputBox({
  inputValue,
  disabled,
  isConnected,
  setInputValue,
  onEmojiClick,
  onSendButtonClick,
  handleSendMessage,
}: TextInputBoxProps) {
  const [isOpenEmoji, setIsOpenEmoji] = useState(false)

  const toggleEmojiTransitionClass = isOpenEmoji ? '-translate-y-[270px]' : ''

  const onEnterListener = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // 기본 동작 방지 (새 줄 추가 방지)
      event.preventDefault()
      handleSendMessage(event) // 메시지 보내는 로직 실행
    }
  }

  const handleOnChangeInput = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleEmojiButton = () => {
    setIsOpenEmoji((prev) => !prev)
  }

  useEffect(() => {
    if (!isConnected) {
      setIsOpenEmoji(false)
    }
  }, [isConnected])

  return (
    <div className="relative z-20 mx-auto mb-auto bg-background-main px-10pxr pt-10pxr">
      <div className="relative flex h-46pxr w-full max-w-1200pxr items-center gap-10pxr rounded-[10px] bg-text-box px-20pxr py-5pxr">
        <textarea
          rows={1}
          maxLength={300}
          value={inputValue}
          onChange={handleOnChangeInput}
          placeholder="메시지 보내기"
          className="h-23pxr w-full resize-none overflow-hidden bg-text-box pr-90pxr text-16pxr leading-[140%] focus:outline-none"
          onKeyDown={onEnterListener}
          disabled={disabled}
        />
        <div className="absolute right-10pxr flex items-center gap-10pxr">
          <EmojiButton
            onClick={handleEmojiButton}
            disabled={disabled}
            active={isOpenEmoji}
          />
          <SendButton onClick={onSendButtonClick} disabled={disabled} />
        </div>
        <div
          className={`${toggleEmojiTransitionClass} absolute right-10pxr top-0pxr -z-10 pl-10pxr transition-transform duration-300 ease-in-out`}
        >
          <EmojiBox
            onClickEmoji={(emojiName) => {
              onEmojiClick(emojiName)
              setIsOpenEmoji(false)
            }}
            closeEmoji={() => {
              setIsOpenEmoji(false)
            }}
          />
        </div>
      </div>
      <div className="h-20pxr w-full bg-background-main" />
    </div>
  )
}
