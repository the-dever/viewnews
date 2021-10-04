import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loader from "../../UI/Loader";
import { time } from "../../UI/svgs/icons";
import classes from "./BlogPage.module.css";

const containerVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      delay: 1,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const blogId = localStorage.getItem("blogId");
    const userBlogsRequest = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://task-a3688-default-rtdb.firebaseio.com/${userId}/blogs/${blogId}.json`
        );
        const data = await response.json();
        setLoading(false);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    userBlogsRequest();
  }, []);

  const history = useHistory();

  return (
    <>
      <motion.section
        className={classes["blog-page"]}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading && <Loader />}
        <figure>
          <img src={data.blogPicture} alt="blogPicture" />
        </figure>
        <div>
          {time}
          <p>Date Created: {data.blogDate}</p>
          <p>Date Edited: {data.blogDate}</p>
        </div>
        <h3>{data.blogTitle}</h3>
        <p>{data.blogDescription}</p>
        <p>{data.blogText}</p>
      </motion.section>
      <motion.div
        className={classes["blog-page-bottom"]}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <button onClick={() => history.push("/account/profile")}>
          GO BACK TO PROFILE PAGE
        </button>
      </motion.div>
    </>
  );
};

export default ProfilePage;
