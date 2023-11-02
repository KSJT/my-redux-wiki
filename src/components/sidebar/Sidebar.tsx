import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import Category from "../../pages/WikiPage/Category/Category";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import { notiClicked } from "../../store/articles/categoryClicked/categoryClickedSlice";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { getAllNotifications } from "../../store/articles/notificationsSlice";
import { db } from "../../firebase";
import { addNewCategory } from "../../store/articles/newCategory/newCategorySlice";
import NewCategory from "../../pages/WikiPage/Category/NewCategory";
import { setIsEditCategory } from "../../store/articles/newCategory/categoryEditSlice";
import { getAllSubArticles } from "../../store/articles/subArticles/subArticles";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const allNotis = useAppSelector((state) => state.allNotis);
  const allCategories = useAppSelector((state) => state.newCategories);

  const [isClicked, setIsClicked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const openNoti = useAppSelector((state) => state.clickedNoti.isClicked);

  function handleClickNoti() {
    dispatch(notiClicked({ isClicked: !isClicked }));
    setIsClicked(!isClicked);
  }

  const getNotis = async () => {
    const docRef = collection(db, "공지사항");
    const q = query(docRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);

    const notificationsData: any = [];
    querySnapshot.forEach((doc) => {
      notificationsData.push(doc.data());
    });
    dispatch(getAllNotifications(notificationsData));
  };

  useEffect(() => {
    Promise.all([getNotis(), getCategories()])
      .then(([notificationsData, categories]) => {
        dispatch(getAllNotifications(notificationsData));
        dispatch(addNewCategory(categories));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // bring new categories

  const getCategories = async () => {
    const docRef = collection(db, "others");
    const q = query(docRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);

    const categories: any = [];
    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    dispatch(addNewCategory(categories));
  };

  // add categories

  const handleChangeCategoryName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(event.target.value);
  };

  const handleEditCategory = () => {
    setIsEdit(!isEdit);
    dispatch(setIsEditCategory(!isEdit));
  };

  const addCategory = async () => {
    console.log("addCategory");
    const id = crypto.randomUUID().toString();
    const timestamp = new Date().getTime();
    const category = {
      id: id,
      name: categoryName,
      timestamp: timestamp,
    };
    await setDoc(doc(db, "others", id), category)
      .then(() => {
        console.log("Document successfully written!");
        setIsAdd(!isAdd);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const getSubArticleList = async (category: any) => {
    const docRef = collection(db, category.name);
    const querySnapshot = await getDocs(docRef);

    const articleData: any = [];
    querySnapshot.forEach((doc) => {
      articleData.push(doc.data());
    });
    dispatch(getAllSubArticles(articleData));
  };

  return (
    <div className={styles.sidebar_wrapper}>
      {/* preset notification category */}
      <div className={styles.category}>
        <p onClick={handleClickNoti}>공지사항</p>
        <ul className={openNoti ? styles.noti_show : ""}>
          {allNotis.map((noti: any) => (
            <Link to={`/wiki/${noti.id}`} key={noti.timestamp}>
              {" "}
              <Category noti={noti} />
            </Link>
          ))}
        </ul>
      </div>

      {/* bring other category */}
      <div>
        {allCategories
          ? allCategories.map((category: any) => (
              <NewCategory
                getSubArticleList={() => getSubArticleList(category)}
                key={category.id}
                category={category}
              />
            ))
          : null}
      </div>
      {/* add category input set */}

      {isAdd ? (
        <div className={styles.add_category_container}>
          <input
            onChange={handleChangeCategoryName}
            className={styles.add_category_input}
            type="text"
          />
          <button onClick={addCategory}>+</button>
        </div>
      ) : null}

      {/* add category trigger */}

      {isEdit && !isAdd ? (
        <div className={styles.edit_btn}>
          <span
            onClick={() => setIsAdd(!isAdd)}
            className="material-symbols-outlined"
          >
            add_circle
          </span>
        </div>
      ) : null}

      {/* edit category button */}
      <div>
        <button className={styles.admin_editor}>
          <span
            onClick={handleEditCategory}
            className="material-symbols-outlined"
          >
            build_circle
          </span>{" "}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
