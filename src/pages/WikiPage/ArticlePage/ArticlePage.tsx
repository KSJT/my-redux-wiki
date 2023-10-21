import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./ArticlePage.module.scss";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const { id } = useParams();
  console.log(id);
  return <div className={styles.page}></div>;
};

export default ArticlePage;
