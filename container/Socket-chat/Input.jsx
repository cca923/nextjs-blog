import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { sendChatMessage } from '../../redux/toolkit/Socket-chat/slice'
import { userInfoSelector } from '../../redux/toolkit/User/selector'
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

export default function Input({ connected }) {
  const dispatch = useDispatch()
  const userInfo = useSelector(userInfoSelector)
  const [message, setMessage] = useState('')

  function handleMessage(e) {
    setMessage(e.target.value)
  }

  function handleSendingMessage(e) {
    e.preventDefault()

    if (message.length !== 0) {
      socketConnection.emit('msg', { ...userInfo, msg: message })
      setMessage('')

      dispatch(sendChatMessage({ msg: message }))
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
