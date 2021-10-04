// prettier-ignore
import {cloud, day, drop, fan, location, night, precipitaiton, temperature, time, wind} from "../../UI/svgs/icons";

import classes from "./WeatherWidget.module.css";

const WeatherWidget = (props) => {
  const conditions = props.currentCityData.currentConditions;
  const currentTime = +conditions.datetime.slice(0, 2) < 12 ? "day" : "night";
  return (
    <div className={classes["weather-widget"]}>
      <div className={classes.location}>
        <p>
          {location}
          {props.currentCityData.resolvedAddress
            ? props.currentCityData.resolvedAddress
            : props.currentCityData.address}
        </p>
        {currentTime === "day" && <p>{day}Morning/Afternoon</p>}
        {currentTime === "night" && <p>{night}Evening/Night</p>}
        <p>
          {time}Last updated at{" "}
          {conditions.datetime ? conditions.datetime : "Unknown"}
        </p>
      </div>
      <div className={classes.temperature}>
        <figure>
          <img src={props.imgSrc} alt="weather-img" />
        </figure>
        <div>
          <p>{conditions.temp ? `${Math.round(conditions.temp)}°C` : "0"}</p>
          <p>
            {conditions.conditions
              ? conditions.conditions
              : "Description Unknown"}
          </p>
        </div>
      </div>
      <div className={classes["weather-details"]}>
        <p>
          {temperature} Feels Like{" "}
          {conditions.feelslike ? Math.round(conditions.feelslike) : "0?"}
        </p>
        <p>
          {fan} Wind Speed{" "}
          {conditions.windspeed ? Math.round(conditions.windspeed) : "0"}
          km/h
        </p>
        <p>
          {wind} Wind Direction{" "}
          {conditions.winddir ? `${conditions.winddir}°` : "N"}
        </p>
        <p>
          {precipitaiton} Precipitation{" "}
          {conditions.precip ? conditions.precip : "0"}
          mm
        </p>
        <p>
          {drop} Humditiy{" "}
          {conditions.humidity ? Math.round(conditions.humidity) : "0"}%
        </p>
        <p>
          {cloud} Cloud Cover{" "}
          {conditions.cloudcover ? conditions.cloudcover : "0"}%
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;
