import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  live_id: '1000109Y16751h1qk', // Room live_id
  name: '',
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

export const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.name = action.payload
    },
  },

})

export const {
  getUserInfo,
} = userInfoSlice.actions

export default userInfoSlice.reducer
