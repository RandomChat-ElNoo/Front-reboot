import GroupChatfirstAD from '../Ads/GroupChatfirstAD'
import RandomChatFirstAD from '../Ads/RandomChatFirstAD'
import ChatBox from './ChatBox'

interface ChatListProps {
  chatList: Chat[]
  type: 'random' | 'group'
}

/**
 * 채팅 말풍선이 표시될 리스트 박스
 * @param chatList 채팅 박스 리스트
 * @param type 채팅 타입(전체인지, 랜덤인지)
 */

export default function ChatList({ chatList, type }: ChatListProps) {
  return (
    <div className="flex h-full max-w-1200pxr flex-col gap-20pxr px-20pxr pt-20pxr">
      {type === 'random' ? <RandomChatFirstAD /> : <GroupChatfirstAD />}
      {chatList.map((chat, index) => (
        <ChatBox
          key={`${index + 0}`}
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
