import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },

    content: {
      type: String,
      require: true,
      minLength: 1000,
    },

    description: {
      type: String,
      require: true,
      trim: true,
      minLength: 10,
      maxLength: 100,
    },

    thumbnail: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("blogs", blogSchema);
