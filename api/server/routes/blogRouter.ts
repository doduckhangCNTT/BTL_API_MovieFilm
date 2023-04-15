import express from "express";
import blogCtrl from "../controllers/blogCtrl";

const router = express.Router();

router.post("/blog", blogCtrl.createBlog);

router.get("/blog", blogCtrl.getBlogs);

router.get("/blogs", blogCtrl.getListBlogs);

router.get("/blog/category", blogCtrl.getBlogsCategory);

router.get("/blog/category/:id", blogCtrl.getBlogsRelativeCategory);

router.get("/blog/user/:id", blogCtrl.getBlogsUser);

router.get("/blogsPage", blogCtrl.getBlogsPage);

router
  .route("/blog/:id")
  .get(blogCtrl.getBlog)
  .put(blogCtrl.updateBlog)
  .delete(blogCtrl.deleteBlog);

export default router;
