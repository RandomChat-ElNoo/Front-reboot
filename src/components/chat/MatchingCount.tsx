import { LoadingOutlined } from '@ant-design/icons'

interface MatchingCountProps {
  randomChatMatchingCount: number
}

export default function MatchingCount({
  randomChatMatchingCount,
}: MatchingCountProps) {
  return (
    <>
      <div className="absolute right-0pxr top-0pxr flex h-full w-full flex-col items-center justify-center gap-10pxr backdrop-blur-[2px]">
        <p className="text-30pxr">{randomChatMatchingCount}명 채팅중...</p>
        <LoadingOutlined className="text-80pxr" />
      </div>
    </>
  )
}
