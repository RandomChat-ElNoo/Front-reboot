import { Dispatch, SetStateAction } from 'react'
import { Modal } from 'antd'
import CustomButton from '../CustomButton'

interface LinkWarningModalProps {
  open: boolean
  setter: Dispatch<SetStateAction<boolean>>
  link: string
}

export default function LinkWarningModal({
  open,
  setter,
  link,
}: LinkWarningModalProps) {
  const onOkFunc = () => {
    setter(false)
    window.open(link, '_blank')
  }
  const onCancelFunc = () => {
    setter(false)
  }
  return (
    <>
      <Modal
        title="이 링크를 열면 외부 웹사이트로 이동합니다"
        width={400}
        open={open}
        closable={false}
        onCancel={onCancelFunc}
        footer={
          <div className="mt-10pxr flex flex-row justify-end gap-10pxr">
            <CustomButton
              text="링크열기!"
              onClick={onOkFunc}
              type="meetNow"
              size="sm"
            />
            <CustomButton
              text="안 열래요"
              onClick={onCancelFunc}
              type="exit"
              size="sm"
            />
          </div>
        }
      ></Modal>
    </>
  )
}
