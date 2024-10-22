import { useState } from 'react'
import ContactModal from './ContactModal'
import DonationModal from './DonationModal'
import MainButton from './MainButton'
import { notification } from 'antd'
import useGlobalStateStore from '../../store/useGlobalStateStore'
import MainPageAD from '../Ads/MainPageAD'

/**
 * main 화면에서 보여일 버튼들
 */

export default function MainButtons() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const { setPage } = useGlobalStateStore()
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (
    isMailSendSuccess: boolean,
    error?: string,
  ) => {
    api[isMailSendSuccess ? 'success' : 'error']({
      message: isMailSendSuccess ? '문의 완료!' : '문의 실패....',
      description: isMailSendSuccess ? '' : error,
      className: 'bg-[#343439] rounded-[5px]',
      closeIcon: null,
      duration: 2,
    })
  }

  return (
    <>
      <div className="flex w-full max-w-530pxr flex-col items-center gap-30pxr tb:gap-15pxr">
        <img
          className="h-full max-h-350pxr w-full max-w-350pxr object-contain"
          src="/imgs/webp/logo-full.webp"
        />
        <div className="flex w-full flex-col items-center gap-20pxr">
          <div className="flex w-full flex-row justify-between gap-30pxr tb:gap-15pxr">
            <MainButton
              title="전체 채팅"
              context="익명으로 유저들과 대화해요"
              buttonType="high"
              onClick={() => {
                setPage(1)
              }}
            />
            <MainButton
              title="랜덤 채팅"
              context="랜덤 유저와 대화해요"
              buttonType="high"
              onClick={() => {
                setPage(2)
              }}
            />
          </div>
          <MainButton
            title="문의하기"
            context="메일로 추가 기능 건의 및 문의하기"
            buttonType="wide"
            onClick={() => setIsContactModalOpen(true)}
          />
          <MainButton
            title="후원하기"
            context="서버비를 지원해요"
            buttonType="wide"
            onClick={() => setIsDonationModalOpen(true)}
          />
          <MainPageAD />
          <ContactModal
            isOpen={isContactModalOpen}
            closeModal={() => setIsContactModalOpen(false)}
            openNotification={openNotificationWithIcon}
          />
          <DonationModal
            isOpen={isDonationModalOpen}
            closeModal={() => setIsDonationModalOpen(false)}
          />
          {contextHolder}
        </div>
      </div>
    </>
  )
}
