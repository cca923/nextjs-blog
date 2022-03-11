import { useState } from 'react'
import styled from 'styled-components'
import { socketConnection } from './Chat'

const InputWrap = styled.form`
 width: 100%;
 min-height: 50px;
 background-color: grey;
 display: flex;
 padding: 0.5rem;
`
const MessageInput = styled.input`
 width: 100%;
 border-radius: 5rem;
 border: 2px solid grey;
 padding: 1rem;
`
const MessageSendButton = styled.button`
 min-width: 70px;
 border-radius: 5rem;
 border: none;
 margin-left: 0.5rem;
`

export default function Input({ connected, user, setChat }) {
  const [message, setMessage] = useState('')

  function handleMessage(e) {
    setMessage(e.target.value)
  }

  function handleSendingMessage(e) {
    e.preventDefault()

    if (message.length !== 0) {
      const newChat = {
        live_id: '1000109Y16751h1qk', // Room_id
        msg: message,
        name: user,
        at: new Date().getTime(),
        grade_id: '4',
        grade_lvl: '33',
        is_admin: false,
        nlv: 0,
        pfid: '1000591',
        rel_color: '#FFFFFF',
        signed: 1,
        type: 0,
        ugid: 11,
        uglv: 55,
        vip_fan: 0,
        vip_fan_nameplate: { content: '粉絲團', color: 0 },
      }

      socketConnection.emit('msg', newChat)
      setMessage('')
      setChat((preMessage) => [...preMessage, newChat])
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <InputWrap onSubmit={handleSendingMessage}>
      <MessageInput
        type="text"
        value={message}
        onChange={(e) => handleMessage(e)}
        placeholder={connected ? 'Type a message...' : 'Connecting...'}
        disabled={!connected}
      />
      <MessageSendButton type="submit">Send</MessageSendButton>
    </InputWrap>

  )
}
