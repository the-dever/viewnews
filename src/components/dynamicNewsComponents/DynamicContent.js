import { motion } from "framer-motion";
import Loader from "../../UI/Loader";

import { pen, network, glasses } from "../../UI/svgs/icons";

import classes from "./DynamicContent.module.css";

const containerVariants = {
  hidden: {
    y: "450vh",
  },
  visible: {
    y: 0,
    transition: { delay: 0.5 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const imgSrc =
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const DynamicContent = (props) => {
  if (props.currentPosts.length === 0) props.paginate(1);
  return props.currentPosts.map((data, i) => {
    return (
      <motion.div
        className={classes["dynamic-article-news"]}
        key={i}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          backgroundImage: `linear-gradient(to right, #261c2ce6, #261c2ce6), url(${
            data.multimedia && data.multimedia.length > 0
              ? data.multimedia[0].url
              : imgSrc
          })`,
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      >
        {props.loading && <Loader />}
        <div className={classes["dynamic-title"]}>
          <p>{data.title ? data.title : "Title Not Provided"}</p>
        </div>

        <figure className={classes["dynamic-img"]}>
          <img
            src={
              data.multimedia && data.multimedia.length > 0
                ? data.multimedia[0].url
                : imgSrc
            }
            alt="dynamic-img"
          />
        </figure>

        <div className={classes["dynamic-info-container"]}>
          <p className={classes["dynamic-author"]}>
            {pen} Authoured by <br />
            {data.byline ? data.byline.slice(2) : "Unknown"}
          </p>
          <p className={classes["dynamic-date"]}>
            {network} Published on <br />
            {data.published_date
              ? `${months[new Date(data.published_date).getMonth()]} ${String(
                  new Date(data.published_date).getDate()
                ).padStart(2, 0)}, ${new Date(
                  data.published_date
                ).getFullYear()}`
              : "Not Provided"}
          </p>
        </div>

        <p className={classes["dynamic-content"]}>
          {data.abstract ? data.abstract : "Description Not Provided"}
        </p>

        <p className={classes["dynamic-link-text"]}>
          {glasses} Read more on
          <a
            className={classes["dynamic-link"]}
            href={data.url}
            target="_blank"
            rel="noreferrer"
          >
            New York Times
          </a>
        </p>
      </motion.div>
    );
  });
};

export default DynamicContent;
