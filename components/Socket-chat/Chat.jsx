/* eslint-disable max-len */
import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
import { getAllChatMessage } from '../../redux/toolkit/Socket-chat/slice'
import { useDispatch, useSelector } from 'react-redux'
import { socketChatSelector } from '../../redux/toolkit/Socket-chat/selector'
import { getUserInfo } from '../../redux/toolkit/User/slice'
import { userInfoSelector } from '../../redux/toolkit/User/selector'

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

// (浪：2X 版本)
export const socketConnection = createWebSocketConnection({
  url: 'https://chat-web.test.langlive.tech/chat_nsp',
  path: '/chat_nsp',
})

export default function Chat({ setConnected }) {
  const dispatch = useDispatch()
  const socketChat = useSelector(socketChatSelector)
  const userInfo = useSelector(userInfoSelector)
  const chatRef = useRef()

  useEffect(() => {
    // --- socketParams ---
    // accessToken: 'febe4a18b276c58cbd62eb523410b05e',
    // liveId: 'Live_id(會根據不同 room 變)',
    // liveKey: 'JNEwk1',
    // nickname: '😔😉',
    // pfid: 1000282,
    // platform: 'LANG_WEB',
    // prettyId: 1000513,
    // referral: '',

    // --- this.getAuth(socketParams) ---
    // access_token: "",
    // anchor_pfid: 1000513,
    // client_type: "LANG_WEB",
    // from: "LANG_WEB",
    // live_id: "Live_id(會根據不同 room 變)",
    // r: 0,
    // referral: "",
    // token: "",

    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaXZlX2lkIjoiMTAwMDEwOVkxNjc1MWgxcWsiLCJwZmlkIjoiMTAwMDU5MSIsIm5hbWUiOiJKYWNrMTExIiwiYWNjZXNzX3Rva2VuIjoiYmQ4OGQ3MWU0YWVmMmRiOTM3MzllNTFhMjU5MjNiODkiLCJsdiI6MSwiZnJvbSI6MSwiZnJvbV9zZXEiOjEsImNsaWVudF90eXBlIjoiTEFOR19XRUIifQ.vhW77Om6NbbWMZn_XBXG6CrC8UwJpXV43_SHUvmkhKk'

    const authData = {
      live_id: '1000109Y16751h1qk', // Room live_id
      access_token: userToken,
      anchor_pfid: 1000513,
      client_type: 'LANG_WEB',
      from: 'LANG_WEB',
      r: 0,
      referral: '',
      token: userToken,
    }

    socketConnection.once('connect', () => {
      socketConnection?.emit('authentication', authData)

      const user = `User_${String(new Date().getTime()).slice(-3)}`
      dispatch(getUserInfo(user))

      setConnected(true)
    })

    socketConnection.on('reconnect', () => {
      socketConnection?.emit('authentication', { ...authData, isReconnect: true })

      setConnected(true)
    })

    // socket disconnet onUnmount if exists
    if (socketConnection) return () => socketConnection.disconnect()
  }, [])

  useEffect(() => {
    socketConnection.on('msg', (message) => {
      dispatch(getAllChatMessage(message))
    })
  }, [])

  const scrollToBottom = useCallback(() => {
    const chatEl = chatRef?.current
    chatEl.scrollTop = chatEl.scrollHeight
  }, [chatRef])

  useEffect(scrollToBottom, [socketChat])

  return (
    <ChatWrap ref={chatRef}>
      {socketChat.data.map((data, index) => (
        <Message
          key={index}
          dataUser={data.name}
          user={userInfo.name}
        >
          {data.name === userInfo.name ? 'Me' : data.name}
          ：
          {data.msg}
        </Message>
      ))}
    </ChatWrap>
  )
}
