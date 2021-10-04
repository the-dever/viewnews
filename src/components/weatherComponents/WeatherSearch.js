import { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { arrowRight, searchWeather } from "../../UI/svgs/icons";
import { HelperContext } from "../../context/helper-context";

import classes from "./WeatherSearch.module.css";

const nextVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 120 },
  },
};

const WeatherSearch = (props) => {
  const [isMotion, setIsMotion] = useState(false);
  const [enteredSearch, setEnteredSearch] = useState(false);
  const searchInputRef = useRef();
  const history = useHistory();

  const helperCtx = useContext(HelperContext);

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/weather/${searchInputRef.current.value}`);
    helperCtx.scrollToSection(window, 0, 0);
  };

  return (
    <>
      <Link
        to={`/weather/${props.currentCity}`}
        className={classes["weather-view-more"]}
        onClick={() => {
          helperCtx.scrollToSection(window, 0, 0);
        }}
      >
        View Full Weather Forecast {arrowRight}
      </Link>
      <div className={classes["weather-search"]}>
        <p>Want to search another city?</p>
        <form className={classes["weather-form"]} onSubmit={submitHandler}>
          <input
            type="search"
            placeholder="Search Weather Forecast..."
            onClick={() => setIsMotion(true)}
            ref={searchInputRef}
            onChange={(e) => {
              setEnteredSearch(e.target.value);
            }}
          />
          {isMotion && (
            <motion.div
              className={classes["weather-search-button"]}
              variants={nextVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to={`/weather/${enteredSearch}`}
                onClick={() => {
                  helperCtx.scrollToSection(window, 0, 0);
                }}
              >
                Search {searchWeather}
              </Link>
            </motion.div>
          )}
        </form>
      </div>
    </>
  );
};

export default WeatherSearch;
