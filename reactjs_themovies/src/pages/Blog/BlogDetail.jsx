import React, { useEffect, useState } from "react";
import BlogCard from "../../components/blog-card/BlogCard";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getApi } from "../../utils/FetchData";

const BlogDetail = () => {
  const { id } = useParams();
  console.log("Param: ", id);

  const [blog, setBlog] = useState();

  useEffect(() => {
    const getBlog = async () => {
      const res = await getApi(`blog/${id}`);
      setBlog(res.data.blog);
    };
    getBlog();
  }, [id]);

  console.log("Blog: ", blog);
  return (
    <div className="h-full mt-[100px] ">
      <div className="lg:flex-row md:flex-col sm:flex-col flex-col gap-5 lg:w-4/5 md:w-full sm:w-ful w-full p-2 mx-auto">
        <div className="fixed p-3 lg:top-1/5 md:top-[40px] sm:top-[40px] top-[40px]"></div>

        <div className="w-[20%] top-1/3"></div>
        <div className="lg:w-[80%] md:w-[100%] sm:w-[100%] w-[100%]">
          <div className="text-center">
            <h1 className="font-bold text-[30px] lg:mt-[20px] md:mt-[100px] sm:mt-[100px] mt-[100px]">
              {blog?.title}
            </h1>
          </div>

          <div className="mt-[20px]">
            <div
              dangerouslySetInnerHTML={{
                __html: blog?.content ? blog.content : "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
