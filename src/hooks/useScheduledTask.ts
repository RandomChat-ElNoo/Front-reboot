import { useEffect } from 'react'

interface UseScheduledTaskProps {
  targetDate: Date
  callback: () => void
}

/** 특정 시간이 되었을 때 작업을 실행하는 훅
 * @param targetDate Date형식으로 시간값
 * @param callback 실행시켜줄 함수
 */

function useScheduledTask({ targetDate, callback }: UseScheduledTaskProps) {
  useEffect(() => {
    const now = new Date()

    // 타겟 시간이 현재 시간보다 이전이면 실행하지 않음
    const timeDifference = targetDate.getTime() - now.getTime()

    if (timeDifference <= 0) {
      // 이미 시간이 지난 경우 바로 true 설정
      callback()
      return
    }

    // 타겟 시간에 도달하면 true로 변경
    const timerId = setTimeout(() => {
      callback()
    }, timeDifference)

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timerId)
  }, [targetDate])

  return
}

export default useScheduledTask
