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

console.log(
  ` _   _  _____         _  _    
| | | ||_   _|       | || |   
| | | |  | |    __ _ | || | __
| | | |  | |   / _\` || || |/ /
\\ \\_/ /  | |  | (_| || ||   < 
 \\___/   \\_/   \\__,_||_||_|\\_\\`,
)
