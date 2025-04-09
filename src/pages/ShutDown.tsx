export default function ShutDown() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10pxr">
        <img src="/imgs/svgs/logo.svg" alt="logo" className="w-200pxr" />
        <p className="mb-30pxr text-50pxr font-bold">점검중</p>

        <p className="mb-15pxr text-32pxr text-slate-400">
          vtalk 업데이트로 돌아오겠습니다!
        </p>
        <p className="text-32pxr text-slate-400">
          그동안 이용해 주셔서 감사합니다.
        </p>
      </div>
    </div>
  )
}
