import React, { useEffect, useRef, useState } from "react";
import blogAction from "../../redux/action/blogAction";
import ReactQuill from "../../components/editor/ReactQuill";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getApi } from "../../utils/FetchData";

const CreateBlog = (id, valueId) => {
  const { blogId } = useParams();

  console.log("BlogId: ", blogId);

  const initialState = {
    title: "",
    content: "",
    description: "",
    // thumbnail: "",
    thumbnail: {
      public_id: "",
      url: "",
    },
    createdAt: new Date().toISOString(),
  };

  const [body, setBody] = useState("");
  const [blog, setBlog] = useState(initialState);
  const [text, setText] = useState("");
  const divRef = useRef(null);
  const dispatch = useDispatch();

  /*
  - Xử lí File
  */
  const handleChangeFile = (e) => {
    const target = e.target;
    const files = target.files;
    if (files) {
      const file = files[0];
      setBlog({ ...blog, thumbnail: { public_id: "", url: file } });
    }
  };

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    // const text = div.innerText;
    const text = body;
    setText(text);
  }, [body]);

  useEffect(() => {
    const getBlog = async () => {
      const res = await getApi(`blog/${blogId}`);
      setBlog(res.data.blog);
      setBody(res.data.blog.content);
    };
    getBlog();
  }, [blogId]);

  /*
  - Xử lí trên các input form
  */
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  /*
  - Xử lí khi submit form
  */
  const handleSubmit = () => {
    const newBlog = { ...blog, content: text };

    // === Thực hiện Update Blog ===
    if (blogId) {
      console.log("UpdateBlog: ", newBlog);
      blogAction.updateBlog(newBlog, dispatch);
    } else {
      blogAction.createBlog(newBlog, dispatch);
    }
  };

  return (
    <div className="flex m-5 w-2/3 mx-auto flex-col gap-5 mt-[150px]">
      <div className="flex gap-3 xl:flex-row md:flex-col-reverse sm:flex-col-reverse xs:flex-col-reverse">
        <div className="xl:w-1/2 md:w-full sm:w-full xs:w-full">
          <form action="" className="flex flex-col gap-5">
            {/* Title Blog */}
            <div className="">
              <div className="flex flex-col gap-3 w-full sm:w-full xs:w-full">
                <h1 className="font-bold text-[20px]">Title Blog</h1>
                <input
                  type="text"
                  className=" p-3 w-full outline-none border-2"
                  placeholder="Title Blog"
                  name="title"
                  value={blog.title}
                  onChange={handleChangeInput}
                />
              </div>
              <small className="flex justify-end">
                {blog.title.length} / 50
              </small>
            </div>

            {/* Description Blog */}
            <div className="">
              <div className="font-bold text-[16px]">
                <h1 className="">Introduce Blog</h1>
                <textarea
                  className="w-full h-[100px] p-3 outline-none border-2 text-black"
                  id=""
                  placeholder="Introduce Blog here..."
                  name="description"
                  value={blog.description}
                  onChange={handleChangeInput}
                ></textarea>
              </div>
              <small className="flex justify-end">
                {blog.description.length} / 100
              </small>
            </div>

            {/* Image Blog  */}
            <div>
              <h1 className="font-bold text-[20px] my-3">Image Blog</h1>
              <input
                type="file"
                className=""
                name="thumbnail"
                accept="image/*"
                onChange={handleChangeFile}
              />
            </div>
          </form>
        </div>

        {/* View Blog */}
        {/* <div className="xl:w-1/2 md:w-full sm:w-full xs:w-full">
          <PreviewBlog blog={blog} />
        </div> */}
      </div>

      {/* Content Blog  */}
      <div>
        <ReactQuill body={body} setBody={setBody} />
        <div
          className="hidden"
          ref={divRef}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <small>{text.length}</small>
      </div>

      <button
        onClick={handleSubmit}
        className="hover:bg-sky-600 hover:text-white w-[200px] mx-auto text-center border-2 inline-block transition text-[20px] rounded px-3 cursor-pointer"
      >
        {blogId ? "Update" : "Create"}
      </button>
    </div>
  );
};

export default CreateBlog;
