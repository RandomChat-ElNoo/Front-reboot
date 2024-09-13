import { SendOutlined } from '@ant-design/icons'

interface SendButtonProps {
  onClick: () => void
}

/**
 * 채팅 보내기 버튼
 * @param onClick - 버튼을 눌렀을 때 이벤트 핸들러
 */
export default function SendButton({ onClick }: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-35pxr w-35pxr shrink-0 items-center rounded-[10px] bg-button-gray"
    >
      <SendOutlined style={{ fontSize: '20px' }} />
    </button>
  )
}
