import { useEffect, useState } from "react";
import WeatherWidget from "./WeatherWidget";
import WeatherSearch from "./WeatherSearch";
import Loader from "../../UI/Loader";
import classes from "./WeatherHomeComponent.module.css";

const WeatherHomeComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const [currentCityData, setCurrentCityData] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  let imgSrc =
    "https://images.unsplash.com/photo-1600876876700-ba4c72ae3517?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=5b6d41edac00451b91b336f2f72967c4`
        )
          .then((res) => {
            if (!res || !res.ok) throw new Error("Failed to get your location");
            return res.json();
          })
          .then((data) => {
            setIsLoading(false);
            setCurrentCity(data.features[0].properties.city);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorMessage("Failed to get your location. Please try again!");
          });
      },
      (error) => {
        console.log(error);
        setErrorMessage("Failed to get your location. Please try again!");
      }
    );
  }, []);

  useEffect(() => {
    if (currentCity) {
      const fetchWeatherData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentCity}?unitGroup=metric&key=5BBHTMCZZZB2KXMSASWKZ3UVE`
          );
          if (!response || !response.ok)
            throw new Error("Weather data cannot be found");
          const data = await response.json();
          setCurrentCityData(data);
        } catch (err) {
          console.error(err.message);
          setErrorMessage("Weather data cannot be found. Please try again!");
        }
        setIsLoading(false);
      };
      fetchWeatherData();
    }
  }, [currentCity]);

  if (!currentCity)
    return <h3 className={classes["error-message"]}>{errorMessage}</h3>;
  if (!currentCityData) return <Loader />;

  if (
    (currentCityData.currentConditions.conditions &&
      currentCityData.currentConditions.conditions.includes("cloudy")) ||
    currentCityData.currentConditions.conditions.includes("Cloudy") ||
    currentCityData.currentConditions.conditions.includes("Overcast")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1536532184021-da5392b55da1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80";

  if (
    (currentCityData.currentConditions.conditions &&
      currentCityData.currentConditions.conditions.includes("Mist")) ||
    currentCityData.currentConditions.conditions.includes("Fog")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1490780960365-b5e36e1d824c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80";

  if (
    currentCityData.currentConditions.conditions &&
    currentCityData.currentConditions.conditions.includes("Sunny")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1622278647429-71bc97e904e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

  if (
    currentCityData.currentConditions.conditions &&
    (currentCityData.currentConditions.conditions.includes("rain") ||
      currentCityData.currentConditions.conditions.includes("Rain") ||
      currentCityData.currentConditions.conditions.includes("sleet") ||
      currentCityData.currentConditions.conditions.includes("drizzle"))
  )
    imgSrc =
      "https://images.unsplash.com/photo-1428592953211-077101b2021b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

  if (
    (currentCityData.currentConditions.conditions &&
      currentCityData.currentConditions.conditions.includes("snow")) ||
    currentCityData.currentConditions.conditions.includes("Blizzard")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1547754980-3df97fed72a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

  if (
    currentCityData.currentConditions.conditions &&
    currentCityData.currentConditions.conditions.includes("Thunder")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1599070221195-bf2801877d7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

  if (
    currentCityData.currentConditions.conditions &&
    currentCityData.currentConditions.conditions.includes("Clear")
  )
    imgSrc =
      "https://images.unsplash.com/photo-1532300821639-af8f986b9d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80";

  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && (
        <h3 className={classes["error-message"]}>{errorMessage}</h3>
      )}
      {!errorMessage && (
        <>
          <WeatherWidget currentCityData={currentCityData} imgSrc={imgSrc} />
          <WeatherSearch
            currentCityData={currentCityData}
            imgSrc={imgSrc}
            currentCity={currentCity}
          />
        </>
      )}
    </>
  );
};

export default WeatherHomeComponent;
