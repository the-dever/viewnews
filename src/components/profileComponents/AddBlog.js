import { useRef } from "react";
import { motion } from "framer-motion";

import classes from "./AddBlog.module.css";

const containerVariants = {
  hidden: { x: "-100vw" },
  visible: {
    x: 0,
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const AddBlog = (props) => {
  const blogImgInputRef = useRef("");
  const blogTitleInputRef = useRef("");
  const blogDescriptionInputRef = useRef("");
  const blogTextInputRef = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://task-a3688-default-rtdb.firebaseio.com/${props.userId}/blogs.json`,
        {
          method: "POST",
          body: JSON.stringify({
            blogPicture: blogImgInputRef.current.value,
            blogTitle: blogTitleInputRef.current.value,
            blogDescription: blogDescriptionInputRef.current.value,
            blogText: blogTextInputRef.current.value,
            blogDate: `${months[new Date().getMonth()]} ${String(
              new Date().getDate()
            ).padStart(2, 0)}, ${new Date().getFullYear()}`,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Something went wrong!");
    } catch (error) {
      console.log(error.message);
    }

    props.addBlogHandler();
  };

  return (
    <motion.div
      className={classes["addblog-container"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <form className={classes["addblog-form"]} onSubmit={submitHandler}>
        <div className={classes["addblog-img"]}>
          <label htmlFor="blog-img">Blog Image</label>
          <input
            type="url"
            id="blog-img"
            required
            placeholder="https://upload.something.jpg"
            ref={blogImgInputRef}
          />
        </div>
        <div className={classes["addblog-title"]}>
          <label htmlFor="blog-title">Blog Title</label>
          <input
            type="text"
            id="blog-title"
            required
            placeholder="My Blog"
            ref={blogTitleInputRef}
          />
        </div>
        <div className={classes["addblog-description"]}>
          <label htmlFor="blog-description">Blog Description</label>
          <textarea
            id="blog-description"
            required
            placeholder="My blog is great"
            ref={blogDescriptionInputRef}
          />
        </div>
        <div className={classes["addblog-text"]}>
          <label htmlFor="blog-text">Blog Text</label>
          <textarea
            id="blog-text"
            required
            placeholder="My blog is great and..."
            ref={blogTextInputRef}
          />
        </div>
        <div className={classes["addblog-actions"]}>
          <button type="button" onClick={props.addBlogHandler}>
            CANCEL
          </button>
          <button type="submit">SAVE</button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddBlog;
