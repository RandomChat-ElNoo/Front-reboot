import Main from './pages/Main'
import { ConfigProvider } from 'antd'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Jua',
        },
      }}
    >
      <Main />
    </ConfigProvider>
  )
}
