import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getAllNotifications } from "../../../store/articles/notificationsSlice";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Carousel = () => {
  // carousel width

  const width = (window.innerWidth * 60) / 100;

  // to get carousel image urls

  interface AllNotis {
    author: string;
    id: string;
    title: string;
    text: string;
    url: string;
    timestamp: number;
  }

  const allNotis: AllNotis[] = useAppSelector((state) => state.allNotis);

  const dispatch = useAppDispatch();
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
    }, 10000);

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
    transform: `translateX(${-currentIndex * width}px)`,
    transition: `transform 0.5s ease-in-out`,
    width: `${allNotis.length * width}px`,
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
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: `${width}px`,
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${allNotis[index].url})`,
  });

  const topContainerStyle = {
    height: "100%",
    width: `${width}px`,
  };

  const backdropStyle: any = {
    position: "absolute",
    top: "70%",
    width: `${width}px`,
    height: "30%",
    opacity: "0.5",
    backgroundColor: "white",
    borderRadius: "30px",
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div style={topContainerStyle}>
          <div
            style={carouselContainerStyle}
            className={styles.carousel_container}
            ref={carouselRef}
          >
            {allNotis.map((noti: any, index) => (
              <div key={noti.id}>
                <div style={carouselStyle(index)}></div>
                <div style={backdropStyle}></div>
                <Link
                  to={`/wiki/${noti.id}`}
                  className={styles.carousel_content}
                >
                  <h3>{noti.title}</h3>
                  <div className={styles.carousel_text}>
                    {parse(noti.text.substring(0, 30))}
                  </div>
                </Link>
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
