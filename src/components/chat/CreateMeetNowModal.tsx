import { Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CustomButton from '../CustomButton'
import { groupChatWorker, randomChatWorker } from '../../pages/Main'
import usePageStore from '../../store/usePageStore'

interface CreateMeetNowModalProps {
  isOpen: boolean
  closeModal: () => void
  isOpenSetter: Dispatch<SetStateAction<boolean>>
}

/**
 * 상단바에 당장만나를 눌렀을 시 나오는 당장만나 만들기 모달
 * @param isOpen 모달창 열고 닫는 boolean 값
 * @param closeModal 모달창을 닫는 함수
 * @param isOpenSetter isOpen의 setter 함수
 */

export default function CreateMeetNowModal({
  isOpen,
  closeModal,
  isOpenSetter,
}: CreateMeetNowModalProps) {
  const [askOkButton, setAskOkButton] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { page } = usePageStore()

  const handleInputOnchange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleClose = () => {
    setInputValue('')
    setAskOkButton(true)
    closeModal()
  }

  const onClickCreateButton = () => {
    if (page === 1) {
      groupChatWorker.postMessage(['createWorld', inputValue])
    } else if (page === 2) {
      randomChatWorker.postMessage(['createWorld', inputValue])
    }
    closeModal()
    setIsOpenConfirmModal(false)
    setInputValue('')
  }

  useEffect(() => {
    if (isOpen && inputValue.trim().length !== 0) {
      setAskOkButton(true)
    } else {
      setAskOkButton(false)
    }
  }, [inputValue, isOpen])

  return (
    <>
      <Modal
        title={<p className="text-25pxr">당장만나!</p>} // 여기해야함
        open={isOpen}
        onCancel={handleClose}
        closeIcon={null}
        footer={
          <div className="flex flex-row justify-end gap-10pxr">
            <CustomButton
              type="meetNow"
              size="sm"
              text="당장만나!"
              onClick={() => {
                setIsOpenConfirmModal(true)
                closeModal()
              }}
              disabled={!askOkButton}
            />
            <CustomButton
              type="exit"
              size="sm"
              text="안만나기"
              onClick={handleClose}
            />
          </div>
        }
      >
        <p className="mb-10pxr text-16pxr leading-[140%]">
          내용을 입력한 후 생성 버튼을 클릭하면 월드가 생성되어요!
        </p>
        <TextArea
          name="description"
          placeholder="최대 70자까지 적어주세요"
          className="mb-15pxr text-16pxr text-black"
          maxLength={70}
          value={inputValue}
          onChange={handleInputOnchange}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Modal>
      <Modal
        open={isOpenConfirmModal}
        onCancel={() => {
          setIsOpenConfirmModal(false)
        }}
        closeIcon={null}
        footer={
          <div className="flex flex-row justify-end gap-10pxr">
            <CustomButton
              type="meetNow"
              size="sm"
              text="월드생성"
              onClick={() => {
                onClickCreateButton()
                closeModal()
              }}
            />
            <CustomButton
              type="exit"
              size="sm"
              text="취소"
              onClick={() => {
                setIsOpenConfirmModal(false)
                isOpenSetter(true)
              }}
            />
          </div>
        }
      >
        <p className="text-18pxr leading-[140%]">
          "{inputValue}" 로 생성하시겠습니까?
        </p>
      </Modal>
    </>
  )
}
