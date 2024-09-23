import { useEffect, useState } from 'react'

export default function useMobileResize() {
  const [height, setHeight] = useState(window.innerHeight)

  // 화면의 높이를 동적으로 조정하는 함수
  const adjustHeight = () => {
    setHeight(window.innerHeight)
    console.log(window.innerHeight)
  }

  useEffect(() => {
    // 컴포넌트가 마운트될 때와 리사이즈 이벤트가 발생할 때 높이 조정
    window.addEventListener('resize', adjustHeight)

    // 초기 높이 설정
    adjustHeight()

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      window.removeEventListener('resize', adjustHeight)
    }
  }, [])

  return height
}
