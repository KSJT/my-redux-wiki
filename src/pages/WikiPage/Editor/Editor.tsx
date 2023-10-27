import { useState } from "react";
import ReactQuill from "react-quill";
import styles from "./Editor.module.scss";
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAppSelector } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../firebase";
import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";

const Editor = () => {
  const navigate = useNavigate();
  const author = useAppSelector((state) => state.user.email);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const timestamp = new Date().getTime().toString();
  const id = crypto.randomUUID().toString();

  const handleUpload = async () => {
    try {
      if (file) {
        const storageRef = ref(storage, `notification/${id}`);

        await uploadBytes(storageRef, file).then((snapshot) => {
          console.log("Uploaded a blob or file!");

          getDownloadURL(storageRef)
            .then((url) => {
              setUrl(url);

              const notificationData = {
                title,
                text,
                timestamp,
                author,
                url,
                id,
              };
              setDoc(doc(db, "notification", id), notificationData)
                .then(() => {
                  alert("등록되었습니다.");
                  navigate("/wiki");
                })
                .catch((error) => {
                  console.error("Firebase Firestore 오류:", error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        alert("파일을 선택해주세요.");
      }
    } catch (error) {
      console.log(error);
    }
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
      <div className={styles.form_container}>
        <div className={styles.editor_title}>
          <div className={styles.title}>
            <input
              className={styles.title_input}
              type="text"
              required
              placeholder="제목"
              onChange={(event) => handleTitleChange(event)}
            />
          </div>
          <div className={styles.btn_container}>
            <button onClick={handleUpload}>등록하기</button>
          </div>
        </div>{" "}
        <input
          className={styles.file_input}
          type="file"
          required
          onChange={(event) => setFile(event.target.files[0])}
        />
        <div className={styles.editor}>
          <ReactQuill
            style={{
              minWidth: "500px",
              width: "700px",
              height: "600px",
              padding: "1rem 3rem 2rem",
              margin: "0 2rem",
            }}
            modules={modules}
            value={text}
            onChange={setText}
          />
        </div>{" "}
      </div>
    </>
  );
};

export default Editor;
