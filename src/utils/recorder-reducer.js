import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inputValue: '',
}

const recorderSlice = createSlice({
  name: 'recorder',
  initialState,
  reducers: {
    inputChanged(state, action) {
      return {
        ...state,
        inputValue: action.payload
      }
    },
  }
})

export const { inputChanged } = recorderSlice.actions
export default recorderSlice.reducer
