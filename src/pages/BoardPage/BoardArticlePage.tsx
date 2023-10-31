import React, { useEffect, useState } from "react";
import styles from "./BoardArticlePage.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import parse from "html-react-parser";

const BoardArticlePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [article, setArticle] = useState({});
  const [pinned, setPinned] = useState(false);

  const docRef = doc(db, "board", `${id}`);
  const getArticle = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setArticle(docSnap.data());
      setPinned(docSnap.data().ispinned);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getArticle();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "board", `${id}`)).then(() => {
      alert("게시글이 삭제되었습니다.");
      navigate("/board");
    });
  };

  const handlePin = () => {
    setPinned(!pinned);
    const pinnedArticle = { ...article, ispinned: !pinned };
    setDoc(doc(db, "board", `${id}`), pinnedArticle)
      .then(() => {})
      .catch((error) => {
        console.error("Firebase Firestore 오류:", error);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.article_top_container}>
        <div className={styles.article_top}>
          <div className={styles.article_title_box}>
            <h2 className={styles.article_title}>{article.title}</h2>

            {/* pin */}
            <button
              className={pinned ? styles.pinned : styles.unpinned}
              onClick={handlePin}
            >
              <span className="material-symbols-outlined">push_pin</span>
            </button>
          </div>

          <div className={styles.title_info}>
            <button className={styles.back_btn} onClick={() => history.back()}>
              <span className="material-symbols-outlined">
                arrow_back_ios_new
              </span>
              뒤로 가기
            </button>
            <div>작성자: {article.author}</div>
            <div>작성 시각: {article.timestamp}</div>
          </div>
        </div>
        <div className={styles.btn_box}>
          <button className={styles.edit_btn}>
            <Link to={`/board/edit/${id}`}>수정</Link>
          </button>
          <button onClick={() => handleDelete()}>삭제</button>
        </div>
      </div>

      <div className={styles.divider} />
      <div className={styles.article_content}>
        {article.text ? parse(article.text) : ""}
      </div>
    </div>
  );
};

export default BoardArticlePage;
