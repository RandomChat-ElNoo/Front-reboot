import CustomButton from '../CustomButton'

interface JoinDialogProps {
  isRandomChat: boolean
  onClick: () => void
}

export default function JoinDialog({ isRandomChat, onClick }: JoinDialogProps) {
  const title = isRandomChat ? '랜덤 채팅 매칭하기' : '전체 채팅 입장하기'
  const buttonText = isRandomChat ? '매칭하기!' : '입장하기!'
  return (
    <div className="absolute right-0pxr top-0pxr flex h-full w-full flex-row items-center justify-center backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-20pxr">
        <p className="text-30pxr">{title}</p>
        <CustomButton
          onClick={onClick}
          type="meetNow"
          size="l"
          text={buttonText}
        />
      </div>
    </div>
  )
}
