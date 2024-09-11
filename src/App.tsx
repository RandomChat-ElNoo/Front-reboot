import Main from './pages/Main'
import { ConfigProvider } from 'antd'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: '#343439',
            headerBg: '#343439',
          },
        },
        token: {
          fontFamily: 'Pretendard Variable',
          lineHeight: 1,
          colorText: 'white',
        },
      }}
    >
      <Main />
    </ConfigProvider>
  )
}
