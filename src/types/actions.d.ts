// const commands = {
//   join, // [1:1] 1:1방에 조인 한다
//   exit, // [1:1, group] 방을 나간다
//   close, // [1:1, group] 나가는 동시에 소캣 연결을 끊는다
//   typing, // [1:1] 상대방에게 자신이 타이핑중이라 알린다
//   setAvatar, // [1:1] 상대방에게 자신의 아바타를 알린다
//   count, // [all] 1:1방에 있는 유저의 수를 반환한다
//   getId, // [all] 자신의 아이디를 반환한다

//   joinGroup, // [group] 그룹방에 조인한다
//   createWorld, // [1:1, group] 방당 정해진 시간의 쿨타암을 가지고 vrchat 월드 인스턴스를 생성한다
//   countGroupUsers, // [all] 그룹방에 있는 유저의 수를 반환한다
// }

/** 1대1 채팅에서의 Action */
type PrivateChatAction =
  | 'chat'
  | 'join'
  | 'exit'
  | 'setAvatar'
  | 'typing'
  | 'count'
  | 'close'
  | 'getId'
  | 'createWorld'

/** 그룹 채팅에서의 Action */
type GroupChatAction =
  | 'chat'
  | 'joinGroup'
  | 'exit'
  | 'countGroupUsers'
  | 'close'
  | 'createWorld'

/** 전체 Action types */
interface AllActions extends PrivateChatAction, GroupChatAction {}
