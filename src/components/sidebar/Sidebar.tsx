import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Category from "../../pages/WikiPage/Category/Category";
import { useAppSelector } from "../../hooks/redux";

const Sidebar = ({ handleGetArticle }) => {
  const [isNotiClicked, setIsNotiClicked] = useState(false);
  const allNotis = useAppSelector((state) => state.allNotis);

  function handleClickNoti() {
    setIsNotiClicked(!isNotiClicked);
  }

  return (
    <div className={styles.sidebar_wrapper}>
      <div className={styles.category}>
        <p onClick={handleClickNoti}>공지사항</p>
        <ul className={isNotiClicked ? styles.noti_show : ""}>
          {allNotis.map((noti) => (
            <div key={noti.timestamp}>
              {" "}
              <Category noti={noti} handleGetArticle={handleGetArticle} />
            </div>
          ))}
        </ul>
      </div>
      <div className={styles.category}>
        <p>자유게시판</p>
      </div>
      <div className={styles.category}>
        <p>관리자</p>
      </div>
    </div>
  );
};

export default Sidebar;
