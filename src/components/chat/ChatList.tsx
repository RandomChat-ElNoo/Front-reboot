import ChatBox from './ChatBox'

interface ChatListProps {
  chatList: Chat[]
}

/**
 * 채팅 말풍선이 표시될 리스트 박스
 * @param chatList 채팅 박스 리스트
 */

export default function ChatList({ chatList }: ChatListProps) {
  return (
    <div className="flex h-full max-w-1200pxr flex-col gap-20pxr px-20pxr pt-20pxr">
      {chatList.map((chat) => (
        <ChatBox
          key={chat.time.toString()}
          context={chat.context}
          isMine={chat.isMine}
          type={chat.type}
          writingTime={chat.time}
          url={chat.link}
        />
      ))}
    </div>
  )
}
