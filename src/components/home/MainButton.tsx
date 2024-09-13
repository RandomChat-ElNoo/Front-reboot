interface MainButtonProps {
  title: string
  context: string
  buttonType: 'wide' | 'high'
  onClick: () => void
}

/**
 * main 화면에서 보여질 버튼
 * @component
 * @param title - 버튼의 큰 글씨
 * @param context - 버튼의 작은 글씨
 * @param buttonType - 버튼 넓이
 * @param onClick - 클릭시 이벤트 핸들러 함수
 */

export default function MainButton({
  title,
  context,
  buttonType,
  onClick,
}: MainButtonProps) {
  const classNames =
    'bg-button-main hover:bg-button-main-hover flex w-full max-h-full gap-10pxr flex-row rounded-[10px] p-15pxr'
  const flexDirection = buttonType === 'high' ? 'flex-col' : 'flex-row'
  const buttonWidth = buttonType === 'wide' ? 'max-w-530pxr' : 'max-w-250pxr'
  const buttonHeight = buttonType === 'high' ? 'min-h-150pxr' : 'min-h-48pxr'
  const itemsCenter = buttonType === 'wide' ? 'items-center' : ''
  return (
    <button
      onClick={onClick}
      className={`${classNames} ${flexDirection} ${buttonWidth} ${buttonHeight} ${itemsCenter}`}
    >
      <div className="text-nowrap text-left text-28pxr">{title}</div>
      <div className="text-pretty text-left text-20pxr">{context}</div>
    </button>
  )
}
