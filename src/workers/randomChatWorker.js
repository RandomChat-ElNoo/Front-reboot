/** 채팅은 socket.send("안녕"+","+"뉴데이트")
 * @todo 조인후 인터넷이 끊기면 클라이언트에서socket.onclose 발생 하는데
 */

const socket = new WebSocket('https://api.vtalk.be/')

// 공통
const SendMessage = (msg) => {
  const data = JSON.stringify(['chat', msg, new Date()])
  socket.send(data)
}

const createWorld = () => {
  const data = JSON.stringify(['createWorld'])
  socket.send(data)
}

const exitChat = () => {
  const data = JSON.stringify(['exit'])
  socket.send(data)
}

const closeSocket = () => {
  const data = JSON.stringify(['close'])
  socket.send(data)
}

// 1대1 채팅
const joinPrivateChat = () => {
  const data = JSON.stringify(['join'])
  socket.send(data)
}

const setAvatarPrivateChat = (avatar) => {
  const data = JSON.stringify(['setAvatar', `${avatar}`])
  socket.send(data)
}

const countPrivateChat = () => {
  const data = JSON.stringify(['count'])
  socket.send(data)
}

const typingPrivateChat = () => {
  const data = JSON.stringify(['typing'])
  socket.send(data)
}

const getIdPrivateChat = () => {
  const data = JSON.stringify(['getId'])
  socket.send(data)
}

// 워커가 응답을 받아 실행하는 부분
self.onmessage = (e) => {
  const [action, msg] = e.data

  switch (action) {
    case 'chat':
      if (msg) {
        SendMessage(msg)
      }
      break

    case 'join':
      joinPrivateChat()
      break

    case 'getId':
      getIdPrivateChat()
      break

    case 'exit':
      exitChat()
      break

    case 'close':
      closeSocket()
      break

    case 'count':
      countPrivateChat()
      break

    case 'typing':
      typingPrivateChat()
      break

    case 'setAvatar':
      setAvatarPrivateChat(msg ? msg : '기타')
      break

    case 'createWorld':
      createWorld()
      break

    default:
      console.error('Unknown message action:', action)
      break
  }
}

socket.onmessage = (e) => {
  const response = JSON.parse(e.data)
  self.postMessage(response)
}
