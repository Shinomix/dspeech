import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
  id: 998,
  sender: 0x00000000,
  content: "First fixture message"
},
{
  id: 999,
  sender: 0x00000001,
  content: "Second fixture message"
}]

const speechSlice = createSlice({
  name: 'speech',
  initialState,
  reducers: {
    speechAdded(state, action) {
      state.push(action.payload)
    },
  }
})

export default speechSlice.reducer
