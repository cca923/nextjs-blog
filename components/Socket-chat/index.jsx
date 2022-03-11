import { useState } from 'react'
import styled from 'styled-components'

import Chat from './Chat'
import Input from './Input'

const ChatRoomWrap = styled.div`
 width: 100%;
 min-height: 500px;
 height: 60vh;
 display: flex;
 flex-direction: column;
`

export default function ChatRoom() {
  const [connected, setConnected] = useState(false)
  const [chat, setChat] = useState([])

  return (
    <ChatRoomWrap>
      <Chat setConnected={setConnected} chat={chat} setChat={setChat} />
      <Input connected={connected} setChat={setChat} />
    </ChatRoomWrap>
  )
}
