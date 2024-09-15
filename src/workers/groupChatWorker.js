/** 채팅은 socket.send("안녕"+","+"뉴데이트")
 * @todo 조인후 인터넷이 끊기면 클라이언트에서socket.onclose 발생 하는데
 */

const socket = new WebSocket('https://api.vtalk.be/')

// 공통
const SendMessage = (msg) => {
  const data = JSON.stringify(['chat', msg, new Date()])
  socket.send(data)
}

const createWorld = (msg) => {
  const data = JSON.stringify(['createWorld', msg])
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

// 단체채팅
const joinGroupChat = () => {
  const data = JSON.stringify(['joinGroup'])
  socket.send(data)
}

const countGroupChat = () => {
  const data = JSON.stringify(['countGroupUsers'])
  socket.send(data)
}

// 워커가 응답을 받아 실행하는 부분
self.onmessage = (e) => {
  const [action, msg] = e.data
  console.log(action, msg, 'worker')
  switch (action) {
    case 'chat':
      if (msg) {
        SendMessage(msg)
      }
      break

    case 'joinGroup':
      joinGroupChat()
      break

    case 'count':
      countGroupChat()
      break

    case 'exit':
      exitChat()
      break

    case 'close':
      closeSocket()
      break

    case 'countGroupUsers':
      countGroupChat()
      break

    case 'createWorld': // 오는 배열에 endtime이 있나없나로 내꺼인지 검사
      if (msg) {
        createWorld(msg)
      }
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
