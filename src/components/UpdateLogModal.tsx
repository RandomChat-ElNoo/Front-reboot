import { Modal } from 'antd'
import { useState } from 'react'
import CustomButton from './CustomButton'

interface UpdateLogModalProps {
  open: boolean
  closeModal: (seeNoMore?: boolean) => void
}

export default function UpdateLogModal({
  open,
  closeModal,
}: UpdateLogModalProps) {
  const [seeNoMoreCheck, setSeeNoMoreCheck] = useState(false)

  const onClose = () => {
    closeModal(seeNoMoreCheck)
  }
  console.log('seeNoMoreCheck', seeNoMoreCheck)
  return (
    <>
      <Modal
        className=""
        closeIcon={null}
        width={600}
        open={open}
        onCancel={onClose}
        title={
          <p className="flex-none shrink-0 text-30pxr leading-[140%]">
            새로워진 VTalk!
          </p>
        }
        footer={
          <div className="flex shrink-0 flex-row justify-between">
            <section className="flex flex-row items-center gap-3pxr">
              <input
                className="h-15pxr w-15pxr"
                type="checkbox"
                onChange={() => {
                  setSeeNoMoreCheck((prev) => !prev)
                }}
              />
              <p className="text-15pxr"> 다시 보지 않기</p>
            </section>
            <CustomButton type="exit" size="sm" text="닫기" onClick={onClose} />
          </div>
        }
      >
        <div className="aspect-square w-full overflow-y-scroll">
          <div>
            <h1 className="mb-5pxr text-pretty text-25pxr leading-[140%]">
              새로운 기능!
            </h1>
            <p className="text-pretty pl-10pxr text-23pxr leading-[180%]">
              • 전체 채팅
            </p>
            <p className="text-pretty pl-28pxr text-18pxr leading-[140%]">
              접속한 사람들 모두와 대화할 수 있는 전체 채팅이 나왔습니다! <br />
              매칭 하는 동안 혹은 여러 명과 대화하고 싶을 때 전체 채팅을 이용해
              보세요.
            </p>
            <br />
            <p className="text-pretty pl-10pxr text-23pxr leading-[180%]">
              • 탭 기능
            </p>
            <p className="text-pretty pl-28pxr text-18pxr leading-[140%]">
              전체 채팅과 랜덤 채팅을 오고 가며 대화할 수 있어요! <br />
              다른 곳을 보고 있을 때 랜덤 채팅이 오면 알림도 온답니다.
            </p>
            <br />
            <p className="text-pretty pl-10pxr text-23pxr leading-[180%]">
              • 이전 사람은 안 만날래요
            </p>
            <p className="text-pretty pl-28pxr text-18pxr leading-[140%]">
              바로 이전 대화한 사람과 매칭되지 않아요.
            </p>
            <br />
            <p className="text-pretty pl-10pxr text-23pxr leading-[180%]">
              • 당장 만나!
            </p>
            <p className="text-pretty pl-28pxr text-18pxr leading-[140%]">
              상대를 바로 보고 싶을 때 당장 만나를 사용해 보세요 <br />
              표시할 문구를 적고 당장만나 버튼을 누르면 VTalk에서 월드를 생성해
              줍니다!
            </p>
            <br />
            <p className="text-pretty pl-10pxr text-23pxr leading-[180%]">
              • 이미지 미리보기
            </p>
            <img
              className="mx-auto mb-10pxr w-full max-w-200pxr object-contain"
              src="/imgs/webp/option.webp"
              alt="옵션이미지"
            />
            <p className="text-pretty pl-28pxr text-18pxr leading-[140%]">
              왼쪽 사이드바 하단의 케밥 버튼( ⁝ )을 누르면 옵션을 열 수 있어요.
              <br />
              이미지 미리보기를 켜면 이미지 링크이면 이미지로 보여줘요.
              <br />
              기본으로 꺼져있어요.
            </p>
            <br />
            <p className="text-pretty pl-28pxr text-18pxr leading-[140%]">
              ex)
            </p>
            <img
              className="mx-auto mb-10pxr w-full max-w-400pxr object-contain"
              src="/imgs/webp/imageEx.webp"
              alt="옵션이미지"
            />
            <br />
            <p className="text-pretty pl-10pxr text-23pxr leading-[180%]">
              • 끊김 개선
            </p>
            <p className="text-pretty pl-28pxr text-18pxr leading-[140%]">
              채팅 도중 연결이 끊기는 현상이 있어서 불편했죠? <br />
              이제는 연결 로직을 개선해서 끊김 현상이 개선되었어요!
            </p>
            <br />
          </div>
        </div>
      </Modal>
    </>
  )
}
