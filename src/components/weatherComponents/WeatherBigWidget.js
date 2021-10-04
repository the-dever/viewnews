import { motion } from "framer-motion";

// prettier-ignore
import {binoculars, cloud, day, direction, drop, fan, location, night, precipitaiton, temperature, time, uvSun, wave, wind} from "../../UI/svgs/icons";

import classes from "./WeatherBigWidget.module.css";

const containerVariants = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, delay: 1 },
  },
};

const WeatherBigWidget = (props) => {
  const conditions = props.cityData.currentConditions;
  const currentTime = +conditions.datetime.slice(0, 2) < 12 ? "day" : "night";
  return (
    <>
      <motion.div
        className={classes["weather-big-widget"]}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={classes["big-location"]}>
          <p>
            {location}
            {props.cityData.resolvedAddress
              ? props.cityData.resolvedAddress
              : props.cityData.address}
          </p>
        </div>
        <div className={classes["big-main-container"]}>
          <div className={classes["big-temperature"]}>
            <figure>
              <img src={props.imgSrc} alt="weather-img" />
            </figure>
            <div>
              <p>{conditions.temp ? Math.round(conditions.temp) : 0}° C</p>
              <p>
                {conditions.conditions
                  ? conditions.conditions
                  : "Description Unknown"}
              </p>
            </div>
          </div>
          <div className={classes["weather-big-details"]}>
            {/* prettier-ignore */}
            <div><p>{temperature} Feels Like {conditions.feelslike? Math.round(conditions.feelslike): 0}°</p></div>
            {/* prettier-ignore */}
            <div><p>{cloud} Cloud Cover {conditions.cloudcover? conditions.cloudcover: 0}%</p></div>
            {/* prettier-ignore */}
            <div><p>{fan} Wind Speed {conditions.windspeed? Math.round(conditions.windspeed): 0}km/h</p></div>
            {/* prettier-ignore */}
            <div><p>{direction} Wind Direction {conditions.winddir? `${conditions.winddir}°`: 'N'}</p></div>
            {/* prettier-ignore */}
            <div><p>{wind} Wind Gust {conditions.windgust? Math.round(conditions.windgust): 0}°</p></div>
            {/* prettier-ignore */}
            <div><p>{wave} Pressure {conditions.pressure? conditions.pressure: 0}mb</p></div>
            {/* prettier-ignore */}
            <div><p>{precipitaiton} Precipitation {conditions.precip? conditions.precip: 0}mm</p></div>
            {/* prettier-ignore */}
            <div><p>{drop} Humditiy {conditions.humidity? Math.round(conditions.humidity): 0}%</p></div>
            {/* prettier-ignore */}
            <div><p>{uvSun} UV Index {conditions.uvndex? conditions.uvndex: 0}</p></div>
            {/* prettier-ignore */}
            <div><p>{binoculars} Visibility {conditions.visibility? conditions.visibility: 0}km</p></div>
          </div>
        </div>
        <div className={classes["big-timing"]}>
          {currentTime === "day" && <p>{day}Morning/Afternoon</p>}
          {currentTime === "night" && <p>{night}Morning/Afternoon</p>}
          <p>
            {time}Last updated at{" "}
            {conditions.datetime ? conditions.datetime : "Unkown"}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default WeatherBigWidget;
