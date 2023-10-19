import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Signout from "./Signout";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className={styles.home_bar}>
        <Link to="/">
          logo
          <img src="" alt="" />
        </Link>
        <div className={styles.weather}>weather</div>
        <div>{user.email}</div>
        <Signout />
      </div>
      <div className={styles.nav_bar}>
        <Link className={styles.nav_home} to="/">
          Home
        </Link>
        <Link to="/wiki">Wiki</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
    </>
  );
};

export default Header;
