import { useState } from 'react'
import logoFull from '../../public/imgs/svgs/logo-full.svg'
import ContactModal from './ContactModal'
import DonationModal from './DonationModal'
import MainButton from './MainButton'

/**
 * main 화면에서 보여일 버튼들
 */
export default function MainButtons() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  return (
    <>
      <div className="flex w-full max-w-530pxr flex-col items-center gap-30pxr">
        <img className="h-350pxr w-350pxr" src={logoFull} />
        <div className="flex w-full max-w-530pxr flex-col items-center gap-20pxr">
          <div className="flex w-full flex-row gap-30pxr">
            <MainButton
              title="전체 채팅"
              context="익명으로 유저들과 대화해요"
              buttonType="high"
              onClick={() => {}}
            />
            <MainButton
              title="랜덤 채팅"
              context="랜덤 유저와 대화해요"
              buttonType="high"
              onClick={() => {}}
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
          <ContactModal
            isOpen={isContactModalOpen}
            closeModal={() => setIsContactModalOpen(false)}
          />
          <DonationModal
            isOpen={isDonationModalOpen}
            closeModal={() => setIsDonationModalOpen(false)}
          />
        </div>
      </div>
    </>
  )
}
