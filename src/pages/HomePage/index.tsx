import React, { useEffect, useState } from "react";
import styles from "./Index.module.scss";
import Commute from "./commute/";
import { useAppSelector } from "../../hooks/redux";

const HomePage = () => {
  const [isCheck, setIsCheck] = useState(false);
  const setModal = useAppSelector((state) => state.modal.isCheck);
  useEffect(() => {
    if (setModal) {
      setIsCheck(true);
      console.log("setmodal", setModal);
    }
  }, [setModal]);

  return (
    <div className={styles.home}>
      {/* {isCheck ? <Modal /> : null} */}
      <div className={styles.grid_container}>
        <div className={styles.item1}>1</div>
        <div className={styles.item2}>
          <Commute />
        </div>
        <div className={styles.item3}>3</div>
        <div className={styles.item4}>4</div>
        <div className={styles.item5}>5</div>
      </div>
    </div>
  );
};

export default HomePage;
