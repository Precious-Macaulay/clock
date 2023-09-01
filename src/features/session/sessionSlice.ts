import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface SessionState {
  value: number
}

const initialState: SessionState = {
  value: 25,
}

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    increment: (state) => {
      if (state.value < 60) {
        state.value += 1
      }
    },
    decrement: (state) => {
      if (state.value > 1) {
        state.value -= 1
      }
    },
    reset: () => initialState,
  },
})

export const selectSessionLength = (state: RootState) => state.session.value

export const { increment, decrement, reset: resetSession } = sessionSlice.actions

export default sessionSlice.reducer
