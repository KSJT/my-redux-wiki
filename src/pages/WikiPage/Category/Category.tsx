import React from "react";
import styles from "./Category.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";
import { setCurrentNoti } from "../../../store/articles/currentnoti/CurrentnotiSlice";

const Category = ({ noti }) => {
  const allNotis = useAppSelector((state) => state.allNotis);
  // dispatch current notification // onclick
  // useLocation id
  // allnotis 정보 가지고 있기

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const handleGetArticle = (noti) => {
    allNotis.map((item) => {
      if (item.id === noti.id) {
        dispatch(setCurrentNoti(item));
      }
    });
  };

  return (
    <>
      <li className={styles.noti_list}>
        <span className="material-symbols-outlined">chevron_right</span>
        <h4 onClick={() => handleGetArticle(noti)}>{noti.title}</h4>
      </li>
    </>
  );
};

export default Category;
