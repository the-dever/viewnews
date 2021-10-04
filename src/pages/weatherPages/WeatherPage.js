import WeatherHomeComponent from "../../components/weatherComponents/WeatherHomeComponent";
import classes from "./WeatherPage.module.css";
import WeatherMainImage from "../../components/weatherComponents/WeatherMainImage";

const WeatherPage = () => {
  return (
    <section className={classes["weather-main-component"]}>
      <WeatherMainImage />
      <WeatherHomeComponent />
    </section>
  );
};

export default WeatherPage;
