import React from "react";
import { Link } from "react-router-dom";
import Option from "../option/Option";

const BlogCard = ({ blog }) => {
  return (
    <div className="border-2 rounded-lg p-3 my-3">
      <div className="flex justify-end">
        {<Option props={blog ? blog : {}} />}
      </div>
      <div className="flex justify-between mt-2 md:flex-row sm:flex-col-reverse xs:flex-col-reverse">
        {/* Content Blog */}
        <div className={`w-${200} flex flex-col justify-between`}>
          <div className="">
            <Link to={`/detail_blog/${blog?._id}`}>
              <h1 className="font-bold text-[25px]">{blog?.title}</h1>
            </Link>
            <div className="">
              <p className="">{blog?.description}</p>
            </div>
          </div>
          <div>{new Date(blog?.createdAt).toLocaleString()}</div>
        </div>

        {/* Img Blog */}
        <div>
          <div className="flex justify-end">
            <Link to={`/detail_blog/${blog?._id}`}>
              <img
                className="w-[300px]"
                src={blog?.thumbnail?.url + ""}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
