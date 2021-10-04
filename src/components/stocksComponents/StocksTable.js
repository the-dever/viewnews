import { motion } from "framer-motion";
import { useContext } from "react";
import { HelperContext } from "../../context/helper-context";
import classes from "./StocksTable.module.css";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const StocksTable = (props) => {
  const helperCtx = useContext(HelperContext);
  return (
    <>
      <motion.div
        className={classes["stocks-chart-main"]}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>Date</p>
        <p>Open</p>
        <p>High</p>
        <p>Low</p>
        <p>Close</p>
        <p className={classes["stocks-chart-main-volume"]}>Volume</p>
      </motion.div>
      {props.content.map((a, i) => (
        <motion.div
          className={classes["stocks-chart-child"]}
          key={i}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.p variants={childVariants}>
            {a.date ? a.date : "N/A"}
          </motion.p>
          <motion.p variants={childVariants}>
            {a.data["1. open"] ? (+a.data["1. open"]).toFixed(2) : "N/A"}
          </motion.p>
          <motion.p
            variants={childVariants}
            className={classes["stocks-chart-high"]}
          >
            {a.data["2. high"] ? (+a.data["2. high"]).toFixed(2) : "N/A"}
          </motion.p>
          <motion.p
            variants={childVariants}
            className={classes["stocks-chart-low"]}
          >
            {a.data["3. low"] ? (+a.data["3. low"]).toFixed(2) : "N/A"}
          </motion.p>
          <motion.p
            variants={childVariants}
            className={
              classes[
                `${
                  a.data["1. open"] > a.data["4. close"]
                    ? "stocks-chart-close-red"
                    : "stocks-chart-close-green"
                }`
              ]
            }
          >
            {a.data["4. close"] ? (+a.data["4. close"]).toFixed(2) : "N/A"}
          </motion.p>
          <motion.p
            variants={childVariants}
            className={classes["stocks-chart-volume"]}
          >
            {a.data["6. volume"]
              ? helperCtx.formatter(`${a.data["6. volume"]}.0`).slice(0, -2)
              : 0}
          </motion.p>
        </motion.div>
      ))}
    </>
  );
};

export default StocksTable;
