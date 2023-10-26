import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import styles from "./Signout.module.scss";

const Signout = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        alert("출근 기록이 사라집니다.");
        dispatch(removeUser());
        localStorage.removeItem("timestamp");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button className={styles.button} onClick={handleSignout}>
      Log out
    </button>
  );
};

export default Signout;
