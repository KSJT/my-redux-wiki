import React, { useState } from "react";
import Form from "../../components/form/Form";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/userSlice";

const LoginPage = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        dispatch(
          setUser({
            email: userCredentials.user.email,
            token: userCredentials.user.refreshToken,
            id: userCredentials.user.uid,
          })
        );
        navigate("/");
      })
      .catch(
        (error) =>
          error && setFirebaseError("이메일과 비밀번호를 다시 확인해주세요.")
      );
  };

  return (
    <>
      <div className={styles.login}>
        <div className={styles.form_container}>
          <Form
            title={"Log In"}
            button={"로그인"}
            getDataForm={handleLogin}
            firebaseError={firebaseError}
          />
          <p>
            아이디를 새로 만들까요?
            <Link to="/register">회원가입</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
