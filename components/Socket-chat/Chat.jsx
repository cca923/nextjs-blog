import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SocketIOClient from 'socket.io-client'

const ChatWrap = styled.div`
 width: 100%;
 height: 100%;
 background-color: #e9e9e9;
 overflow-y: scroll;
`

const Message = styled.div`
 background-color: #fff;
 padding: 0.5rem 1rem;
 margin: 1rem;
`

export default function Chat({ setConnected, user }) {
  const [chat, setChat] = useState([])

  useEffect(() => {
    // connect to socket server
    const socket = SocketIOClient.connect('http://localhost:3000', {
      path: '/api/socketio',
    })

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
        <Message key={index}>
          {data.user === user ? 'Me' : data.user}
          ：
          {data.message}
        </Message>
      ))}
    </ChatWrap>
  )
}
