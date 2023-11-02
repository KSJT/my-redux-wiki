import React, { useState } from "react";
import styles from "./BoardAddPage.module.scss";
import ReactQuill from "react-quill";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const BoardAddPage = () => {
  const navigate = useNavigate();
  const author = useAppSelector((state) => state.user.email);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const timestamp = new Date().getTime().toString();
  const id = crypto.randomUUID().toString();

  const handleSubmit = () => {
    const articleData = {
      title,
      text,
      timestamp,
      author,
      id,
      ispinned: false,
    };
    setDoc(doc(db, "board", id), articleData)
      .then(() => {
        alert("등록되었습니다.");
        navigate("/board");
      })
      .catch((error) => {
        console.error("Firebase Firestore 오류:", error);
      });
  };

  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline", "strike", "blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
      ],
    },
  };

  return (
    <div className={styles.page}>
      <div className={styles.input_title}>
        <input
          onChange={(event) => handleChange(event)}
          type="text"
          placeholder="제목"
        />
        <button onClick={handleSubmit}>등록하기</button>
      </div>

      <div className={styles.editor}>
        <ReactQuill
          style={{
            minWidth: "400px",
            width: "700px",
            height: "500px",
            padding: "1rem 3rem 2rem",
            margin: "0 auto",
          }}
          modules={modules}
          value={text}
          onChange={setText}
        />
      </div>
    </div>
  );
};

export default BoardAddPage;
