import React, { useEffect, useState } from "react";
import styles from "./Wiki.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Page from "./Page/Page";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAllNotifications } from "../../store/articles/notificationsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const WikiPage = () => {
  const [currentNoti, setCurrentNoti] = useState(null);
  const dispatch = useAppDispatch();
  // current noti의 정보를 리덕스에서 받아오기

  const getNotis = async () => {
    const notiDocs = await getDocs(collection(db, "notification"));
    const notisData = [];

    notiDocs.forEach((doc) => {
      notisData.push(doc.data());
    });

    dispatch(getAllNotifications(notisData));
  };

  const allNotis = useAppSelector((state) => state.allNotis);
  console.log(allNotis);

  useEffect(() => {
    getNotis();
  }, []);

  const handleGetArticle = (id) => {
    const selectedNoti = allNotis.find((noti) => noti.id === id);
    if (selectedNoti) {
      setCurrentNoti(selectedNoti);
    }
  };

  return (
    <div className={styles.wiki}>
      <Sidebar handleGetArticle={handleGetArticle} />
      <Page currentNoti={currentNoti} />
    </div>
  );
};

export default WikiPage;
