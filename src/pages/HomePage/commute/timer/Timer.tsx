import React, { useEffect, useState } from "react";
import styles from "./Timer.module.scss";
import { useAppDispatch } from "../../../../hooks/redux";
import {
  setCommuteTime,
  setLeaveTime,
} from "../../../../store/commute/commuteSlice";

const Timer = () => {
  const dispatch = useAppDispatch();

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
  }

  function punchoutStamp() {
    localStorage.removeItem("timestamp");
    setIsCommute(false);
    const leaveStamp = new Date().getTime();
    dispatch(setLeaveTime(leaveStamp));
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
          <button onClick={setCommuteStamp}>출근</button>
          <button onClick={punchoutStamp}>퇴근</button>
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
