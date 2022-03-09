import { useState } from 'react'
import styled from 'styled-components'

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

export default function Input({ connected, user }) {
  const [message, setMessage] = useState('')

  function handleMessage(e) {
    setMessage(e.target.value)
  }

  async function handleSendingMessage(e) {
    e.preventDefault()

    if (message.length !== 0) {
      const newChat = {
        user,
        message,
      }

      // dispatch message to other users
      const postResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChat),
      })

      // reset field if OK
      if (postResponse.ok) setMessage('')
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
