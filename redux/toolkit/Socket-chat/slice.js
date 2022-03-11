/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}

export const socketChatSlice = createSlice({
  name: 'socket-chat',
  initialState,
  reducers: {
    getAllChatMessage: (state, action) => {
      state.data = [...state.data, action.payload]
    },
    sendChatMessage: () => {},
    appendChatMessage: (state, action) => {
      state.data = [...state.data, action.payload]
    },
  },

})

export const {
  getAllChatMessage,
  sendChatMessage,
  appendChatMessage,
} = socketChatSlice.actions

export default socketChatSlice.reducer
