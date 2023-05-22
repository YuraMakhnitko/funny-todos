import { configureStore } from "@reduxjs/toolkit";
import listsTodosReducer from "./lists/slice";

export const store = configureStore({
  reducer: {
    listsTodos: listsTodosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
