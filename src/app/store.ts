import { configureStore, } from "@reduxjs/toolkit"
import breakReducer from "../features/break/breakSlice"
import sessionReducer from "../features/session/sessionSlice"
import timerReducer from "../features/timer/timerSlice"

export const store = configureStore({
  reducer: {
    break: breakReducer,
    session: sessionReducer,
    timer: timerReducer,
  },
  preloadedState: {
    
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
