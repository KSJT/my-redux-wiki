import React, { useEffect, useState } from "react";
import styles from "./Wiki.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Page from "./Page/Page";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAllNotifications } from "../../store/articles/notificationsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const WikiPage = () => {
  const dispatch = useAppDispatch();
  // current noti의 정보를 리덕스에서 받아오기

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
    <div className={styles.wiki}>
      <Sidebar />
      <Page />
    </div>
  );
};

export default WikiPage;
