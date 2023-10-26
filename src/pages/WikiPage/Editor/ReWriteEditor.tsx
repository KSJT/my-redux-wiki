import React, { useEffect, useState } from "react";
import styles from "./ReWriteEditor.module.scss";
import ReactQuill from "react-quill";
import { db } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import Sidebar from "../../../components/sidebar/Sidebar";

const ReWriteEditor = () => {
  const navigate = useNavigate();

  const author = useAppSelector((state) => state.user.email);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [originalTimestamp, setOriginalTimestamp] = useState("");

  useEffect(() => {
    getOriginData();
  }, []);

  const getOriginData = async () => {
    const docRef = doc(db, "notification", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setOriginalTimestamp(docSnap.data().timestamp);
    } else {
      console.log("No such document!");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const { id } = useParams();

  const handleSubmit = async () => {
    try {
      await setDoc(doc(db, "notification", `${id}`), {
        title,
        text,
        timestamp: originalTimestamp,
        id,
        author,
      }).then((res) => alert("등록되었습니다."));
    } catch (error) {
      console.log(error);
    }

    navigate("/wiki");
  };

  const modules = {
    toolbar: {
      container: [
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline", "strike", "blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
      ],
    },
  };

  return (
    <>
      <div className={styles.page}>
        <Sidebar />
        <div>
          <div className={styles.editor_title}>
            <input
              type="text"
              placeholder="제목"
              onChange={(event) => handleTitleChange(event)}
            />
            <button onClick={handleSubmit}>등록하기</button>
          </div>

          <ReactQuill
            style={{
              minWidth: "500px",
              width: "700px",
              height: "600px",
              padding: "1rem 3rem 5rem",
              margin: "1rem",
            }}
            modules={modules}
            onChange={setText}
          />
        </div>
      </div>
    </>
  );
};

export default ReWriteEditor;
