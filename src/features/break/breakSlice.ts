import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface BreakState {
  value: number
}

const initialState: BreakState = {
  value: 5,
}

export const breakSlice = createSlice({
  name: "break",
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

export const selectBreakLength = (state: RootState) => state.break.value

export const { increment, decrement, reset: resetBreak } = breakSlice.actions

export default breakSlice.reducer
