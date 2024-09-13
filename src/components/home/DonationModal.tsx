import { Modal, QRCode } from 'antd'
import CustomButton from '../CustomButton'

interface DonationModalProps {
  isOpen: boolean
  closeModal: () => void
}

/**
 * 후원하기 모달
 * @param isOpen - 모달창 열고 닫는 boolean 값
 * @param setIsOpen - 모달창을 열고 닫을 때 사용할 setter
 */

export default function ContactModal({
  isOpen,
  closeModal,
}: DonationModalProps) {
  return (
    <Modal
      closeIcon={null}
      open={isOpen}
      onCancel={closeModal}
      width={240}
      title={
        <div className="flex flex-row justify-center">
          <p className="text-25pxr">후원하기!</p>
        </div>
      }
      footer={
        <div className="flex flex-row justify-center">
          <CustomButton type="exit" size="l" text="닫기" onClick={closeModal} />
        </div>
      }
    >
      <div className="mb-20pxr flex flex-col items-center justify-center gap-20pxr">
        <QRCode
          value={'https://qr.kakaopay.com/FIurALQgs'}
          className="border-none"
          size={200}
          icon="/imgs/favicon.ico"
        />
        <CustomButton
          size="l"
          type="meetNow"
          text="모바일용"
          onClick={() => {
            open('https://qr.kakaopay.com/FIurALQgs')
          }}
        />
      </div>
    </Modal>
  )
}
