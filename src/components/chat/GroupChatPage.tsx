import { useEffect, useState } from 'react'
import ChatList from './ChatList'
import TextInputBox from './TextInputBox'
import useChatStore from '../../store/useChatStore'
import { groupChatWorker } from '../../pages/Main'
import useGlobalStateStore from '../../store/useGlobalStateStore'
import CustomButton from '../CustomButton'
import usePageStore from '../../store/usePageStore'
import useChatAlertStore from '../../store/useChatAlertStore'
import useScheduledTask from '../../hooks/useScheduledTask'
import useCanGroupChatMeetNowStore from '../../store/useCanGroupChatMeetNowStore'
import { notification } from 'antd'

export default function GroupChatPage() {
  const {
    groupChat,
    setGroupChat,
    setGroupChatUserCount,
    setGroupChatMeetNow,
  } = useChatStore()
  const { setGroupChatAlert } = useChatAlertStore()
  const { isGroupChatConnected, setIsGroupChatConnected } =
    useGlobalStateStore()
  const { setCanCreateGroupMeetNow, expiredTime, setExpiredTime } =
    useCanGroupChatMeetNowStore()
  const { page } = usePageStore()
  const [inputValue, setInputValue] = useState('')
  const [canSendMessage, setCanSendMessage] = useState(true)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api['error']({
      message: '조금 천천히 입력해주세요',
      className: 'bg-[#343439] rounded-[5px]',
      closeIcon: null,
      duration: 0.5,
    })
  }

  useScheduledTask({
    targetDate: expiredTime ? expiredTime : null,
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

    const newChat = [...groupChat]
    newChat.push({
      isMine: true,
      type: 'chat',
      context: inputValue,
      time: new Date().toISOString(),
    })
    setGroupChat(newChat)
    const data = ['chat', inputValue, JSON.stringify(new Date())]
    groupChatWorker.postMessage(data)
    setCanSendMessage(false)

    const timerId = setTimeout(() => {
      setCanSendMessage(true)
    }, 1000)

    setInputValue('')
  }

  useEffect(() => {
    groupChatWorker.onmessage = (e) => {
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
    window.addEventListener('beforeunload', closeSocket)
    return () => {
      window.removeEventListener('beforeunload', closeSocket)
    }
  }, [])

  return (
    <div className="flex h-full w-full flex-row justify-center">
      {contextHolder}
      <div className="relative w-full">
        <div className="h-[calc(100%-76px)] w-full overflow-y-scroll">
          <div className="mx-auto max-w-1200pxr">
            <ChatList chatList={groupChat} isConnected={isGroupChatConnected} />
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
          <div className="absolute right-0pxr top-0pxr flex h-full w-full items-center justify-center backdrop-blur-[2px]">
            <CustomButton
              onClick={JoinGroupChat}
              type={'meetNow'}
              size={'l'}
              text={'입장하기!'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
