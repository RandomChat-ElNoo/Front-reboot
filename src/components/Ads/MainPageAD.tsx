import { useEffect } from 'react'

export default function MainPageAD() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('광고 로드 중 오류:', err)
    }
  }, [])

  return (
    <div className="relative h-65pxr w-full">
      <ins
        className="adsbygoogle absolute left-0pxr top-0pxr block h-65pxr w-full"
        data-ad-client="ca-pub-9319851907156363"
        data-ad-slot="2050811865"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}
