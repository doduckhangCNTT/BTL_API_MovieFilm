import React, { useEffect, useState } from "react";
import BlogCard from "../components/blog-card/BlogCard";
import HeroSlide from "../components/hero-slide/HeroSlide";
import blogAction from "../redux/action/blogAction";
import { useDispatch, useSelector } from "react-redux";
import { blogSelector } from "../redux/selector/selector";

const Blog = () => {
  const dispatch = useDispatch();
  const [listBlogs, setListBlogs] = useState([]);

  const { blogs } = useSelector(blogSelector);

  useEffect(() => {
    blogAction.getBlogs(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setListBlogs(blogs);
  }, [blogs]);

  console.log("ListBlogs: ", listBlogs);

  return (
    <div className="">
      <div className="">
        <HeroSlide />
      </div>

      <div className="flex flex-col items-center gap-3">
        {listBlogs.map((blog, index) => {
          return (
            <div key={index} className="w-2/3">
              <p>{blog._id}</p>
              <BlogCard blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
