import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}

export const socketChatSlice = createSlice({
  name: 'socket-chat',
  initialState,
  reducers: {
    // eslint-disable-next-line no-return-assign
    getAllChatMessage: (state, aciton) => state.data = aciton.payload,
    sendChatMessage: (state, action) => {
      state.data = [...state.data, action.payload]
    },
  },

})

export const {
  getAllChatMessage,
  sendChatMessage,
} = socketChatSlice.actions

export default socketChatSlice.reducer
