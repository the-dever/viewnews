import { motion } from "framer-motion";
import { useState } from "react";
import classes from "./WeatherWeekly.module.css";

const WeatherWeekly = (props) => {
  const [is14, setIs14] = useState(null);
  const [isShowWeekly, setIsShowWeekly] = useState(true);

  const weeklyButtonHandler = () => {
    setIs14(!is14);
    setIsShowWeekly(!isShowWeekly);
  };

  const content = is14
    ? props.forecastData.days
    : props.forecastData.days.slice(0, 7);

  const containerVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 150, delay: 0.5 },
    },
    exit: {
      scale: 0,
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className={classes["weather-weekly-container"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={classes["weather-weekly-action"]}>
        <h4>{isShowWeekly ? "Weekly" : "Bi-Weekly"}</h4>
        <button onClick={weeklyButtonHandler}>
          {isShowWeekly ? "Show Bi-Weekly" : "Show Weekly"}
        </button>
      </div>
      <div className={classes["weather-weekly-main-container"]}>
        {content.map((data, i) => {
          return (
            <div className={classes["weather-weekly-main"]} key={i}>
              <div className={classes["weather-weekly-icon"]}>
                <img
                  src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
                  alt="icon"
                />
                <p>{data.temp ? Math.round(data.temp) : 0}°C</p>
              </div>
              <div className={classes["weather-weekly-temperature"]}>
                <p>Max {data.tempmax ? Math.round(data.tempmax) : 100}°C</p>
                <p>Min {data.tempmin ? Math.round(data.tempmin) : 0}°C</p>
                <p>
                  Avg{" "}
                  {data.tempmax && data.tempmin
                    ? Math.round((data.tempmax + data.tempmin) / 2)
                    : 50}
                  °C
                </p>
              </div>
              <div className={classes["weather-weekly-time"]}>
                <p>{data.datetime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WeatherWeekly;
