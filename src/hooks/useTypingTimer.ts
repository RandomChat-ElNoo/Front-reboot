import { useEffect, useRef } from 'react'
import useChatStore from '../store/useChatStore'

/**
 * 디펜던시 값만 넣어주면 자동으로 typing 상태를 바꿔주는 훅
 * @param inputValue useEffect 디펜던시에 넣어줄 값
 */

export default function useTypingTimer(inputValue: string) {
  const { setAmIRandomChatTyping } = useChatStore()
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (inputValue === '') {
      setAmIRandomChatTyping(false)
      return
    }

    // 타이핑 중으로 상태 변경
    setAmIRandomChatTyping(true)

    // 2초 후에 타이핑 중 상태를 false로 변경
    timeoutRef.current = window.setTimeout(() => {
      setAmIRandomChatTyping(false)
    }, 2000)

    // 의존성에 의해 매번 타이머를 초기화함
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [inputValue])

  return
}
