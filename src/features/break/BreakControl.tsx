import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectBreakLength } from "./breakSlice"
import { decrement, increment } from "./breakSlice"
import { selectRunningTimer } from "../timer/timerSlice"

export function BreakControl() {
  const dispatch = useAppDispatch()
  const breakLength = useAppSelector(selectBreakLength)
  const runningTimer = useAppSelector(selectRunningTimer)

  const handleDecrement = () => {
    if (breakLength > 1 && runningTimer === undefined) {
      dispatch(decrement())
    }
  }

  const handleIncrement = () => {
    if (breakLength < 60 && runningTimer === undefined) {
      dispatch(increment())
    }
  }


  return (
    <>
      <div className="length-control">
        <div id="break-label">Break Length</div>
        <div className="time-control">
          <button
            className="btn-level"
            id="break-decrement"
            value="-"
            onClick={handleDecrement}
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div id="break-length">{breakLength}</div>
          <button
            className="btn-level"
            id="break-increment"
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
