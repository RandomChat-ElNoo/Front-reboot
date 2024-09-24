import { useEffect } from 'react'

export default function usePreventRefresh() {
  useEffect(() => {
    const preventRefresh = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = '12312313'
    }

    window.addEventListener('beforeunload', preventRefresh)

    return () => {
      window.removeEventListener('beforeunload', preventRefresh)
    }
  })
}
