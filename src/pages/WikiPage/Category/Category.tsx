import styles from "./Category.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setCurrentNoti } from "../../../store/articles/currentnoti/CurrentnotiSlice";

interface Noti {
  id: string;
  title: string;
  text: string;
  author: string;
  timestamp: string;
}

const Category = ({ noti }: { noti: Noti }) => {
  const allNotis = useAppSelector((state) => state.allNotis);

  const dispatch = useAppDispatch();

  const handleGetArticle = (noti: Noti) => {
    allNotis.map((item: Noti) => {
      if (item.id === noti.id) {
        dispatch(setCurrentNoti(item));
      }
    });
  };

  return (
    <>
      <li className={styles.noti_list}>
        <span className="material-symbols-outlined">chevron_right</span>
        <h4 onClick={() => handleGetArticle(noti)}>
          {noti.title.substring(0, 13)}
        </h4>
      </li>
    </>
  );
};

export default Category;
