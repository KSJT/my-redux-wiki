import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import styles from "./Register.module.scss";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/userSlice";

const RegisterPage = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();

  const handleSignupAndLogin = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        dispatch(
          setUser({
            email: userCredentials.user.email,
            token: userCredentials.user.refreshToken,
            id: userCredentials.user.uid,
          })
        );
        navigate("/");
      })
      .catch((error) => error && setFirebaseError("회원가입에 실패했습니다."));
  };

  return (
    <>
      <div className={styles.signup}>
        <div className={styles.form_container}>
          <Form
            title={"Sign Up"}
            button={"회원가입"}
            getDataForm={handleSignupAndLogin}
            firebaseError={firebaseError}
          />
          <p>
            이미 아이디가 있나요?
            <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
