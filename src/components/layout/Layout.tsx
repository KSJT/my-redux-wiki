import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

import Modal from "../../components/modal/Modal";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Modal />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
