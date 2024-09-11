import { SmileOutlined, SmileFilled } from '@ant-design/icons'

interface EmojiButtonProps {
  onClick: () => void
}

/**
 * 이모지 버튼
 * @param onClick - 버튼 클릭 시 실행될 콜백 함수
 */
export default function EmojiButton({ onClick }: EmojiButtonProps) {
  return (
    <button
      className="group relative h-35pxr w-35pxr shrink-0"
      onClick={onClick}
    >
      <SmileFilled
        style={{ fontSize: '35px' }}
        className="hidden text-button-gray group-hover:block"
      />
      <SmileOutlined
        style={{ fontSize: '35px' }}
        className="text-button-gray group-hover:hidden"
      />
    </button>
  )
}
