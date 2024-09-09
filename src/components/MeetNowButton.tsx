import { Button, ConfigProvider } from 'antd'

interface MeetNowButtonProps {
  onClick: () => void
}
/**
 * 당장만나 기능구현을 위한 버튼
 *
 * @component
 * @param onClick - 클릭시 이벤트 핸들러 함수
 *
 * @todo 기본 및 호버 시 프라이머리 컬러 지정 필요
 */
export default function MeetNowButton({ onClick }: MeetNowButtonProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {},
        },
      }}
    >
      <Button
        type="primary"
        className="h-fit w-fit rounded-[10px] px-10pxr py-9pxr text-22pxr"
        onClick={onClick}
      >
        당장 만나!
      </Button>
    </ConfigProvider>
  )
}
