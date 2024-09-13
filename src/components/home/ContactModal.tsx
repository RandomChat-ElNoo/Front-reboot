import { Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import CustomButton from '../CustomButton'

interface ContactModalProps {
  isOpen: boolean
  closeModal: () => void
  openNotification: (isMailSendSuccess: boolean, error?: string) => void
}

/**
 * 문의하기 모달
 * @param isOpen - 모달창 열고 닫는 boolean 값
 * @param closeModal - 모달창을 닫는 함수
 */

export default function ContactModal({
  isOpen,
  closeModal,
  openNotification,
}: ContactModalProps) {
  const [inputValue, setInputValue] = useState('')
  const [askOkButton, setAskOkButton] = useState(false)
  const form = useRef<HTMLFormElement>(null)

  const handleSetInputValue = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleClose = () => {
    setInputValue('')
    setAskOkButton(true)
    closeModal()
  }

  const sendEmail = () => {
    handleClose()
    if (inputValue) {
      emailjs
        .sendForm('service_6xoddmk', 'template_h00hlf8', form.current || '', {
          publicKey: 'poTKJKaLXSv3zbRpI',
        })
        .then(
          () => {
            openNotification(true)
            handleClose()
          },
          (error) => {
            openNotification(false)
            console.log('실패', error)
            handleClose()
          },
        )
    }
  }

  useEffect(() => {
    if (isOpen && inputValue.trim().length !== 0) {
      setAskOkButton(true)
    } else {
      setAskOkButton(false)
    }
  }, [inputValue, open, askOkButton])

  return (
    <>
      <Modal
        title={<p className="text-25pxr">문의하기!</p>}
        open={isOpen}
        onCancel={handleClose}
        closeIcon={null}
        footer={
          <div className="flex flex-row justify-end gap-10pxr">
            <CustomButton
              type="meetNow"
              size="sm"
              text="보내기!"
              onClick={sendEmail}
              disabled={!askOkButton}
            />
            <CustomButton
              type="exit"
              size="sm"
              text="취소!"
              onClick={handleClose}
            />
          </div>
        }
      >
        <form ref={form}>
          <TextArea
            name="description"
            className="mb-15pxr text-16pxr text-black"
            maxLength={350}
            value={inputValue}
            onChange={handleSetInputValue}
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </form>
      </Modal>
    </>
  )
}
