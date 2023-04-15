import { configureStore } from "@reduxjs/toolkit";
import { blogSlice } from "./reducers/BlogSlice";

const store = configureStore({
  reducer: {
    blogs: blogSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
