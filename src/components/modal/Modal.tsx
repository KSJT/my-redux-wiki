import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { setModal } from "../../store/modal/modalSlice";

const Modal = () => {
  const commuteStamp = useAppSelector((state) => state.commute.commuteTime);
  const leaveStamp = useAppSelector((state) => state.commute.leaveTime);
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const dateString = year + "." + month + "." + day + ".";

  const commuteTime = new Date(commuteStamp).toLocaleTimeString();
  const leaveTime = new Date(leaveStamp).toLocaleTimeString();
  const workStamp = leaveStamp - commuteStamp;

  function millisecondsToTime(workStamp) {
    const seconds = Math.floor((workStamp / 1000) % 60);
    const minutes = Math.floor((workStamp / (1000 * 60)) % 60);
    const hours = Math.floor((workStamp / (1000 * 60 * 60)) % 24);

    return {
      hours,
      minutes,
      seconds,
    };
  }
  const timeObject = millisecondsToTime(workStamp);
  const workhour = `${timeObject.hours} 시간 ${timeObject.minutes} 분 ${timeObject.seconds} 초`;

  const isCheck = useAppSelector((state) => state.modal.isCheck);

  const modalRef = useRef(null);
  useOnClickOutside(modalRef);

  return (
    <>
      {isCheck ? (
        <div className={styles.modal_back}>
          <div ref={modalRef} className={styles.modal}>
            <div>
              <div
                style={{
                  textAlign: "center",
                  padding: "1.5rem 0 0 0",
                  fontWeight: "600",
                  color: "rgb(75, 75, 75)",
                }}
              >
                {dateString}
              </div>
              <div className={styles.times_container}>
                <div className={styles.workhour}>
                  총 근무 시간
                  <div>{workhour}</div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <p>출근</p>
                  <div>{commuteTime}</div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <p>퇴근</p>
                  <div>{leaveTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
