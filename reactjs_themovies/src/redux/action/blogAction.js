import {
  deleteApi,
  deleteApiUpload,
  getApi,
  postApi,
  putApi,
} from "../../utils/FetchData";
import { blogSlice } from "../reducers/BlogSlice";

const blogAction = {
  createBlog: async (blog, dispatch) => {
    try {
      let data;
      if (typeof blog.thumbnail.url === "string") {
        data = {
          public_id: blog.thumbnail.public_id,
          url: blog.thumbnail.url,
        };
      } else {
        let formData = new FormData();
        formData.append("file", blog.thumbnail.url);
        const resImg = await postApi("upload", formData);
        data = { public_id: resImg.data.public_id, url: resImg.data.url };
      }

      const newBlog = { ...blog, thumbnail: data };
      const res = await postApi("blog", newBlog);

      dispatch(blogSlice.actions.createBlog(res.data));
    } catch (error) {
      console.log(error);
    }
  },

  getBlogs: async (dispatch, search = `?page=${1}`) => {
    try {
      const res = await getApi(`blog`);
      console.log("Res: ", res);

      dispatch(blogSlice.actions.getBlog(res.data));
    } catch (error) {
      console.log(error);
    }
  },

  updateBlog: async (blog, dispatch) => {
    try {
      let data;
      if (typeof blog.thumbnail.url === "string") {
        data = {
          public_id: blog.thumbnail.public_id,
          url: blog.thumbnail.url,
        };
      } else {
        let formData = new FormData();
        formData.append("file", blog.thumbnail.url);
        const resImg = await postApi("upload", formData);
        data = { public_id: resImg.data.public_id, url: resImg.data.url };
      }

      const newBlog = {
        ...blog,
        thumbnail: data,
      };
      dispatch(
        blogSlice.actions.updateBlog({ id: newBlog._id, newBlog: newBlog })
      );
      await putApi(`blog/${newBlog._id}`, newBlog);
    } catch (error) {
      console.log(error);
    }
  },

  deleteBlog: async (blog, dispatch) => {
    try {
      await deleteApiUpload("destroy", { public_id: blog.thumbnail.public_id });

      dispatch(blogSlice.actions.deleteBlog({ id: blog._id ? blog._id : "" }));
      await deleteApi(`blog/${blog._id}`);
    } catch (error) {
      console.log(error);
    }
  },
};

export default blogAction;
