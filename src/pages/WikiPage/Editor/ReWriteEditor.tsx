import { useEffect, useState } from "react";
import styles from "./ReWriteEditor.module.scss";
import ReactQuill from "react-quill";
import { db, storage } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import Sidebar from "../../../components/sidebar/Sidebar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import parse from "html-react-parser";

const ReWriteEditor = () => {
  const navigate = useNavigate();

  const author = useAppSelector((state) => state.user.email);

  const [title, setTitle] = useState("");
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  // get original data

  const [originalTimestamp, setOriginalTimestamp] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  useEffect(() => {
    getOriginData();
  }, []);

  const getOriginData = async () => {
    const docRef = doc(db, "공지사항", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setOriginalTimestamp(docSnap.data().timestamp);
      setOriginalUrl(docSnap.data().url);
      setText(docSnap.data().text);
      setTitle(docSnap.data().title);
    } else {
      console.log("No such document!");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // upload and change the data

  const { id } = useParams();

  const handleSubmit = async () => {
    if (!file) {
      try {
        await setDoc(doc(db, "공지사항", `${id}`), {
          title,
          text,
          timestamp: originalTimestamp,
          id,
          author,
          url: originalUrl,
        }).then((res) => alert("등록되었습니다."));
      } catch (error) {
        console.log(error);
      }

      navigate("/wiki");
    } else {
      try {
        const storageRef = ref(storage, `공지사항/${id}`);

        await uploadBytes(storageRef, file).then((snapshot) => {
          console.log("Uploaded a blob or file!");

          getDownloadURL(storageRef)
            .then((url) => {
              const notificationData = {
                title,
                text,
                timestamp: originalTimestamp,
                author,
                url,
                id,
              };
              setDoc(doc(db, "공지사항", `${id}`), notificationData)
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  // quill custom

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
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
              value={title}
              onChange={(event) => handleTitleChange(event)}
            />
            <button onClick={handleSubmit}>등록하기</button>
          </div>
          <div className={styles.file_input}>
            <input
              type="file"
              required
              onChange={(event) => handleFileChange(event)}
            />
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
            value={text}
            onChange={setText}
          />
        </div>
      </div>
    </>
  );
};

export default ReWriteEditor;
