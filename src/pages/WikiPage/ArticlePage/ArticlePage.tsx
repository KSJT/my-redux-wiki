import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./ArticlePage.module.scss";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { db } from "../../../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Editor from "../Editor/Editor";
import ReWriteEditor from "../Editor/ReWriteEditor";

const ArticlePage = () => {
  const [currentNoti, setCurrentNoti] = useState({});

  const [isEdit, setIsEdit] = useState(false);

  // const currentNoti = useAppSelector((state) => state.currentNoti);
  const { id } = useParams();

  const docRef = doc(db, "notification", `${id}`);

  const getCurrentNoti = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCurrentNoti(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setCurrentNoti(null);
    }
  };

  useEffect(() => {
    getCurrentNoti();
  }, [id]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "notification", `${id}`));
    alert("삭제되었습니다.");
  };

  return (
    <>
      {id && isEdit && (
        <div className={styles.editor_page}>
          {" "}
          <Sidebar />
          <div className={styles.editor}>
            <ReWriteEditor />
          </div>
        </div>
      )}

      {currentNoti ? (
        <div className={styles.article}>
          <Sidebar />
          <div className={styles.page}>
            <div className={styles.page_info}>
              <span className="material-symbols-outlined">campaign</span>
              <h3>{currentNoti.title}</h3>
              <div>작성자: {currentNoti.author}</div>
              <div>작성 시각: {currentNoti.timestamp}</div>
              <div className={styles.article_btn}>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.page_content}>
              <div>{currentNoti.text}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.editor_page}>
          {" "}
          <Sidebar />
          <div className={styles.editor}>
            <Editor />
          </div>
        </div>
      )}
    </>
  );
};

export default ArticlePage;
