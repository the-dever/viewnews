import { motion } from "framer-motion";
import { temperature } from "../../UI/svgs/icons";
import Loader from "../../UI/Loader";
import classes from "./WeatherHourly.module.css";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { type: "spring", stiffness: 80, delay: 3 },
  },
};

const WeatherHourly = (props) => {
  if (!props.forecastData) return <Loader />;
  const content = props.forecastData.days[0].hours.filter(
    (h, i) => i % 4 === 1
  );

  return (
    <motion.div
      className={classes["weather-hourly-widget"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h4>Daily</h4>
      <div className={classes["weather-hourly-container"]}>
        {content.map((data, i) => {
          return (
            <div className={classes["weather-hourly-main"]} key={i}>
              <div className={classes["weather-hourly-temperature"]}>
                <img
                  src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
                  alt="icon"
                />
                <p>
                  {temperature}
                  {data.temp ? Math.round(data.temp) : 0}°C
                </p>
              </div>
              <div className={classes["weather-hourly-info"]}>
                <p>
                  Precipitaion
                  <span>
                    {data.precipprob ? Math.round(data.precipprob) : 0}%
                  </span>
                </p>
                <p>
                  Snow
                  <span>{data.snow ? Math.round(data.snow) : 0}%</span>
                </p>
                <p>
                  Cloud
                  <span>
                    {data.cloudcover ? Math.round(data.cloudcover) : 0}%
                  </span>
                </p>
              </div>
              <div className={classes["weather-hourly-time"]}>
                <p>{data.datetime.slice(0, 5)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WeatherHourly;
