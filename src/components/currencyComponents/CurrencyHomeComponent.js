import { useState, useEffect } from "react";
import CurrencyConversion from "./CurrencyConversion";
import Loader from "../../UI/Loader";
import CurrencyOverview from "./CurrencyOverview";
import classes from "./CurrencyHomeComponent.module.css";

const CurrencyComponent = () => {
  const [currencyContent, setCurrencyContent] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [currencyData, setCurrencyData] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.exchangerate.host/latest?base=CAD"
        );
        if (!response.ok || !response)
          throw new Error("Currency data cannot be found");
        let arr = [];
        const data = await response.json();
        for (const [key, value] of Object.entries(data.rates)) {
          arr.push({ name: key, value: value });
        }
        setCurrencyData(arr);
      } catch (err) {
        console.error(err.message);
        setErrorMessage("Failed to get Currency Data. Please try again!");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (!currencyData)
    return <h1 className={classes["error-message"]}>{errorMessage}</h1>;

  return (
    <div className={classes["currency-container"]}>
      {isLoading && <Loader />}
      {errorMessage && (
        <h1 className={classes["error-message"]}>{errorMessage}</h1>
      )}
      {!errorMessage && (
        <div className={classes["currency-tab"]}>
          <button
            className={classes.btn}
            onClick={() => {
              setCurrencyContent("overview");
            }}
          >
            OVERVIEW
          </button>
          <button
            className={classes.btn}
            onClick={() => setCurrencyContent("conversion")}
          >
            CONVERSION
          </button>
        </div>
      )}
      {!errorMessage && currencyContent === "overview" && (
        <CurrencyOverview currencyData={currencyData} />
      )}
      {!errorMessage && currencyContent === "conversion" && (
        <CurrencyConversion currencyData={currencyData} />
      )}
    </div>
  );
};

export default CurrencyComponent;
