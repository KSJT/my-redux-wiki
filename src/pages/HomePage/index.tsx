import React, { useEffect, useState } from "react";
import styles from "./Index.module.scss";
import Commute from "./commute/";
import { useAppSelector } from "../../hooks/redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Carousel from "./carousel/Carousel";
import BoardPreview from "./boardpreview/BoardPreview";
import Todo from "./todo/Todo";

const HomePage = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

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
      <div className={styles.grid_container}>
        <div className={styles.item1}>
          <Carousel />
        </div>
        <div className={styles.item2}>
          <Commute />
        </div>
        <div className={styles.item3}>
          <Todo />
        </div>
        <div className={styles.item4}>4</div>
        <div className={styles.item5}>
          <BoardPreview />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
