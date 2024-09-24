import { useEffect } from 'react'

/**
 * 채팅이 오면 자동으로 스크롤을 내려주는 훅
 * @param scrollRef 해당 스크롤의 Ref
 * @param dependencyArray 의존성 배열
 */

export default function useScroll(
  scrollRef: React.RefObject<HTMLDivElement>,
  dependencyArray: any[],
) {
  useEffect(() => {
    if (!scrollRef.current) return

    const { scrollTop, scrollHeight, offsetHeight } = scrollRef.current

    const doScrollDown = scrollTop > scrollHeight - offsetHeight * 2

    if (doScrollDown) {
      scrollRef.current.scrollTop = scrollHeight
      return
    }
  }, dependencyArray)

  return
}
