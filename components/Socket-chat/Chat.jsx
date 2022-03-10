import { useEffect, useState } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'

const ChatWrap = styled.div`
 width: 100%;
 height: 100%;
 background-color: #e9e9e9;
 overflow-y: scroll;
`

const Message = styled.div`
 background-color: ${(props) => (props.dataUser === props.user ? '#fff' : '#a8dadc')} ;
 padding: 0.5rem 1rem;
 margin: 1rem;
`

export const createWebSocketConnection = ({ url, path }) => {
  const socket = io(url, {
    path,
    transports: ['websocket'],
  })
  return socket
}

export default function Chat({ setConnected, user }) {
  const [chat, setChat] = useState([])

  useEffect(() => {
    // connect to socket server
    const socket = io.connect('http://localhost:3000', {
      path: '/api/socketio',
    })

    // const socketConnection = createWebSocketConnection({
    //   url: 'https://chat-web.test.langlive.tech/chat_nsp',
    //   path: '/chat_nsp',
    // })

    // log socket connection
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket.id)
      setConnected(true)
    })

    // update chat on new message dispatched
    socket.on('message', (message) => {
      setChat((preMessage) => [...preMessage, message])
    })

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect()
  }, [])

  return (
    <ChatWrap>
      {chat.map((data, index) => (
        <Message key={index} dataUser={data.user} user={user}>
          {data.user === user ? 'Me' : data.user}
          ：
          {data.message}
        </Message>
      ))}
    </ChatWrap>
  )
}
