import React, { useEffect, useState } from "react";
import styles from "./BoardArticlePage.module.scss";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BoardArticlePage = () => {
  const { id } = useParams();

  const [article, setArticle] = useState({});

  const docRef = doc(db, "board", `${id}`);
  const getArticle = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setArticle(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getArticle();
  }, [id]);

  return (
    <div className={styles.page}>
      <div>
        <div>{article.title}</div>
        <div>{article.author}</div>
        <div>{article.timestamp}</div>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>

        <div>{article.text}</div>
      </div>
    </div>
  );
};

export default BoardArticlePage;
