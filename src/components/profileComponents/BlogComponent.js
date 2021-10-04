import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { HelperContext } from "../../context/helper-context";
import { DataContext } from "../../context/data-context";
import { remove } from "../../UI/svgs/icons";

import classes from "./BlogComponent.module.css";
import AddBlog from "./AddBlog";
import Loader from "../../UI/Loader";

const containerVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      delay: 1,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const childVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const BlogComponent = (props) => {
  const [isAddBlog, setIsAddBlog] = useState(null);
  const [viewAll, setViewAll] = useState(null);

  const helperCtx = useContext(HelperContext);
  const dataCtx = useContext(DataContext);

  const { userBlogsRequest } = props;
  useEffect(() => {
    userBlogsRequest();
  }, [userBlogsRequest]);

  const addBlogHandler = useCallback(
    () => setIsAddBlog(!isAddBlog),
    [isAddBlog]
  );

  const linkClickHandler = (e) => {
    helperCtx.scrollToSection(window, 0, 0);
    dataCtx.blogDataTransporter(e.target.id);
  };

  const viewAllHandler = () => setViewAll(!viewAll);

  if (!props.userBlogs) return <Loader />;

  const deleteHandler = async (e) => {
    const userId = localStorage.getItem("userId");
    const id = e.target.closest("button").id;
    console.log(id);

    await fetch(
      `https://task-a3688-default-rtdb.firebaseio.com/${userId}/blogs/${id}.json`,
      {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  };

  const content = viewAll ? props.userBlogs : props.userBlogs.slice(0, 4);

  return (
    <motion.div
      className={classes["blogs-container"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3>MY BLOGS</h3>
      <div className={classes["btn-add"]}>
        {!isAddBlog && <button onClick={addBlogHandler}>ADD BLOG</button>}
      </div>
      {!isAddBlog && (
        <p className={classes["refresh-message"]}>
          You might have to refresh the page to reflect changes
        </p>
      )}

      {isAddBlog && (
        <AddBlog addBlogHandler={addBlogHandler} userId={props.userId} />
      )}

      {!isAddBlog &&
        content &&
        content.map((data, i) => (
          <motion.div
            key={i}
            className={classes["blog-container"]}
            variants={childVariants}
          >
            <button id={data.blogId} onClick={deleteHandler}>
              {remove}
            </button>
            <figure>
              <img src={data.blogPicture} alt="blog" />
            </figure>
            <div>
              <h4>
                {data.blogTitle.length > 50
                  ? `${data.blogTitle.slice(0, 50)}...`
                  : data.blogTitle}
              </h4>
            </div>
            <p>
              {data.blogDescription.length > 100
                ? `${data.blogDescription.slice(0, 100)}...`
                : data.blogDescription}
            </p>
            <p>{`${data.blogText.slice(0, 200)}...`}</p>
            <Link
              to={`myblogs_${data.blogTitle.split(" ").join("_")}`}
              id={data.blogId}
              onClick={linkClickHandler}
            >
              View full Blog
            </Link>
          </motion.div>
        ))}
      <div className={classes["btn-load-all"]}>
        {!isAddBlog && props.userBlogs.length > 4 && (
          <button onClick={viewAllHandler}>
            {!viewAll ? "LOAD ALL BLOGS" : "HIDE SOME BLOGS"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default BlogComponent;
