import { motion } from "framer-motion";
import { useState } from "react";

import { chevronDown } from "../../UI/svgs/icons";

import classes from "./CurrencyOverview.module.css";

const containerVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.6,
    },
  },
};

const contentVairants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 75 },
  },
};

const selectedCountries = ["USD", "GBP", "JPY", "AUD", "EUR", "INR"];

const CurrencyOverview = (props) => {
  const [showAll, setShowAll] = useState(null);
  const [filteredData, setFilteredData] = useState(props.currencyData);

  const buttonHandler = () => {
    setShowAll(!showAll);
  };

  const inputHandler = (e) => {
    setFilteredData(
      props.currencyData.filter((c, i) =>
        c.name.includes(e.target.value.toUpperCase())
      )
    );
  };

  const big6 = props.currencyData.filter((data) =>
    selectedCountries.includes(data.name)
  );

  return (
    <motion.div
      className={classes["currency-overview"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={classes["currency-overview-flag"]}
        variants={contentVairants}
      >
        <img
          src="https://images.unsplash.com/photo-1613512504421-c2664b74653b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"
          alt="canadian-flag"
        />
        <h2>
          1 <span>CAD</span>
        </h2>
      </motion.div>
      <motion.div
        className={classes["currency-overview-main"]}
        variants={contentVairants}
      >
        {big6.map((data, i) => {
          let imgSrc;
          let countryName;
          if (data.name === "USD") {
            imgSrc =
              " https://images.unsplash.com/photo-1510265382668-7b564935d7b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1190&q=80";
            countryName = "United States";
          }
          if (data.name === "GBP") {
            imgSrc =
              " https://images.unsplash.com/photo-1494419470281-65c2b001a42b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=931&q=80";
            countryName = "United Kingdom";
          }
          if (data.name === "JPY") {
            imgSrc =
              " https://www.world-grain.com/ext/resources/Article-Images/2020/04/Japan_AdobeStock_62195416_E.jpg?t=1586450703&width=1080";
            countryName = "Japan";
          }
          if (data.name === "AUD") {
            imgSrc =
              " https://media.istockphoto.com/photos/australia-flag-picture-id486038099?s=612x612";
            countryName = "Australia";
          }
          if (data.name === "EUR") {
            imgSrc =
              " https://images.unsplash.com/photo-1586879070755-b560b8aa4b8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=998&q=80";
            countryName = "Europe";
          }
          if (data.name === "INR") {
            imgSrc =
              " https://images.unsplash.com/photo-1597058712635-3182d1eacc1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80";
            countryName = "India";
          }
          return (
            <div key={i}>
              <img src={imgSrc} alt={`${countryName}-flag`} />
              <h1>{countryName}</h1>
              <p>
                {data.name}{" "}
                {data.value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          );
        })}
      </motion.div>
      <motion.div
        className={classes["currency-overview-action"]}
        variants={contentVairants}
      >
        <button onClick={buttonHandler}>
          {showAll ? "HIDE ALL COUNTRIES" : "SHOW ALL COUNTRIES"} {chevronDown}
        </button>
      </motion.div>
      {showAll && (
        <div className={classes["currency-overview-input"]}>
          <p>Filter Using Currency Symbols</p>
          <input
            type="text"
            placeholder="Filter Countries"
            onChange={inputHandler}
          />
        </div>
      )}
      <div className={classes["currency-overview-all"]}>
        {showAll &&
          filteredData.map((data, i) => {
            return (
              <div key={i}>
                <p>
                  <span>{data.name}</span>
                  {data.value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default CurrencyOverview;
