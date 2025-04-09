// import Main from './pages/Main'
import { ConfigProvider } from 'antd'
import ShutDown from './pages/ShutDown'

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
      {/* <Main /> */}
      <ShutDown />
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
