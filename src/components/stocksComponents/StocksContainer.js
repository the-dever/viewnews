import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Loader from "../../UI/Loader";
import { chevronDown, search } from "../../UI/svgs/icons";
import StocksChart from "./StocksChart";

import classes from "./StocksContainer.module.css";
import StocksTable from "./StocksTable";

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const StocksContainer = () => {
  const [stocksDailyData, setStocksDailyData] = useState();
  const [stockName, setStockName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showAll, setShowAll] = useState(null);
  const [marginChart, setMarginChart] = useState(null);
  const [showForm, setShowForm] = useState(null);

  const searchInputRef = useRef();

  const buttonShowHandler = () => {
    setShowAll(!showAll);
  };

  const buttonChartHandler = () => {
    setMarginChart(!marginChart);
  };

  const buttonShowFormHandler = () => {
    setShowForm(!showForm);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${searchInputRef.current.value}&apikey=EK03CLS1L9EIUY3R.`
      );
      if (!response.ok) throw new Error("Stocks Data Cannot be Found");
      const data = await response.json();
      setStockName(data["Meta Data"]["2. Symbol"]);
      let arr = [];
      for (const [key, value] of Object.entries(data["Time Series (Daily)"])) {
        arr.push({ date: key, data: value });
      }
      setStocksDailyData(arr);
    } catch (err) {
      console.error(err.message);
      setErrorMessage("Stocks data cannot be found. Please try again!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AMZN&apikey=EK03CLS1L9EIUY3R.`
        );
        if (!response.ok) throw new Error("Stocks Data Cannot be Found");
        const data = await response.json();
        setStockName(data["Meta Data"]["2. Symbol"]);
        let arr = [];
        for (const [key, value] of Object.entries(
          data["Time Series (Daily)"]
        )) {
          arr.push({ date: key, data: value });
        }
        setStocksDailyData(arr);
      } catch (err) {
        console.error(err.message);
        setErrorMessage("Stocks data cannot be found. Please try again!");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (!stockName) return <Loader />;
  if (!stocksDailyData) return <Loader />;

  let content;

  if (showAll) {
    content = stocksDailyData;
  } else {
    content = stocksDailyData.slice(0, 14);
  }

  return (
    <div className={classes["stocks-chart-container"]}>
      {isLoading && <Loader />}
      <div className={classes["stocks-chart-action"]}>
        {errorMessage && <h3>{errorMessage}</h3>}
        {!errorMessage && (
          <h3>
            Time Series Data for {stockName} {chevronDown}
          </h3>
        )}
        {!errorMessage && !marginChart && (
          <button onClick={buttonShowHandler}>
            {showAll ? "SHOW LESS" : "SHOW ALL"}
          </button>
        )}
        {!errorMessage && marginChart && (
          <div onClick={buttonShowHandler} className={classes["btn-disabled"]}>
            SHOW ALL
          </div>
        )}
        {!errorMessage && (
          <button onClick={buttonChartHandler}>
            {marginChart ? "Tickers Table" : "Margin Chart"}
          </button>
        )}
      </div>

      {!errorMessage && !marginChart && !showForm && (
        <motion.button
          className={classes["btn-icon"]}
          onClick={buttonShowFormHandler}
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >
          {search}
        </motion.button>
      )}
      {!errorMessage && !marginChart && showForm && (
        <motion.form
          className={classes["search-form"]}
          onSubmit={submitHandler}
          onBlur={buttonShowFormHandler}
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >
          <input
            className={classes["search-input"]}
            placeholder="SEARCH NEWS"
            ref={searchInputRef}
          ></input>
          <button className={classes["btn-search"]} type="submit">
            Search {search}
          </button>
        </motion.form>
      )}

      {!errorMessage && !marginChart && <StocksTable content={content} />}
      {!errorMessage && marginChart && (
        <StocksChart content={content} showAll={showAll} />
      )}

      {!errorMessage && (
        <p>
          View more data from
          <a
            href="https://www.investing.com/equities/"
            target="_blank"
            rel="noreferrer"
          >
            alternate source
          </a>
        </p>
      )}
    </div>
  );
};

export default StocksContainer;
