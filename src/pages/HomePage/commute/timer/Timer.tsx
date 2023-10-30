import { useEffect, useState } from "react";
import styles from "./Timer.module.scss";
import { useAppDispatch } from "../../../../hooks/redux";
import {
  setCommuteTime,
  setLeaveTime,
  setTimerOn,
} from "../../../../store/commute/commuteSlice";
import { useSelector } from "react-redux";

const Timer = () => {
  const dispatch = useAppDispatch();
  const timerOn = useSelector((state) => state.commute.isCommute);

  const [commuteTimeStamp, setCommuteTimeStamp] = useState(
    localStorage.getItem("timestamp")
  );
  const [isCommute, setIsCommute] = useState(true);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  function setCommuteStamp() {
    const timestamp = new Date().getTime();
    localStorage.setItem("timestamp", timestamp);
    setCommuteTimeStamp(timestamp);
    dispatch(setCommuteTime(timestamp));
    dispatch(setTimerOn(true));
  }

  function punchoutStamp() {
    const result = confirm("출퇴근 기록이 삭제됩니다. 퇴근할까요?");
    if (result) {
      localStorage.removeItem("timestamp");
      setIsCommute(false);
      const leaveStamp = new Date().getTime();
      dispatch(setLeaveTime(leaveStamp));
      dispatch(setTimerOn(false));
    } else return;
  }

  useEffect(() => {
    if (!commuteTimeStamp || !isCommute) {
      return;
    } else {
      const time = setInterval(() => {
        const now = new Date().getTime();
        const diff = now - commuteTimeStamp;
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }, 1000);

      return () => {
        clearInterval(time);
      };
    }
  }, [commuteTimeStamp, isCommute]);

  return (
    <>
      <div className={styles.timer_container}>
        <div className={styles.button_container}>
          {!timerOn ? (
            <button disabled={!isCommute} onClick={setCommuteStamp}>
              출근하기
            </button>
          ) : (
            <button onClick={punchoutStamp}>퇴근하기</button>
          )}
        </div>
        <div className={styles.timer_container}>
          <div className={styles.timer}>
            {seconds
              ? `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
                  seconds < 10 ? `0${seconds}` : seconds
                }`
              : "0:00:00"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
