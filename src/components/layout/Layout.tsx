import React, { useEffect, useRef, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import Modal from "../../components/modal/Modal";

const Layout = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  // const [isCheck, setIsCheck] = useState(false);
  // const setModal = useAppSelector((state) => state.modal.isCheck);
  // useEffect(() => {
  //   if (setModal) {
  //     setIsCheck(true);
  //     console.log("setmodal", setModal);
  //   }
  // }, [setModal, isCheck]);

  // const modalRef = useRef(null);
  // useOnClickOutside(modalRef);

  return (
    <div className={styles.layout}>
      {/* {isCheck ? <Modal /> : null} */}
      <Modal />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
