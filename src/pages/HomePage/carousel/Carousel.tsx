import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getAllNotifications } from "../../../store/articles/notificationsSlice";
import parse from "html-react-parser";

const Carousel = () => {
  // to get carousel image urls
  const allNotis = useAppSelector((state) => state.allNotis);
  const dispatch = useAppDispatch();
  const getNotis = async () => {
    const docRef = collection(db, "notification");
    const q = query(docRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);

    const notificationsData = [];
    querySnapshot.forEach((doc) => {
      notificationsData.push(doc.data());
    });
    dispatch(getAllNotifications(notificationsData));
  };

  useEffect(() => {
    getNotis();
  }, []);

  // carousel slider index
  const docRef = useRef<number | null>(null);
  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === allNotis.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (docRef.current !== null) {
      clearTimeout(docRef.current);
    }
    docRef.current = window.setTimeout(() => {
      goToNext();
    }, 3000);

    return () => {
      if (docRef.current !== null) {
        clearTimeout(docRef.current);
      }
    };
  }, [goToNext]);

  type GoToCarouselFunction = (pageIndex: number) => void;

  const goToCarousel: GoToCarouselFunction = (pageIndex) => {
    setCurrentIndex(pageIndex);
  };

  const carouselContainerStyle = {
    transform: `translateX(${-currentIndex * 700}px)`,
    transition: `transform 0.5s ease-in-out`,
    width: `${allNotis.length * 700}px`,
  };

  interface CarouselStyleProps {
    backgroundSize: string;
    backgroundPosition: string;
    width: string;
    height: string;
    backgroundRepeat: string;
    backgroundImage: string;
  }

  const carouselStyle = (index: number): CarouselStyleProps => ({
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "700px",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${allNotis[index].url})`,
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.top_container}>
          <div
            style={carouselContainerStyle}
            className={styles.carousel_container}
            ref={carouselRef}
          >
            {allNotis.map((noti, index) => (
              <div key={noti.id}>
                <div style={carouselStyle(index)}>
                  <div className={styles.carousel_backdrop}></div>
                </div>
                <div className={styles.carousel_content}>
                  <div>{noti.title}</div>
                  <div>{parse(noti.text)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.btn_box}>
          {allNotis.map((noti, pageIndex) => (
            <div
              onClick={() => goToCarousel(pageIndex)}
              key={noti.id}
              className={styles.dots}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
