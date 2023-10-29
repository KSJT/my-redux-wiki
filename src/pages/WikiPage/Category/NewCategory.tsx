import React, { useEffect, useState } from "react";
import styles from "./NewCategory.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { collection, query, doc, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import Category from "./Category";
import { Link } from "react-router-dom";
import { getAllSubArticles } from "../../../store/articles/subArticles/subArticles";

const NewCategory = ({ getSubArticleList, category }) => {
  const subArticleList = useAppSelector((state) => state.allSubArticles);
  // console.log(subArticleList);

  return (
    <>
      <div className={styles.category}>
        <p onClick={() => getSubArticleList(category)}>
          {category.name.substring(0, 13)}
        </p>

        <ul className={styles.article}>
          {subArticleList.map((article) => (
            <Link to={`/wiki/${article.id}`} key={article.timestamp}>
              {" "}
              <Category article={article} />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NewCategory;
