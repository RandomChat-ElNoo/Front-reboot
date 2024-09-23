let socket = new WebSocket('wss://api.vtalk.be/')

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

const stopTypingPrivateChat = () => {
  if (socket.readyState === WebSocket.OPEN) {
    const data = JSON.stringify(['stopTyping'])
    socket.send(data)
  }
}

const getIdPrivateChat = () => {
  const data = JSON.stringify(['getId'])
  socket.send(data)
}

// 워커가 응답을 받아 실행하는 부분
const randomChatWorkerHandler = () => {
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

      case 'stopTyping':
        stopTypingPrivateChat()
        break

      case 'setAvatar':
        setAvatarPrivateChat(msg ? msg : '기타')
        break

      case 'createWorld':
        if (msg) {
          createWorld(msg)
        }
        break

      case 'reconnect':
        setTimeout(() => {
          try {
            self.postMessage(['chat', '재연결 시도'])
            socket = new WebSocket(`wws://api.vtalk.be/?vtalk=${msg}`)
            randomChatWorkerHandler()
          } catch (e) {
            self.postMessage(['chat', '재연결 실패'])
            self.postMessage(['chat', `${e}`])
          }
        }, 1000)
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

  socket.onopen = () => {
    getIdPrivateChat()
  }

  socket.onerror = (e) => {
    console.log('socket error: ', e)
    self.postMessage(['chat', `에러발생 : ${e}`])
  }

  socket.onclose = () => {
    self.postMessage(['getSavedId'])
  }
}

randomChatWorkerHandler()
