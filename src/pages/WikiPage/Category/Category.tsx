import React from "react";
import styles from "./Category.module.scss";

const Category = ({ noti, handleGetArticle }) => {
  // dispatch current notification // onclick
  // allnotis 정보 가지고 있기
  return (
    <>
      <li className={styles.noti_list}>
        <span className="material-symbols-outlined">chevron_right</span>
        <h4 onClick={() => handleGetArticle(noti.id)}>{noti.title}</h4>
      </li>
    </>
  );
};

export default Category;
