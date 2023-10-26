import styles from "./Carousel.module.scss";
import { storage } from "../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

const Carousel = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const id = crypto.randomUUID().toString();

    const storageRef = ref(storage, `${id}`);
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <div>
      {" "}
      <input
        className={styles.file_input}
        onChange={(event) => setFile(event.target.files[0])}
        type="file"
        required
      />
      <button onClick={handleUpload}>눌러</button>
    </div>
  );
};

export default Carousel;
