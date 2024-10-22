import { useEffect } from 'react'

export default function GroupChatfirstAD() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('광고 로드 중 오류:', err)
    }
  }, [])

  return (
    <div className="relative h-50pxr w-full">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        data-ad-client="ca-pub-9319851907156363"
        data-ad-slot="5001775813"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}
