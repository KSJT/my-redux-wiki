import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import styles from "./BoardPreview.module.scss";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const BoardPreview = () => {
  const [recentBoard, setRecentBoard] = useState<any>({});

  const getRecentBoard = async () => {
    const docRef = collection(db, "board");
    const q = query(docRef, orderBy("timestamp", "desc"), limit(1));
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
      <div>
        <div className={styles.board_title}>
          <span className="material-symbols-outlined">assignment</span>
          <div className={styles.board}>Board Update</div>
        </div>{" "}
      </div>

      <Link to={`/board/${recentBoard.id}`} className={styles.board_content}>
        <div className={styles.title}>{recentBoard.title}</div>
        <div className={styles.text}>
          {recentBoard.text ? parse(recentBoard.text) : ""}
        </div>
      </Link>
    </div>
  );
};

export default BoardPreview;
