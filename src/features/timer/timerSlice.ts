import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

type Timeout = ReturnType<typeof setTimeout>

export interface TimerState {
  running: string | number | Timeout | undefined
}

const initialState: TimerState = {
  running: undefined,
}

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setRunningTimer: (state, action) => {
      state.running = action.payload
    },
    clearRunningTimer: (state) => {
      state.running = undefined
    },
  },
})

export const selectRunningTimer = (state: RootState) => state.timer.running

export const { setRunningTimer, clearRunningTimer } = timerSlice.actions

export default timerSlice.reducer
