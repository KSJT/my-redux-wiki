import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Editor from "../Editor/Editor";
import styles from "./AddPage.module.scss";

const AddPage = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <Editor />
    </div>
  );
};

export default AddPage;
