import React, { useEffect, useState } from "react";
import styles from "./Page.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useAppDispatch } from "../../../hooks/redux";
import { getRecentNoti } from "../../../store/articles/notificationSlice";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import dayjs from "dayjs";

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);

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

  const handleAddArticle = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.page_info}>
          <div className={styles.page_title}>
            <span className="material-symbols-outlined">campaign</span>
            <h3>{recentNoti.title}</h3>
          </div>
          <div>작성자: {recentNoti.author}</div>
          <div>작성 시각: {recentNoti.timestamp}</div>
          <Link
            to={"/add"}
            className={styles.add_btn}
            onClick={handleAddArticle}
          >
            등록하기
          </Link>
        </div>
        <div className={styles.divider} />
        <div className={styles.page_content}>
          <div className={styles.page_text}>
            {recentNoti.text ? parse(recentNoti.text) : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
