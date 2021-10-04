import { motion } from "framer-motion";

import classes from "./HomeMainImage.module.css";

const whiteVariants = {
  overflow: "hidden",
  hidden: {
    x: "-100vw",
  },
  visible: {
    overflow: "hidden",
    x: 0,
    skew: "-20deg",
    transition: { type: "spring", stiffness: 100, delay: 1 },
  },
};

const purpleVariants = {
  hidden: {
    overflow: "hidden",
    x: "100vw",
  },
  visible: {
    overflow: "hidden",
    x: 0,
    skew: "20deg",
    transition: { type: "spring", stiffness: 100, delay: 1 },
  },
};

const imageVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { type: "tween", delay: 1 },
  },
};

const HomeMainImage = () => {
  return (
    <>
      <motion.div
        className={classes["white-bar"]}
        variants={whiteVariants}
        initial="hidden"
        animate="visible"
      >
        <span
          className={`${classes["bar-text"]} ${classes["bar-text-purple"]}`}
        >
          News
        </span>
      </motion.div>
      <figure className={classes["home-main-figure"]}>
        <motion.img
          src="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
          alt=""
          className={classes["home-main-img"]}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        />
      </figure>
      <motion.div
        className={classes["purple-bar"]}
        variants={purpleVariants}
        initial="hidden"
        animate="visible"
      >
        <span className={`${classes["bar-text"]} ${classes["bar-text-white"]}`}>
          Updates
        </span>
      </motion.div>
    </>
  );
};

export default HomeMainImage;
