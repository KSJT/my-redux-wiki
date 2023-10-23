import React, { useEffect } from "react";
import styles from "./Page.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useAppDispatch } from "../../../hooks/redux";
import { getRecentNoti } from "../../../store/articles/notificationSlice";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";

const Page = () => {
  const dispatch = useAppDispatch();
  const recentNoti = useAppSelector((state) => state.recentNoti);
  const currentNoti = useAppSelector((state) => state.currentNoti);

  const getRecentNotis = async () => {
    const docRef = collection(db, "notification");
    const q = query(docRef, orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dispatch(getRecentNoti(doc.data()));
    });
  };

  useEffect(() => {
    getRecentNotis();
  }, []);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.page_info}>
          <div className={styles.page_title}>
            <span className="material-symbols-outlined">campaign</span>
            <h3>{currentNoti ? currentNoti.title : recentNoti.title}</h3>
          </div>
          <div>
            작성자: {currentNoti ? currentNoti.author : recentNoti.author}
          </div>
          <div>
            작성 시각:{" "}
            {currentNoti ? currentNoti.timestamp : recentNoti.timestamp}
          </div>
          <button className={styles.add_btn}>
            <Link to={"/wiki/add"}>등록하기</Link>
          </button>
        </div>
        <div className={styles.divider} />
        <div className={styles.page_content}>
          <div>{currentNoti ? currentNoti.text : recentNoti.text}</div>
        </div>
      </div>
    </>
  );
};

export default Page;
