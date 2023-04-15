import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog: (state, action) => {
      return [action.payload, ...state];
    },

    updateAllBlogs: (state, action) => {
      return [...state, action.payload];
    },

    getBlog: (state, action) => {
      return action.payload;
    },

    updateBlog: (state, action) => {
      const blogs = state.filter((item) => action.payload.id !== item._id);

      return [action.payload.newBlog, ...blogs];
    },

    deleteBlog: (state, action) => {
      const blogs = state.filter((item) => action.payload.id !== item._id);

      return blogs;
    },
  },
});
