import { useContext } from "react";
import { Link } from "react-router-dom";

import { HelperContext } from "../../context/helper-context";
import { currency, newsPaper, stocks, weather } from "../../UI/svgs/icons";

import classes from "./Sidebar.module.css";

const Sidebar = () => {
  // const sidebarClickHandler = () => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // };

  const helperCtx = useContext(HelperContext);

  return (
    <ul className={classes.sidebar}>
      <li>
        <Link
          to="/home"
          onClick={helperCtx.scrollToSection.bind(null, window, 0, 0)}
        >
          {newsPaper} <span>News</span>
        </Link>
      </li>
      <li>
        <Link
          to="/home_weather"
          onClick={helperCtx.scrollToSection.bind(null, window, 0, 0)}
        >
          {weather} <span>Weather</span>
        </Link>
      </li>
      <li>
        <Link
          to="/home_currency"
          onClick={helperCtx.scrollToSection.bind(null, window, 0, 0)}
        >
          {currency} <span>Currency</span>
        </Link>
      </li>
      <li>
        <Link
          to="/home_stocks"
          onClick={helperCtx.scrollToSection.bind(null, window, 0, 0)}
        >
          {stocks} <span>Stocks</span>
        </Link>
      </li>
      <p>
        V<span>iew</span>N<span>ews</span>
      </p>
    </ul>
  );
};

export default Sidebar;
