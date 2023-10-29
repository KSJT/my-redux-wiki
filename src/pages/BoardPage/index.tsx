import React, { useEffect } from "react";
import styles from "./Board.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { getBoardArticles } from "../../store/articles/boardArticles/boardArticlesSlice";
import { Link } from "react-router-dom";

const BoardPage = () => {
  // 데이터 역순으로 받아와서 allArticles slice 만들기

  const dispatch = useAppDispatch();
  const boardArticles = useAppSelector((state) => state.boardArticles);

  useEffect(() => {
    getAllBoardArticles();
  }, []);

  const getAllBoardArticles = async () => {
    const docRef = collection(db, "board");
    const q = query(docRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    const boardData = [];
    querySnapshot.forEach((doc) => {
      boardData.push(doc.data());
    });
    dispatch(getBoardArticles(boardData));

    console.log(boardData);
  };

  const allArticles = useAppSelector((state) => state.allNotis);
  return (
    <div className={styles.board}>
      <div className={styles.pinned_article}>
        <div className={styles.pinned_title}>
          <h3>공유 게시글</h3>
        </div>
        <div className={styles.pinned_items}>
          <div className={styles.pinned_item}>pinned article</div>
          <div className={styles.pinned_item}>pinned article</div>
          <div className={styles.pinned_item}>pinned article</div>
        </div>
      </div>
      <div className={styles.free_board}>
        <div className={styles.free_board_title}>
          <h3>자유 게시판</h3>
          <Link to={"add"}>글쓰기</Link>
        </div>
        <div className={styles.item_container}>
          {boardArticles.map((item, index) => (
            <Link
              item={item}
              to={`${item.id}`}
              key={item.id}
              className={styles.item}
            >
              <p>
                {boardArticles.length - index + "."} {item.title}
              </p>
              <div className={styles.item_info}>
                <p>{item.author}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.page_direction}>
          <span className="material-symbols-outlined">arrow_back_ios</span>{" "}
          <p>1</p>
          <p>2</p>
          <span className="material-symbols-outlined">
            arrow_forward_ios
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
