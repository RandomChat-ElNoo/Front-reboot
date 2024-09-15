import EmojiButton from './EmojiButton'
import SendButton from './SendButton'
import React, { Dispatch, SetStateAction } from 'react'

interface TextInputBoxProps {
  inputValue: string
  disabled: boolean
  setInputValue: Dispatch<SetStateAction<string>>
  onEmojiButtonClick: () => void
  onSendButtonClick: () => void
  handleSendMessage: (event: React.KeyboardEvent) => void
}

/**
 * 채팅를 작성할 input과 이모지,채팅 보내기 버튼
 * @param disabled 버튼과 인풋의 비활성화 상태
 * @param inputValue 상위 State에서 내려줄 input값
 * @param setInputValue 상위 State에서 내려줄 inputValueSetter 함수
 * @param onEmojiButtonClick 이모지 버튼 누를 시 작동할 함수
 * @param onSendButtonClick 메시지 보내기 버튼을 누를 시 작동할 함수
 * @param handleSendMessage 엔터 누를 시 작동할 함수
 */

export default function TextInputBox({
  inputValue,
  disabled,
  setInputValue,
  onEmojiButtonClick,
  onSendButtonClick,
  handleSendMessage,
}: TextInputBoxProps) {
  const onEnterListener = (event: React.KeyboardEvent) => {
    if (event.key && event.key !== 'Enter') {
      return
    }
    handleSendMessage(event)
  }
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="relative flex h-fit w-full max-w-1200pxr items-center gap-10pxr rounded-[10px] bg-text-box px-20pxr py-5pxr">
      <input
        type="text"
        maxLength={300}
        value={inputValue}
        onChange={handleOnChangeInput}
        placeholder="메시지 보내기"
        className="h-36pxr w-full rounded-[10px] bg-text-box pr-90pxr focus:outline-none"
        onKeyDown={onEnterListener}
        disabled={disabled}
      />
      <div className="absolute right-10pxr flex items-center gap-10pxr">
        <EmojiButton onClick={onEmojiButtonClick} disabled={disabled} />
        <SendButton onClick={onSendButtonClick} disabled={disabled} />
      </div>
    </div>
  )
}
