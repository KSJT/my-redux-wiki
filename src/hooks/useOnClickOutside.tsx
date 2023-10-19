import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { setModal } from "../store/modal/modalSlice";

export default function useOnClickOutside(ref) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      dispatch(setModal({ isCheck: false }));
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, [ref]);
}
