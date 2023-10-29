import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import styles from "./BoardPreview.module.scss";

const BoardPreview = () => {
  const [recentBoard, setRecentBoard] = useState({});

  const getRecentBoard = async () => {
    const docRef = collection(db, "board");
    const q = query(docRef, orderBy("timestamp", "asc"), limit(1));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setRecentBoard(doc.data());
    });
  };

  useEffect(() => {
    getRecentBoard();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.board_title}>
        <span className="material-symbols-outlined">assignment</span>
        <div className={styles.board}>Board Update</div>
      </div>
      <div className={styles.title}>{recentBoard.title}</div>
      <div className={styles.text}>{recentBoard.text}</div>
    </div>
  );
};

export default BoardPreview;
