import React from "react";
import styles from "./Board.module.scss";
import { useAppSelector } from "../../hooks/redux";

const BoardPage = () => {
  // 데이터 역순으로 받아와서 allArticles slice 만들기

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
          <button>글쓰기</button>
        </div>
        <div className={styles.item_container}>
          {allArticles.map((noti) => (
            <div key={noti.id} className={styles.item}>
              <p>{noti.title}</p>
              <div className={styles.item_info}>
                <p>{noti.author}</p>
              </div>
            </div>
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
