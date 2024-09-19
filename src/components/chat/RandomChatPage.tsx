import { useEffect, useRef, useState } from 'react'
import { randomChatWorker } from '../../pages/Main'
import ChatList from './ChatList'
import CustomButton from '../CustomButton'
import TextInputBox from './TextInputBox'
import useScroll from '../../hooks/useScroll'
import useChatStore from '../../store/useChatStore'
import useGlobalStateStore from '../../store/useGlobalStateStore'
import useChatAlertStore from '../../store/useChatAlertStore'
import useOptionStore from '../../store/useOptionStore'
import { LoadingOutlined } from '@ant-design/icons'

/**
 * @todo fist조인으로 입장버튼 보이기
 * @todo 세션스토리지 저장까진했고 재연결 짜야함
 */

export default function RandomChatPage() {
  const {
    randomChat,
    setRandomChat,
    setOpponentAvatar,
    setRandomChatMeetNow,
    randomChatMatchingCount,
    setRandomChatMatchingCount,
    setCanCreateRandomChatMeetNow,
  } = useChatStore()
  const { setRandomChatAlert } = useChatAlertStore()
  const { isRandomChatConnected, page, setIsRandomChatConnected } =
    useGlobalStateStore()
  const { avatar } = useOptionStore()
  const [inputValue, setInputValue] = useState('')
  const [isWaiting, setIsWaiting] = useState(false)
  const [isFirstJoin, setIsFirstJoin] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)

  useScroll(scrollRef, [randomChat])

  // 랜덤 채팅 들어가기
  const JoinRandomChat = () => {
    const data = ['join']
    randomChatWorker.postMessage(data)
    setIsFirstJoin(false)
  }

  // 채팅 보내기
  const SendMessage = () => {
    if (inputValue.trim() === '') {
      setInputValue('')
      return
    }

    const formattedValue = inputValue.slice(0, 300)

    const newChat = [...randomChat]

    newChat.push({
      isMine: true,
      type: 'chat',
      context: formattedValue,
      time: new Date().toISOString(),
    })

    setRandomChat(newChat)

    const data = ['chat', formattedValue, JSON.stringify(new Date())]
    randomChatWorker.postMessage(data)

    setInputValue('')
  }

  useEffect(() => {
    if (isWaiting) {
      randomChatWorker.postMessage(['count'])
      const sendingCount = setInterval(() => {
        randomChatWorker.postMessage(['count'])
      }, 1500)

      return () => {
        clearInterval(sendingCount)
      }
    }
  }, [isWaiting])

  useEffect(() => {
    // 워커가 컴포넌트로 보내준 메시지를 처리하는 곳
    const handleWorkerMessage = (e: any) => {
      let data
      if (typeof e.data === 'string') {
        data = JSON.parse(e.data)
      } else {
        data = e.data
      }
      console.log('From Worker', e.data)
      console.log('data :', data)

      switch (
        data[0] // ["action",메시지] 로 이루어진 데이터를 분리해서 처리하는 곳
      ) {
        case 'join':
          randomChatWorker.postMessage(['setAvatar', avatar])
          setIsWaiting(false)
          setIsRandomChatConnected(true)
          setIsFirstJoin(false)

          const connectedMessage: Chat = {
            isMine: false,
            type: 'connect',
            context: '채팅에 연결되었습니다!',
            time: new Date().toISOString(),
          }
          setRandomChat((prevChat) => [...prevChat, connectedMessage])
          break

        case 'wait':
          setIsWaiting(true)
          break

        case 'count':
          setRandomChatMatchingCount(data[1])
          break

        case 'avatar':
          setOpponentAvatar(data[1])
          break

        case 'exit':
          if (data[1] === 'me') {
            setIsRandomChatConnected(false)
            setRandomChat([])
            setCanCreateRandomChatMeetNow(true)
            setRandomChatMeetNow([])
            setIsFirstJoin(true)
          }
          if (data[1] === 'opponent') {
            setIsRandomChatConnected(false)
          }

          break

        case 'chat':
          const newChat: Chat = {
            isMine: false,
            type: 'chat',
            context: data[1] as string,
            time: data[2] as string,
          }
          setRandomChat((prevChat) => [...prevChat, newChat])

          if (page !== 2) {
            setRandomChatAlert((prev) => prev + 1)
          }
          break

        case 'createWorld':
          // 채팅에 띄워줄 meetNow배열에 추가
          const createdWorld: Chat = {
            isMine: data.length === 5,
            type: 'meetNow',
            context: data[1] as string,
            link: data[2],
            time: data[3] as string,
          }

          setRandomChat((prevChat) => [...prevChat, createdWorld])

          // 사이드바에 띄워줄 meetNow배열에 추가
          const meetNow: MeetNow = {
            isRandomChat: true,
            message: data[1],
            url: data[2],
            time: data[3],
          }
          setRandomChatMeetNow((prev) => [...prev, meetNow])

          if (data.length === 5) {
            setCanCreateRandomChatMeetNow(false)
            setTimeout(
              () => {
                setCanCreateRandomChatMeetNow(true)
              },
              30 * 60 * 1000,
            )
          }
          break

        case 'getId':
          sessionStorage.setItem('randomChatSocketId', data[1])
          break

        case 'savedId':
          const id = sessionStorage.getItem('randomChatSocketId')
          randomChatWorker.postMessage(['reconnect', id])
          break
      }
    }

    const closeSocket = () => {
      randomChatWorker.postMessage(['close'])
    }

    randomChatWorker.addEventListener('message', handleWorkerMessage)
    window.addEventListener('beforeunload', closeSocket)
    return () => {
      randomChatWorker.removeEventListener('message', handleWorkerMessage)
      window.removeEventListener('beforeunload', closeSocket)
    }
  }, [page])

  return (
    <div className="flex h-full w-full flex-row justify-center">
      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="h-[calc(100%-76px)] w-full overflow-y-scroll"
        >
          <div className="mx-auto max-w-1200pxr">
            <ChatList chatList={randomChat} />
          </div>
        </div>
        <div className="mx-auto max-w-1200pxr px-10pxr pt-10pxr">
          <TextInputBox
            onEmojiButtonClick={function (): void {
              throw new Error('Function not implemented.')
            }}
            onSendButtonClick={SendMessage}
            handleSendMessage={SendMessage}
            inputValue={inputValue}
            setInputValue={setInputValue}
            disabled={!isRandomChatConnected}
          />
        </div>
        {isFirstJoin && (
          <>
            <div className="absolute right-0pxr top-0pxr flex h-full w-full items-center justify-center backdrop-blur-[2px]">
              <CustomButton
                onClick={JoinRandomChat}
                type={'meetNow'}
                size={'l'}
                text={'입장하기!'}
              />
            </div>
          </>
        )}
        {isWaiting && (
          <>
            <div className="absolute right-0pxr top-0pxr flex h-full w-full items-center justify-center backdrop-blur-[2px]">
              <LoadingOutlined />
              <p>{randomChatMatchingCount}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
