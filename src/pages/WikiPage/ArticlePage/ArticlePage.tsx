import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./ArticlePage.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import parse from "html-react-parser";
import { ref, deleteObject } from "firebase/storage";

const ArticlePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [currentNoti, setCurrentNoti] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);

  const docRef = doc(db, "공지사항", `${id}`);
  const getCurrentNoti = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCurrentNoti(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getCurrentNoti();
  }, [id]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async (): Promise<void> => {
    console.log(id);
    const desertRef = ref(storage, `공지사항/${id}`);

    await deleteObject(desertRef)
      .then(() => {})
      .catch((error) => {
        console.log("Error removing document: ", error);
      });

    await deleteDoc(doc(db, "공지사항", `${id}`));

    navigate("/wiki");
  };

  return (
    <>
      <div className={styles.article}>
        <Sidebar />
        <div className={styles.page}>
          <div className={styles.page_info}>
            <div className={styles.page_title}>
              <span className="material-symbols-outlined">campaign</span>
              <h3>{currentNoti.title}</h3>
            </div>

            <p>작성자: {currentNoti.author}</p>
            <p>작성 시각: {currentNoti.timestamp}</p>
            <div className={styles.article_btn}>
              <Link to={`/edit/${id}`} onClick={handleEdit}>
                수정
              </Link>
              <button onClick={handleDelete}>삭제</button>
            </div>
          </div>

          <div className={styles.divider} />
          <div className={styles.article_img_container}>
            <img
              className={styles.article_img}
              src={currentNoti.url}
              alt="currentNoti-img"
            />
          </div>
          <div className={styles.page_content}>
            <div className={styles.page_text}>
              {currentNoti.text ? parse(currentNoti.text) : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
