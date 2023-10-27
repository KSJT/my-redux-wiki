import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import Category from "../../pages/WikiPage/Category/Category";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import { notiClicked } from "../../store/articles/categoryClicked/categoryClickedSlice";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getAllNotifications } from "../../store/articles/notificationsSlice";
import { db } from "../../firebase";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const allNotis = useAppSelector((state) => state.allNotis);

  const [isClicked, setIsClicked] = useState(false);
  const openNoti = useAppSelector((state) => state.clickedNoti.isClicked);

  function handleClickNoti() {
    dispatch(notiClicked({ isClicked: !isClicked }));
    setIsClicked(!isClicked);
  }

  const getNotis = async () => {
    const docRef = collection(db, "notification");
    const q = query(docRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);

    const notificationsData = [];
    querySnapshot.forEach((doc) => {
      notificationsData.push(doc.data());
    });
    dispatch(getAllNotifications(notificationsData));
  };

  useEffect(() => {
    getNotis();
  }, []);

  return (
    <div className={styles.sidebar_wrapper}>
      <div className={styles.category}>
        <p onClick={handleClickNoti}>공지사항</p>
        <ul className={openNoti ? styles.noti_show : ""}>
          {allNotis.map((noti) => (
            <Link to={`/wiki/${noti.id}`} key={noti.timestamp}>
              {" "}
              <Category noti={noti} />
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.category}>
        <p>사규 및 사칙</p>
      </div>
      <div className={styles.category}></div>
    </div>
  );
};

export default Sidebar;
