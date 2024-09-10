import { Modal } from 'antd'

interface ContactModalProps {
  isOpen: boolean
  closeModal: () => void
}

/**
 * 문의하기 모달
 * @param isOpen - 모달창 열고 닫는 boolean 값
 * @param setIsOpen - 모달창을 열고 닫을 때 사용할 setter
 */
export default function ContactModal({
  isOpen,
  closeModal,
}: ContactModalProps) {
  return <Modal open={isOpen} onCancel={closeModal} />
}
