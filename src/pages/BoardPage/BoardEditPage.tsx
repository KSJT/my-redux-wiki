import React, { useEffect, useState } from "react";
import styles from "./BoardEditPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref } from "firebase/storage";
import ReactQuill from "react-quill";

const BoardEditPage = () => {
  const navigate = useNavigate();
  const author = useAppSelector((state) => state.user.email);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ispinned, setIspinned] = useState(false);

  // get original data

  const [originalTimestamp, setOriginalTimestamp] = useState("");

  useEffect(() => {
    getOriginData();
  }, []);

  const getOriginData = async () => {
    const docRef = doc(db, "board", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setOriginalTimestamp(docSnap.data().timestamp);
      setText(docSnap.data().text);
      setTitle(docSnap.data().title);
      setIspinned(docSnap.data().ispinned);
    } else {
      console.log("No such document!");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // upload and change the data

  const handleSubmit = async () => {
    try {
      await setDoc(doc(db, "board", `${id}`), {
        title,
        text,
        timestamp: originalTimestamp,
        id,
        author,
        ispinned,
      }).then((res) => alert("등록되었습니다."));
    } catch (error) {
      console.log(error);
    }

    navigate("/board");
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
    <div className={styles.board_editPage}>
      <div className={styles.page}>
        <div className={styles.input_title}>
          <input
            onChange={(event) => handleTitleChange(event)}
            type="text"
            value={title}
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
    </div>
  );
};

export default BoardEditPage;
