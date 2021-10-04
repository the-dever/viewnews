import { Link } from "react-router-dom";

import { arrowRight } from "../../UI/svgs/icons";

import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <section className={classes["section-error"]}>
      <div>
        <p>
          NO WAY! Seems like the page you are trying to reach is not accessible.
          <br />
          In other words, Its an Error 404 :(
        </p>
        <Link to="/home">Home Page {arrowRight}</Link>
      </div>
    </section>
  );
};

export default ErrorPage;
