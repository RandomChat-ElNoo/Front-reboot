import { Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import CustomButton from '../CustomButton'

interface MeetNowModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  link: string
  context: string
}
/**
 * 사이드바 당장만나를 클릭시 열리는 모달창
 * @param isOpen 열려있는지 boolean
 * @param setIsOpen isOpen의 setter함수
 * @param link 클릭시 이동될 월드 링크
 * @param context 내용
 */

export default function MeetNowModal({
  isOpen,
  setIsOpen,
  link,
  context,
}: MeetNowModalProps) {
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <Modal
      open={isOpen}
      title={<p className="text-25pxr">당장만나!</p>}
      width={400}
      onClose={handleClose}
      onCancel={handleClose}
      closeIcon={false}
      footer={
        <div className="mt-10pxr flex flex-row justify-end gap-10pxr">
          <CustomButton
            text="안 만나기"
            onClick={handleClose}
            type="exit"
            size="sm"
          />
          <CustomButton
            text="당장만나!"
            onClick={() => {
              open(link)
            }}
            type="meetNow"
            size="sm"
          />
        </div>
      }
    >
      <p className="mt-10pxr text-16pxr leading-[140%]"> {context}</p>
    </Modal>
  )
}
