import { useEffect, useState } from 'react'

export default function useMobileResize() {
  const [height, setHeight] = useState(window.innerHeight)

  // 화면의 높이를 동적으로 조정하는 함수
  const adjustHeight = () => {
    if (window.visualViewport) {
      setHeight(window.visualViewport.height)
      console.log(window.visualViewport.height)
    } else {
      setHeight(window.innerHeight)
      console.log(window.innerHeight)
    }
  }

  useEffect(() => {
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', adjustHeight)
    } else {
      window.addEventListener('resize', adjustHeight)
    }
    // 초기 높이 설정
    adjustHeight()

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', adjustHeight)
      } else {
        window.removeEventListener('resize', adjustHeight)
      }
    }
  }, [])

  return height
}
