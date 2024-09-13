import EmojiButton from '../components/EmojiButton'
import SendButton from '../components/SendButton'
import React from 'react'

interface TextInputBoxProps {
  onEmojiButtonClick: () => void
  onSendButtonClick: () => void
  handleSendMessage: (event: React.KeyboardEvent) => void
}

/**
 * 채팅를 작성할 input과 이모지,채팅 보내기 버튼
 * @param onEmojiButtonClick - 이모지 버튼 누를 시 작동할 함수
 * @param onSendButtonClick - 메시지 보내기 버튼을 누를 시 작동할 함수
 * @param handleSendMessage - 엔터 누를 시 작동할 함수
 */
export default function TextInputBox({
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
  return (
    <div className="bg-text-box flex max-w-1160pxr items-center gap-10pxr rounded-[10px] px-10pxr py-5pxr">
      <input
        type="text"
        maxLength={300}
        placeholder="메시지 보내기"
        className="bg-text-box h-36pxr w-full rounded-[10px] focus:outline-none"
        onKeyDown={onEnterListener}
      />
      <EmojiButton onClick={onEmojiButtonClick} />
      <SendButton onClick={onSendButtonClick} />
    </div>
  )
}
