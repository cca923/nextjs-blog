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

  return (
    <ChatRoomWrap>
      <Chat setConnected={setConnected} />
      <Input connected={connected} />
    </ChatRoomWrap>
  )
}
