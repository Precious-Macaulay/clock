import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectSessionLength } from "./sessionSlice"
import { decrement, increment } from "./sessionSlice"
import { selectRunningTimer } from "../timer/timerSlice"

export function SessionControl() {
  const dispatch = useAppDispatch()
  const sessionLength = useAppSelector(selectSessionLength)
  const runningTimer = useAppSelector(selectRunningTimer)

  const handleDecrement = () => {
    if (sessionLength > 1 && runningTimer === undefined) {
      dispatch(decrement())
    }
  }

  const handleIncrement = () => {
    if (sessionLength < 60 && runningTimer === undefined) {
      dispatch(increment())
    }
  }

  return (
    <>
      <div className="length-control">
        <div id="session-label">Session Length</div>
        <div className="time-control">
          <button
            className="btn-level"
            id="session-decrement"
            value="-"
            onClick={handleDecrement}
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div id="session-length">{sessionLength}</div>
          <button
            className="btn-level"
            id="session-increment"
            value="+"
            onClick={handleIncrement}
          >
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
      </div>
    </>
  )
}
