import React, { useEffect } from "react";
import styles from "./Page.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useAppDispatch } from "../../../hooks/redux";
import { getRecentNoti } from "../../../store/articles/notificationSlice";
import { db } from "../../../firebase";

const Page = ({ currentNoti }) => {
  const dispatch = useAppDispatch();
  const recentNoti = useAppSelector((state) => state.recentNoti);

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

  // current noti의 정보를 리덕스에서 가져오기

  return (
    <>
      <div className={styles.page}>
        <div className={styles.page_info}>
          <span className="material-symbols-outlined">campaign</span>
          <h3>{currentNoti ? currentNoti.title : recentNoti.title}</h3>
          <div>
            작성자: {currentNoti ? currentNoti.author : recentNoti.author}
          </div>
          <div>
            작성 시각:{" "}
            {currentNoti ? currentNoti.timestamp : recentNoti.timestamp}
          </div>
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
