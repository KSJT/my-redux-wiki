import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import parse from "html-react-parser";
import styles from "./BoardPinned.module.scss";
import { Link } from "react-router-dom";

const BoardPinned = () => {
  const [recentPinned, setRecentPinned] = useState({});

  const getPinnedArticle = async () => {
    const docRef = collection(db, "board");
    const q = query(
      docRef,
      where("ispinned", "==", true),
      orderBy("timestamp", "asc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setRecentPinned(doc.data());
    });
  };

  useEffect(() => {
    getPinnedArticle();
  }, []);

  return (
    <div className={styles.pinned_container}>
      <div className={styles.pinned_title}>
        <span className="material-symbols-outlined">push_pin</span>
        Pinned Article
      </div>
      <Link to={`/board/${recentPinned.id}`} className={styles.pinned}>
        <div className={styles.pinned_article_title}>{recentPinned.title}</div>
        <div className={styles.pinned_article_text}>
          {recentPinned.text ? parse(recentPinned.text) : ""}
        </div>
      </Link>
    </div>
  );
};

export default BoardPinned;
