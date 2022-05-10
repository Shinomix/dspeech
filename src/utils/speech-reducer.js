import { createSlice } from '@reduxjs/toolkit'

const initialState = [{
  id: 998,
  sender: "0xb9EC356788632ea5f73ebb7017e4603EC28A62Eb",
  content: "Welcome to the internet!"
},
{
  id: 999,
  sender: "0xa3B87797420fc6b9619FbF4A92dbCC720E9b0ede",
  content: "This message is here forever"
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
