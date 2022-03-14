/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}

export const socketChatSlice = createSlice({
  name: 'socket-chat',
  initialState,
  reducers: {
    appendChatMessage: (state, action) => {
      state.data = [...state.data, action.payload]
      console.log(state.data)
    },
    sendChatMessage: () => {},
  },

})

export const {
  getAllChatMessage,
  sendChatMessage,
  appendChatMessage,
} = socketChatSlice.actions

export default socketChatSlice.reducer
