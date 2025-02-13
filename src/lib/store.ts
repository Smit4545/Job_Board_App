import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../redux/jobSlice";
import themeReducer from "../redux/themeSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
