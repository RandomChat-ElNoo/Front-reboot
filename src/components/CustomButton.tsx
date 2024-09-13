import { Button, ConfigProvider } from 'antd'

interface ButtonBigProps {
  type: 'meetNow' | 'exit'
  size: 'l' | 'sm'
  text: string
  onClick: () => void
}

/**
 * 당장만나,나가기 등등에 사용하는 버튼
 * @param type 배경색 회색 파란색
 * @param size l, sm 사이즈 프롭
 * @param text 버튼 텍스트
 * @param onClick 클릭시 이벤트 핸들러 함수
 */

export default function CustomButton({
  type,
  size,
  text,
  onClick,
}: ButtonBigProps) {
  const themeColor = type === 'meetNow' ? '#5865F2' : '#909090'
  const classNames =
    size === 'l'
      ? 'px-10pxr py-9pxr text-22pxr tb:px-9pxr tb:py-8pxr tb:text-18pxr'
      : 'px-9pxr py-8pxr text-18pxr'
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: { lineHeight: 1 },
        },
        token: {
          colorPrimary: themeColor,
        },
      }}
    >
      <Button
        type="primary"
        className={`${classNames} h-fit w-fit rounded-[10px] font-semibold leading-none`}
        onClick={onClick}
      >
        {text}
      </Button>
    </ConfigProvider>
  )
}
