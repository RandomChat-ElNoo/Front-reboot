import { ReactNode } from 'react'
import useChatAlertStore from '../../store/useChatAlertStore'

interface SideBarMenuButtonProps {
  title: string
  icon: ReactNode
  actived: boolean
  onClick: () => void
}

/**
 * 홈,랜덤채팅 같은 메뉴버튼
 * @param title 제목
 * @param icon ReactNode로 아이콘 넣어주기
 * @param actived 활성화 되어 있는지
 */

export default function SideBarMenuButton({
  title,
  icon,
  actived,
  onClick,
}: SideBarMenuButtonProps) {
  const { randomChatAlert, groupChatAlert } = useChatAlertStore()
  const background = actived ? 'bg-button-sidebar-hover' : 'bg-transparent'

  const buttonAlert = [
    { title: '전체 채팅', alertType: groupChatAlert },
    { title: '랜덤 채팅', alertType: randomChatAlert },
  ]

  return (
    <button
      onClick={onClick}
      className={`${background} relative flex h-50pxr w-250pxr shrink-0 flex-row items-center gap-10pxr rounded-[10px] px-10pxr hover:bg-button-sidebar-hover`}
    >
      <div className="h-28pxr w-28pxr">{icon}</div>
      <p className="text-18pxr">{title}</p>
      <div className="absolute -top-7pxr right-0pxr">
        {buttonAlert.map((item) => (
          <div key={item.title}>
            {title === item.title && item.alertType > 0 && (
              <div className="flex h-28pxr w-28pxr items-center justify-center rounded-full bg-alert-red">
                {item.alertType > 10 ? '10⁺' : item.alertType}
              </div>
            )}
          </div>
        ))}
      </div>
    </button>
  )
}
