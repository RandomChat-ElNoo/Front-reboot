import usePageStore from '../store/usePageStore'
import Home from './home/Home'

/**
 * 본문 부분에 랜더링 되는 부분
 * @todo page 들 연결해주기
 */
export default function Pages() {
  const { page } = usePageStore()
  const homePageShown = page === 0 ? '' : 'hidden'
  return (
    <div className="h-full w-full">
      <div className={`${homePageShown} h-full w-full`}>
        <Home />
      </div>
      {page === 1 ? '' : page === 2 ? '' : ''}
    </div>
  )
}
