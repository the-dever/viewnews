import { motion } from "framer-motion";

import classes from "./CurrencyMainImage.module.css";

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

const CurrencyMainImage = () => {
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
          Currency
        </span>
      </motion.div>
      <figure className={classes["currency-main-figure"]}>
        <motion.img
          src="https://images.unsplash.com/photo-1622662124723-5c60aafebd4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
          alt=""
          className={classes["currency-main-img"]}
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

export default CurrencyMainImage;
