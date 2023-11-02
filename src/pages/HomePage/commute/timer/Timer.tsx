import { useEffect, useState } from "react";
import styles from "./Timer.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  setCommuteTime,
  setLeaveTime,
  setTimerOn,
} from "../../../../store/commute/commuteSlice";

const Timer = () => {
  const dispatch = useAppDispatch();
  const timerOn = useAppSelector((state) => state.commute.isCommute);

  const [commuteTimeStamp, setCommuteTimeStamp] = useState<any>(
    JSON.parse(
      localStorage.getItem("commuteStamp")
        ? JSON.parse(localStorage.getItem("commuteStamp") as any | "")
        : ""
    )
  );

  const [isCommute, setIsCommute] = useState(true);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function setCommuteStamp() {
    const timestamp = new Date().getTime();
    const currentDate = new Date(timestamp);

    const expirationDate = dayString(currentDate);
    const data = {
      commuteTimeStamp: timestamp,
      expirationDate,
    };
    localStorage.setItem("commuteStamp", JSON.stringify(data));

    setCommuteTimeStamp(timestamp);
    dispatch(setCommuteTime(timestamp));
    dispatch(setTimerOn(true));
  }

  function punchoutStamp() {
    const result = confirm("출근은 한 번만 할 수 있습니다. 퇴근할까요?");
    if (result) {
      setIsCommute(false);

      const timestamp = new Date().getTime();
      const currentDate = new Date(timestamp);

      const expirationDate = dayString(currentDate);
      const data = {
        puchoutTimeStamp: timestamp,
        expirationDate,
      };
      localStorage.setItem("leaveStamp", JSON.stringify(data));

      dispatch(setLeaveTime(timestamp));
      dispatch(setTimerOn(false));
    } else return;
  }

  useEffect(() => {
    if (!commuteTimeStamp || !timerOn) {
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

  // expirationDate

  const dayString = (currentDate: any) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const expiration = year + "-" + month + "-" + day + "T23:59:59";
    return expiration;
  };

  return (
    <>
      <div className={styles.timer_container}>
        <div className={styles.button_container}>
          {!timerOn ? (
            <button disabled={commuteTimeStamp} onClick={setCommuteStamp}>
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
