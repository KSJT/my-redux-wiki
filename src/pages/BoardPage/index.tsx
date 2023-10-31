import { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getBoardArticles } from "../../store/articles/boardArticles/boardArticlesSlice";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const BoardPage = () => {
  const dispatch = useAppDispatch();
  const boardArticles = useAppSelector((state) => state.boardArticles);

  const [currentPage, setCurrentPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pinnedArticles, setPinnedArticles] = useState([]);

  // pagination

  const total = boardArticles.length;
  const pageLimit = 7;
  const pages = Math.ceil(total / pageLimit);

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const getDesignatedPage = (index: number) => {
    const start = index * pageLimit;
    const end = start + pageLimit;

    setCurrentPage(boardArticles.slice(start, end));
  };

  // get all board articles

  useEffect(() => {
    getDesignatedPage(pageNumber);
  }, [pageNumber, pinnedArticles]);

  useEffect(() => {
    // Bring pinned articles
    const getPinned = async () => {
      const docRef = collection(db, "board");
      const q = query(
        docRef,
        where("ispinned", "==", true),
        orderBy("timestamp", "asc"),
        limit(3)
      );
      const querySnapshot = await getDocs(q);

      const pinnedData = [];
      querySnapshot.forEach((doc) => {
        pinnedData.push(doc.data());
      });
      setPinnedArticles(pinnedData);

      setPageNumber(0);
    };

    getPinned();

    getAllBoardArticles();
  }, []);

  const getAllBoardArticles = async () => {
    const docRef = collection(db, "board");
    const q = query(docRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    const boardData = [];
    querySnapshot.forEach((doc) => {
      boardData.push(doc.data());
    });
    dispatch(getBoardArticles(boardData));
  };

  // bring pinned articles

  const getPinnedArticles = async () => {
    const docRef = collection(db, "board");
    const q = query(docRef, where("ispinned", "==", true), limit(3));
    const querySnapshot = await getDocs(q);

    const pinnedData = [];
    querySnapshot.forEach((doc) => {
      pinnedData.push(doc.data());
    });
    setPinnedArticles(pinnedData);
  };

  return (
    <div className={styles.board}>
      <div className={styles.pinned_article}>
        <div className={styles.pinned_title}>
          <h3>공유 게시글</h3>
        </div>
        <div className={styles.pinned_items}>
          {pinnedArticles
            ? pinnedArticles.map((item) => (
                <Link
                  to={`${item.id}`}
                  key={item.id}
                  className={styles.pinned_item}
                >
                  <div className={styles.pinned_item_title}>
                    <span className="material-symbols-outlined">push_pin</span>
                    {item.title}
                  </div>
                  <div>{parse(item.text)}</div>
                </Link>
              ))
            : null}
        </div>
      </div>
      <div className={styles.free_board}>
        <div className={styles.free_board_title}>
          <h3>자유 게시판</h3>
          <Link className={styles.add_btn} to={"add"}>
            글쓰기
          </Link>
        </div>

        <div className={styles.item_container}>
          {currentPage.map((item, index) => (
            <Link
              item={item}
              to={`${item.id}`}
              key={item.id}
              className={styles.item}
            >
              <div className={styles.item_content}>
                {/* <p className={styles.item_number}>
                  {boardArticles.length - index + "."}
                </p> */}
                <p>{item.title}</p>
              </div>

              <div className={styles.item_info}>
                <p>{item.author}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.page_direction}>
          {/* pagination */}
          <span>-</span>
          <ul className={styles.pagination_page}>
            {Array.from({ length: pages }, (_, index) => (
              <li
                className={styles.page}
                onClick={() => handlePageChange(index)}
                key={index}
              >
                {index + 1}
              </li>
            ))}
          </ul>
          <span>-</span>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
