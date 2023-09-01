import { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectSessionLength } from "../session/sessionSlice"
import { resetBreak } from "../break/breakSlice"
import { resetSession } from "../session/sessionSlice"
import { selectRunningTimer } from "./timerSlice"
import { setRunningTimer, clearRunningTimer } from "./timerSlice"
import { selectBreakLength } from "../break/breakSlice"

export function Timer() {
  const dispatch = useAppDispatch()
  const sessionLength = useAppSelector(selectSessionLength)
  const breakLength = useAppSelector(selectBreakLength)
  const runningTimer = useAppSelector(selectRunningTimer)
  const [timer, setTimer] = useState(
    `${sessionLength < 10 ? `0${sessionLength}` : sessionLength}:00`,
  )
  const [storedTimeLeft, setStoredTimeLeft] = useState(sessionLength * 60)
  const [isBreak, setIsBreak] = useState(false)

  const beep = useRef<HTMLAudioElement>(null)

  const playAudio = () => {
    beep.current?.play()
    setTimeout(() => {
      beep.current?.pause()
      if (beep.current) {
        beep.current.currentTime = 0
      }
    }, 1500)
  }

  const handleStartStop = () => {
    if (runningTimer === undefined) {
      let timeLeft = storedTimeLeft
      let localIsBreak = isBreak
      let startTimer = setInterval(() => {
        if (timeLeft === 0) {
          playAudio()
          console.log(localIsBreak)
          timeLeft =
            localIsBreak === false ? breakLength * 60 : sessionLength * 60
          localIsBreak = !localIsBreak
          console.log(localIsBreak)
        } else {
          timeLeft -= 1
        }
        let minutes: number = Math.floor(timeLeft / 60)
        let seconds: number = timeLeft % 60
        setTimer(
          `${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`,
        )
        setIsBreak(localIsBreak)
        setStoredTimeLeft(timeLeft)
      }, 1000)
      dispatch(setRunningTimer(startTimer))
    } else {
      clearInterval(runningTimer)
      dispatch(clearRunningTimer())
    }
  }

  const handleReset = () => {
    clearInterval(runningTimer)
    setIsBreak(false)
    dispatch(clearRunningTimer())
    dispatch(resetBreak())
    dispatch(resetSession())
    setTimer(`${sessionLength < 10 ? `0${sessionLength}` : sessionLength}:00`)
    setStoredTimeLeft(sessionLength * 60)
    if (beep.current) {
      beep.current.pause()
      beep.current.currentTime = 0
    }
  }

  useEffect(() => {
    setTimer(`${sessionLength < 10 ? `0${sessionLength}` : sessionLength}:00`)
    setStoredTimeLeft(sessionLength * 60)
  }, [sessionLength])

  return (
    <>
      <div className={`${storedTimeLeft < 60 ? "timer timer-red" : "timer"}`}>
        <div className="timer-wrapper">
          <div id="timer-label">{isBreak === true ? "Break" : "Session"}</div>
          <div id="time-left">{timer}</div>
        </div>
      </div>
      <div className="timer-control">
        <button id="start_stop" onClick={handleStartStop}>
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
        </button>
        <button id="reset" onClick={handleReset}>
          <i className="fa fa-refresh fa-2x"></i>
        </button>
      </div>
      <audio
        ref={beep}
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </>
  )
}
