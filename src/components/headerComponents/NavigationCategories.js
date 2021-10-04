import { Link } from "react-router-dom";
import {
  arrowRight,
  basketball,
  chevronDown,
  entertainment,
  health,
  microscope,
  money,
  robot,
} from "../../UI/svgs/icons";
import classes from "./NavigationCategories.module.css";

const NavigationCategories = () => {
  return (
    <>
      <li className={classes["nav-link"]}>Categories {chevronDown}</li>

      <div className={classes["categories-container"]}>
        <Link to="/news/business">
          {money} Business {arrowRight}
        </Link>
        <Link to="/news/movies">
          {entertainment} Movies {arrowRight}
        </Link>
        <Link to="/news/sports">
          {basketball} Sports {arrowRight}
        </Link>
        <Link to="/news/health">
          {health} Health {arrowRight}
        </Link>
        <Link to="/news/science">
          {microscope} Science {arrowRight}
        </Link>
        <Link to="/news/technology">
          {robot} Tech {arrowRight}
        </Link>
      </div>
    </>
  );
};

export default NavigationCategories;
