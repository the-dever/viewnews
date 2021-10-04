import { motion } from "framer-motion";

import classes from "./StocksMainImage.module.css";

const whiteVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    skew: "-20deg",
    transition: { type: "spring", stiffness: 100, delay: 1 },
  },
};

const purpleVariants = {
  hidden: {
    x: "100vw",
  },
  visible: {
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

const StocksMainImage = () => {
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
          Stocks
        </span>
      </motion.div>
      <figure className={classes["stocks-main-figure"]}>
        <motion.img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt=""
          className={classes["stocks-main-img"]}
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

export default StocksMainImage;
