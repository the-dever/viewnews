import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import WeatherBigWidget from "../../components/weatherComponents/WeatherBigWidget";
import WeatherHourly from "../../components/weatherComponents/WeatherHourly";
import WeatherWeekly from "../../components/weatherComponents/WeatherWeekly";
import Loader from "../../UI/Loader";

import classes from "./WeatherDetails.module.css";

let imgSrc =
  "https://images.unsplash.com/photo-1600876876700-ba4c72ae3517?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";

const WeatherDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cityData, setCityData] = useState();
  const [forecastData, setForecastData] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${params.id}?unitGroup=metric&key=5BBHTMCZZZB2KXMSASWKZ3UVE`
        );
        if (!response.ok || !response)
          throw new Error("City Data Cannot be Found");
        const data = await response.json();
        setCityData(data);
      } catch (err) {
        console.error(err.message);
        setErrorMessage("City data cannot be found. Please try again!");
      }
      setIsLoading(false);
    };

    const fetchHourlyWeeklyData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${params.id}?unitGroup=metric&aggregateHours=24&key=5BBHTMCZZZB2KXMSASWKZ3UVE&include=fcst%2Chours`
        );
        if (!response.ok || !response)
          throw new Error("Hourly Data Cannot be Found");
        const data = await response.json();
        setForecastData(data);
      } catch (err) {
        console.log(err.message);
        setErrorMessage("Hourly data cannot be found. Please try again!");
      }
      setIsLoading(false);
    };
    fetchData();
    fetchHourlyWeeklyData();
  }, [params.id]);

  if (!cityData) return <Loader />;
  if (!forecastData) return <Loader />;

  if (
    (cityData.currentConditions.conditions &&
      cityData.currentConditions.conditions.includes("cloudy")) ||
    cityData.currentConditions.conditions.includes("Cloudy") ||
    cityData.currentConditions.conditions.includes("Overcast")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1536532184021-da5392b55da1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80";

  if (
    (cityData.currentConditions.conditions &&
      cityData.currentConditions.conditions.includes("Mist")) ||
    cityData.currentConditions.conditions.includes("Fog")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1490780960365-b5e36e1d824c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80";

  if (
    cityData.currentConditions.conditions &&
    cityData.currentConditions.conditions.includes("Sunny")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

  if (
    cityData.currentConditions.conditions &&
    (cityData.currentConditions.conditions.includes("rain") ||
      cityData.currentConditions.conditions.includes("Rain") ||
      cityData.currentConditions.conditions.includes("sleet") ||
      cityData.currentConditions.conditions.includes("drizzle"))
  )
    imgSrc =
      "https://images.unsplash.com/photo-1428592953211-077101b2021b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

  if (
    (cityData.currentConditions.conditions &&
      cityData.currentConditions.conditions.includes("snow")) ||
    cityData.currentConditions.conditions.includes("Blizzard")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1547754980-3df97fed72a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

  if (
    cityData.currentConditions.conditions &&
    cityData.currentConditions.conditions.includes("Thunder")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1599070221195-bf2801877d7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

  if (
    cityData.currentConditions.conditions &&
    cityData.currentConditions.conditions.includes("Clear")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1532300821639-af8f986b9d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80";

  return (
    <section className={classes["section-weather-detail"]}>
      {isLoading && <Loader />}
      {errorMessage && (
        <div className={classes["error-container"]}>
          <h3>No Way</h3>
          <p>{errorMessage}</p>
          <Link to="/home_weather">Go Back</Link>
        </div>
      )}
      {!errorMessage && (
        <>
          <WeatherBigWidget cityData={cityData} imgSrc={imgSrc} />
          <WeatherHourly forecastData={forecastData} />
          <WeatherWeekly forecastData={forecastData} />
        </>
      )}
    </section>
  );
};

export default WeatherDetails;
