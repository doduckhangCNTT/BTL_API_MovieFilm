import { Request, Response } from "express";
import mongoose from "mongoose";
import NodeCache from "node-cache";
import { IReqAuth } from "../config/interface";
import Blogs from "../models/blogModel";

const PageConfig = (req: Request) => {
  const limit = Number(req.query.limit) * 1 || 3;
  const page = Number(req.query.page) * 1 || 1;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const blogCtrl = {
  getBlogs: async (req: Request, res: Response) => {
    const { limit, skip } = PageConfig(req);

    // const key = req.originalUrl;
    // if (myCache.has(key)) {
    //   const cacheResponseBlogs = await myCache.get(key);
    //   res.json(cacheResponseBlogs);
    // }

    try {
      const blogs = await Blogs.find().sort("-createdAt");
      // const Data = await Blogs.aggregate([
      //   {
      //     $facet: {
      //       totalData: [
      //         {
      //           $lookup: {
      //             from: "users",
      //             let: { user_id: "$user" },
      //             pipeline: [
      //               { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
      //               { $project: { password: 0 } },
      //             ],
      //             as: "user",
      //           },
      //         },
      //         { $unwind: "$user" },

      //         {
      //           $lookup: {
      //             from: "categories",
      //             let: { category_id: "$category" },
      //             pipeline: [
      //               { $match: { $expr: { $eq: ["$_id", "$$category_id"] } } },
      //             ],
      //             as: "category",
      //           },
      //         },
      //         { $unwind: "$category" },

      //         { $sort: { createdAt: -1 } },
      //         { $skip: skip },
      //         { $limit: limit },
      //       ],

      //       totalCount: [{ $count: "count" }],
      //     },
      //   },
      //   {
      //     $project: {
      //       count: { $arrayElemAt: ["$totalCount.count", 0] },
      //       totalData: 1,
      //     },
      //   },
      // ]);

      // const blogs = Data[0].totalData;
      // const count = Data[0].count;

      // let total;
      // if (count % limit === 0) {
      //   total = count / limit;
      // } else {
      //   total = Math.floor(count / limit) + 1;
      // }

      // Neu muon hien thi tong so trang
      // res.json({ blogs, total });
      // myCache.set(key, blogs);
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getListBlogs: async (req: Request, res: Response) => {
    const { limit, skip, page } = PageConfig(req);

    try {
      // const blogs = await Blogs.find().sort("-createdAt");
      const blogs = await Blogs.aggregate([
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 } },
            ],
            as: "user",
          },
        },
        { $unwind: "$user" },

        {
          $lookup: {
            from: "categories",
            let: { category_id: "$category" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$category_id"] } } },
            ],
            as: "category",
          },
        },
        { $unwind: "$category" },
      ]);
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBlogsPage: async (req: IReqAuth, res: Response) => {
    const { skip, limit } = PageConfig(req);
    const key = req.originalUrl;
    if (myCache.has(key)) {
      const cacheResponseBlogsPageSearch = myCache.get(key);
      res.json(cacheResponseBlogsPageSearch);
    }

    try {
      const blogs = await Blogs.find();
      const blogsValue = await Blogs.find()
        .skip(skip)
        .limit(limit)
        .populate("user")
        .populate("category");

      myCache.set(key, { blogs: blogsValue, totalCount: blogs.length });
      res.json({ blogs: blogsValue, totalCount: blogs.length });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  createBlog: async (req: IReqAuth, res: Response) => {
    try {
      const { title, content, description, thumbnail } = req.body;
      let newBlog;

      newBlog = new Blogs({
        title: title,
        content: content,
        description: description,
        thumbnail: thumbnail,
      });
      await newBlog.save();
      res.json({
        ...newBlog,
        msg: "Create Blog successfully",
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBlogsRelativeCategory: async (req: Request, res: Response) => {
    try {
      const Data = await Blogs.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  // convert id: string --> objectId
                  category: new mongoose.Types.ObjectId(req.params.id),
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },

              { $unwind: "$user" },
              { $sort: { createdAt: -1 } },
            ],
            totalCount: [
              {
                $match: {
                  category: new mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            totalData: 1,
            count: { $arrayElemAt: ["$totalCount.count", 0] },
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      res.json({ blogs, count });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBlogsCategory: async (req: Request, res: Response) => {
    const key = req.originalUrl;
    if (myCache.has(key)) {
      const cacheResponseBlogsCategory = await myCache.get(key);
      res.json(cacheResponseBlogsCategory);
    }
    try {
      // const blogs = await Blogs.find().sort("-createdAt");
      const blogs = await Blogs.aggregate([
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 } },
            ],
            as: "user",
          },
        },
        { $unwind: "$user" },

        {
          $lookup: {
            from: "categories",
            let: { category_id: "$category" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$category_id"] } } },
            ],
            as: "category",
          },
        },
        { $unwind: "$category" },

        { $sort: { createdAt: -1 } },

        {
          $group: {
            _id: "$category._id",
            category: { $first: "$category" },
            blogs: { $push: "$$ROOT" },
            count: { $sum: 1 },
          },
        },
      ]);
      myCache.set(key, blogs);
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBlog: async (req: Request, res: Response) => {
    try {
      const blog = await Blogs.findOne({ _id: req.params.id });

      if (!blog)
        return res
          .status(400)
          .json({ success: false, error: "Blog not found" });

      res.json({ success: true, blog });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getBlogsUser: async (req: IReqAuth, res: Response) => {
    const key = req.originalUrl;
    if (myCache.has(key)) {
      const cacheResponseBlogsUser = await myCache.get(key);
      res.json(cacheResponseBlogsUser);
    }
    try {
      const Data = await Blogs.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  user: new mongoose.Types.ObjectId(req.params.id),
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    {
                      $match: { $expr: { $eq: ["$_id", "$$user_id"] } },
                    },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },

              { $unwind: "$user" },
            ],
            totalCount: [
              {
                $match: {
                  user: new mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            totalData: 1,
            count: { $arrayElemAt: ["$totalCount.count", 0] },
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;
      myCache.set(key, { blogs, count });
      res.json({ blogs, count });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateBlog: async (req: IReqAuth, res: Response) => {
    try {
      const newBlog = req.body;
      let blog;
      blog = await Blogs.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        newBlog
      );

      res.json({ success: true, msg: "Update Blog successfully", blog });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateBookMarkBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication 17" });

    try {
      const newBlog = req.body;
      const { classify } = req.body;
      let blog;

      if (classify.toLowerCase() === "create") {
        blog = await Blogs.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user._id,
          },
          newBlog
        );
        if (!blog)
          return res.status(400).json({ msg: "Invalid Authentication 18" });
      } else if (classify.toLowerCase() === "draft") {
        // blog = await DraftBlog.findOneAndUpdate(
        //   {
        //     _id: req.params.id,
        //     user: req.user._id,
        //   },
        //   newBlog
        // );
        // if (!blog)
        //   return res.status(400).json({ msg: "Invalid Authentication 19" });
      }

      res.json({ success: true, msg: "Update Blog successfully", blog });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteBlog: async (req: IReqAuth, res: Response) => {
    let blog;
    try {
      blog = await Blogs.findOneAndDelete({
        _id: req.params.id,
      });
      if (!blog)
        return res.status(400).json({ msg: "Invalid Authentication 21" });

      res.json({ msg: "Delete Blog successfully", blog });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default blogCtrl;
