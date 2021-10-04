import { motion } from "framer-motion";
import React from "react";
import classes from "./StocksChart.module.css";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      staggerChildren: 0.4,
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

const StocksChart = (props) => {
  console.log();
  const chartContent = props.content
    .map((c) => ({
      ...c,
      // margin: Math.round(100 * (c.high - c.low)) / 100,
      margin: (100 - (+c.data["3. low"] * 100) / +c.data["2. high"]).toFixed(2),
    }))
    .sort((a, b) => b.margin - a.margin)
    .slice(0, 10);

  const maxMargin = Math.max(...chartContent.map((c) => c.margin));

  return (
    <motion.div
      className={classes["stock-chart-section"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h3 variants={childVariants}>HIGH-LOW-MARGIN (%)</motion.h3>
      <motion.h4 variants={childVariants}>
        {props.showAll ? "2 Months" : "Bi-Weekly"}
      </motion.h4>
      <motion.div
        className={classes["stock-chart-container"]}
        variants={childVariants}
      >
        <motion.div
          className={classes["chart-bar-container"]}
          variants={childVariants}
        >
          {chartContent.map((c, i) => {
            const barFill = Math.round((c.margin / maxMargin) * 100) + "%";
            const cssStyle =
              +c.margin === +maxMargin
                ? { height: barFill, borderRadius: "2rem 2rem 0 0" }
                : { height: barFill };
            return (
              <React.Fragment key={i}>
                <div className={classes["chart-bar"]} variants={childVariants}>
                  <div
                    className={classes["chart-bar-fill"]}
                    style={cssStyle}
                    variants={childVariants}
                  ></div>
                  <p variants={childVariants}>{c.date.slice(5)}</p>
                  <p variants={childVariants}>{c.margin}</p>
                </div>
              </React.Fragment>
            );
          })}
        </motion.div>
      </motion.div>
      <p>* Date is in MM-DD format</p>
      <p>
        * The filled portion represents the margin in relation to the date with
        the highest percentage
      </p>
    </motion.div>
  );
};

export default StocksChart;
