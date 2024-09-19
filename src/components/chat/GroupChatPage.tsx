import { useEffect, useRef, useState } from 'react'
import { groupChatWorker } from '../../pages/Main'
import { notification } from 'antd'
import ChatList from './ChatList'
import TextInputBox from './TextInputBox'
import useScroll from '../../hooks/useScroll'
import useScheduledTask from '../../hooks/useScheduledTask'
import useChatStore from '../../store/useChatStore'
import useGlobalStateStore from '../../store/useGlobalStateStore'
import useChatAlertStore from '../../store/useChatAlertStore'
import useCanGroupChatMeetNowStore from '../../store/useCanGroupChatMeetNowStore'
import JoinDialog from './JoinDialog'

export default function GroupChatPage() {
  const {
    groupChat,
    setGroupChat,
    setGroupChatUserCount,
    setGroupChatMeetNow,
  } = useChatStore()
  const { setGroupChatAlert } = useChatAlertStore()
  const { page, isGroupChatConnected, setIsGroupChatConnected } =
    useGlobalStateStore()
  const { setCanCreateGroupMeetNow, expiredTime, setExpiredTime } =
    useCanGroupChatMeetNowStore()
  const [inputValue, setInputValue] = useState('')
  const [canSendMessage, setCanSendMessage] = useState(true)
  const [api, contextHolder] = notification.useNotification()
  const scrollRef = useRef<HTMLDivElement>(null)

  useScroll(scrollRef, [groupChat])

  const openNotification = () => {
    api['error']({
      message: '조금 천천히 입력해주세요',
      className: 'bg-[#343439] rounded-[5px]',
      closeIcon: null,
      duration: 0.7,
    })
  }

  useScheduledTask({
    targetDate: expiredTime || null,
    callback: () => {
      setCanCreateGroupMeetNow(true)
    },
  })

  // 전체 채팅 들어가기
  const JoinGroupChat = () => {
    const data = ['joinGroup']
    groupChatWorker.postMessage(data)
  }

  // 채팅 보내기
  const SendMessage = () => {
    if (inputValue.trim() === '') {
      setInputValue('')
      return
    }
    if (!canSendMessage) {
      openNotification()
      return
    }

    const formattedValue = inputValue.slice(0, 300).replace(/\n{3,}/g, '\n\n')

    const LineCount = (formattedValue.match(/\n/g) || []).length // 줄바꿈 개수

    let result = formattedValue

    if (LineCount > 4) {
      const lines = formattedValue.split('\n') // 줄바꿈 기준으로 나누기
      const newlineLimitedText = lines.slice(0, 5).join('\n') // 줄바꿈 5개까지만 남기기
      const remainingText = lines.slice(5).join(' ') // 나머지 문자는 줄바꿈 없이 이어 붙이기
      result = newlineLimitedText + ' ' + remainingText
    }

    const newChat = [...groupChat]
    newChat.push({
      isMine: true,
      type: 'chat',
      context: result,
      time: new Date().toISOString(),
    })
    setGroupChat(newChat)
    const data = ['chat', result, JSON.stringify(new Date())]
    groupChatWorker.postMessage(data)
    setCanSendMessage(false)

    setTimeout(() => {
      setCanSendMessage(true)
    }, 1000)

    setInputValue('')
  }

  useEffect(() => {
    const handleWorkerMessage = (e: any) => {
      // 워커가 컴포넌트로 보내준 메시지를 처리하는 곳
      console.log('From Worker', e.data)

      let data
      if (typeof e.data === 'string') {
        data = JSON.parse(e.data)
      } else {
        data = e.data
      }

      console.log('data :', data)

      switch (
        data[0] // ["action",메시지] 로 이루어진 데이터를 분리해서 처리하는 곳
      ) {
        case 'join':
          setIsGroupChatConnected(true)
          setGroupChatUserCount(data[1])

          const connectedMessage: Chat = {
            isMine: false,
            type: 'connect',
            context: '채팅에 연결되었습니다!',
            time: new Date().toISOString(),
          }
          setGroupChat((prevChat) => [...prevChat, connectedMessage])
          break

        case 'exit':
          setIsGroupChatConnected(false)
          setGroupChat([])
          break

        case 'count':
          setGroupChatUserCount(data[1])
          break

        case 'chat':
          const newChat: Chat = {
            isMine: false,
            type: 'chat',
            context: data[1] as string,
            time: data[2] as string,
          }
          setGroupChat((prevGroupChat) => [...prevGroupChat, newChat])
          console.log('page :', page)
          if (page !== 1) {
            setGroupChatAlert((prev) => prev + 1)
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

          setGroupChat((prevGroupChat) => [...prevGroupChat, createdWorld])

          // 사이드바에 띄워줄 meetNow배열에 추가
          const meetNow: MeetNow = {
            isRandomChat: false,
            message: data[1],
            url: data[2],
            time: data[3],
          }
          setGroupChatMeetNow((prev) => [...prev, meetNow])

          if (data.length === 5) {
            setExpiredTime(data[4])
            setCanCreateGroupMeetNow(false)
          }
          break
      }
    }

    const closeSocket = () => {
      groupChatWorker.postMessage(['close'])
    }

    groupChatWorker.addEventListener('message', handleWorkerMessage)
    window.addEventListener('beforeunload', closeSocket)
    return () => {
      groupChatWorker.removeEventListener('message', handleWorkerMessage)
      window.removeEventListener('beforeunload', closeSocket)
    }
  }, [page])

  return (
    <div className="flex h-full w-full flex-row justify-center">
      {contextHolder}
      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="h-[calc(100%-76px)] w-full overflow-y-scroll"
        >
          <div className="mx-auto max-w-1200pxr">
            <ChatList chatList={groupChat} />
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
            disabled={!isGroupChatConnected}
          />
        </div>
        {isGroupChatConnected || (
          <JoinDialog isRandomChat={false} onClick={JoinGroupChat} />
        )}
      </div>
    </div>
  )
}
