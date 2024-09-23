import { useEffect } from 'react'

export default function usePreventRefresh() {
  useEffect(() => {
    const preventRefresh = (e: any) => {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', preventRefresh)

    return () => {
      window.removeEventListener('beforeunload', preventRefresh)
    }
  })
}
