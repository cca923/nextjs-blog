/* eslint-disable max-len */
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

// (浪：2X 版本)
export const socketConnection = createWebSocketConnection({
  url: 'https://chat-web.test.langlive.tech/chat_nsp',
  path: '/chat_nsp',
})

export default function Chat({
  setConnected, user, chat, setChat,
}) {
  useEffect(() => {
    // --- socketParams ---
    // accessToken: 'febe4a18b276c58cbd62eb523410b05e',
    // liveId: '1000513Y25498FPVx',
    // liveKey: 'JNEwk1',
    // nickname: '😔😉',
    // pfid: 1000282,
    // platform: 'LANG_WEB',
    // prettyId: 1000513,
    // referral: '',

    // --- this.getAuth(socketParams) ---
    //     access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaXZlX2lkIjoiMTAwMDUxM1kyNTQ5OEZQVngiLCJwZmlkIjoiMTAwMDI4MiIsIm5hbWUiOiLwn5iU8J-YiSIsImFjY2Vzc190b2tlbiI6ImZlYmU0YTE4YjI3NmM1OGNiZDYyZWI1MjM0MTBiMDVlIiwibHYiOjEsImZyb20iOjEsImZyb21fc2VxIjoxLCJjbGllbnRfdHlwZSI6IkxBTkdfV0VCIn0.UF8oBS6oB-O-zctwFWsfgEG-_8f3Cna6_8q8RJF1blA"
    // anchor_pfid: 1000513
    // client_type: "LANG_WEB"
    // from: "LANG_WEB"
    // live_id: "1000513Y25498FPVx"
    // r: 0
    // referral: ""
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaXZlX2lkIjoiMTAwMDUxM1kyNTQ5OEZQVngiLCJwZmlkIjoiMTAwMDI4MiIsIm5hbWUiOiLwn5iU8J-YiSIsImFjY2Vzc190b2tlbiI6ImZlYmU0YTE4YjI3NmM1OGNiZDYyZWI1MjM0MTBiMDVlIiwibHYiOjEsImZyb20iOjEsImZyb21fc2VxIjoxLCJjbGllbnRfdHlwZSI6IkxBTkdfV0VCIn0.UF8oBS6oB-O-zctwFWsfgEG-_8f3Cna6_8q8RJF1blA"

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
      setConnected(true)
    })

    socketConnection.on('reconnect', () => {
      socketConnection?.emit('authentication', { ...authData, isReconnect: true })
    })

    // log socket connection
    // socketConnection.on('connect', () => {
    //   console.log('SOCKET CONNECTED!', socketConnection.id)
    //   setConnected(true)
    // })

    // update chat on new message dispatched

    // socket disconnet onUnmount if exists
    // if (socketConnection) return () => socketConnection.disconnect()
  }, [])

  useEffect(() => {
    socketConnection.on('msg', (message) => {
      console.log(message.name)

      setChat((preMessage) => [...preMessage, message])
    })
  }, [])

  return (
    <ChatWrap>
      {chat.map((data, index) => (
        <Message key={index} dataUser={data.name} user={user}>
          {data.name === user ? 'Me' : data.name}
          ：
          {data.msg}
        </Message>
      ))}
    </ChatWrap>
  )
}
