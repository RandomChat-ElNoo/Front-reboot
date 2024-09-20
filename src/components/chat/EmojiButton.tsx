import { SmileOutlined, SmileFilled } from '@ant-design/icons'

interface EmojiButtonProps {
  disabled: boolean
  onClick: () => void
  active: boolean
}

/**
 * 이모지 버튼
 * @param onClick 버튼 클릭 시 실행될 콜백 함수
 * @param disabled 버튼 비활성화 boolean
 * @param active 버튼 활성화 상태 boolean
 */

export default function EmojiButton({
  onClick,
  disabled,
  active,
}: EmojiButtonProps) {
  return (
    <button
      className="group relative h-35pxr w-35pxr shrink-0"
      onClick={onClick}
      disabled={disabled}
      data-active={active}
    >
      <SmileFilled
        style={{ fontSize: '35px' }}
        className="hidden text-button-gray group-hover:block group-data-[active=true]:block group-data-[active=false]:hidden"
      />
      <SmileOutlined
        style={{ fontSize: '35px' }}
        className="text-button-gray group-hover:hidden group-active:hidden group-data-[active=false]:block group-data-[active=true]:hidden"
      />
    </button>
  )
}
