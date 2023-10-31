import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Signout from "./Signout";
import Weather from "../../pages/HomePage/weather/Weather";
import { useAppSelector } from "../../hooks/redux";

const Header = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <div className={styles.home_bar}>
        <Link to="/">logo</Link>
        <div className={styles.weather}>
          <div className={styles.weather_wrap}>
            <Weather />
          </div>
        </div>
        <div>{user.email}</div>
        <Signout />
      </div>
      <div className={styles.nav_bar}>
        <Link className={styles.nav_home} to="/">
          Home
        </Link>
        <Link to="/wiki">Wiki</Link>
        <Link to="/board">Board</Link>
      </div>
    </>
  );
};

export default Header;
