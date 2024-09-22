/** 인풋위에 쓰일 점 3개가 바운스하는 컴포넌트 */

export default function JumpingDot() {
  return (
    <div className="flex flex-row gap-2pxr">
      <div className="h-4pxr w-4pxr animate-bounce rounded-full bg-white"></div>
      <div className="h-4pxr w-4pxr animate-bounce rounded-full bg-white [animation-delay:-.3s]"></div>
      <div className="h-4pxr w-4pxr animate-bounce rounded-full bg-white [animation-delay:-.5s]"></div>
    </div>
  )
}
