import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import modalReducer from "./modal/modalSlice";
import commuteReducer from "./commute/commuteSlice";
import notificationReducer from "./articles/notificationSlice";
import notificationsReducer from "./articles/notificationsSlice";
import currentnotiReducer from "./articles/currentnoti/CurrentnotiSlice";
import clickednotiReducer from "./articles/categoryClicked/categoryClickedSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    commute: commuteReducer,
    recentNoti: notificationReducer,
    allNotis: notificationsReducer,
    currentNoti: currentnotiReducer,
    clickedNoti: clickednotiReducer,
  },
});

// root type 만들기

// type RootState = ReturnType<() => string>;
// 유틸리티 타입 : 반환하는 타입을 타입으로 가진다
// store.getState() : 모든 스테이트가 들어있다

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
