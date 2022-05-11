import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPage } from "../utils/web3/contract-api";

const initialState = {
  speeches: []
}

export const fetchPage = createAsyncThunk(
  'speech/fetchPage',
  async (startFrom = 0) => {
    const data = await getPage(startFrom);
    const newSpeeches = data.map(s => (
      { id: s.id, sender: s.sender, content: s.content }
    ));

    return newSpeeches;
  },
)

const speechSlice = createSlice({
  name: 'speech',
  initialState,
  reducers: {
    speechAdded(state, action) {
      state.speeches.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPage.fulfilled, (state, action) => {
        let newState = state.speeches;
        action.payload.forEach(speech => {
          if (!newState.find(s => s.id.eq(speech.id))) {
            newState.push(speech);
          }
        })

        state.speeches = newState;
      })
  }
})

export const { speechAdded } = speechSlice.actions
export default speechSlice.reducer
