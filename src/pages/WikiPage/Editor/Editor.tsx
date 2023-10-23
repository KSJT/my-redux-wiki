import React, { useState } from "react";
import ReactQuill from "react-quill";
import styles from "./Editor.module.scss";
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAppSelector } from "../../../hooks/redux";

const Editor = () => {
  const author = useAppSelector((state) => state.user.email);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleSubmit = async () => {
    const timestamp = new Date().getTime().toString();
    const id = crypto.randomUUID().toString();

    try {
      await setDoc(doc(db, "notification", `${id}`), {
        title: title,
        text,
        timestamp,
        id,
        author,
      }).then((res) => alert("등록되었습니다."));
    } catch (error) {
      console.log(error);
    }
  };

  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline"],
      ],
    },
  };

  return (
    <div>
      <div className={styles.editor_title}>
        <input type="text" placeholder="제목" onChange={handleTitleChange} />
        <button onClick={handleSubmit}>등록하기</button>
      </div>
      <ReactQuill
        style={{
          minWidth: "500px",
          width: "700px",
          height: "600px",
          padding: "1rem 3rem 5rem",
        }}
        modules={modules}
        onChange={setText}
      />
    </div>
  );
};

export default Editor;
