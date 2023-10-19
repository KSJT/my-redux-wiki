import React, { useState } from "react";
import Timer from "./timer/Timer";
import styles from "./Commute.module.scss";
import { useAppDispatch } from "../../../hooks/redux";
import { setModal } from "../../../store/modal/modalSlice";

const Commute = () => {
  const [isCheck, setIsCheck] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setModal({ isCheck: !isCheck }));
    setIsCheck(!isCheck);
  };
  return (
    <>
      <div className={styles.timer}>
        <Timer />
        <div className={styles.commute_check} onClick={handleClick}>
          출퇴근 확인하기
        </div>
      </div>
    </>
  );
};

export default Commute;
