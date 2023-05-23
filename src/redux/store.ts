import { configureStore } from "@reduxjs/toolkit";
import listsTodosReducer from "./lists/slice";
import soundsReduser from "./sounds/slice";

export const store = configureStore({
  reducer: {
    listsTodos: listsTodosReducer,
    sounds: soundsReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
