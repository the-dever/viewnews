import { motion } from "framer-motion";
import { Link, useHistory } from "react-router-dom";

import NavigationCategories from "./NavigationCategories";

import classes from "./Navigation.module.css";
import NavigationAccount from "./NavigationAccount";

const logoVariants = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    skew: "10deg",
    transition: { type: "spring", stiffness: 100 },
  },
};

const Navigation = () => {
  const history = useHistory();
  return (
    <header>
      <nav className={classes.nav}>
        <div>
          <motion.div
            className={classes["logo-container"]}
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            onClick={() => history.push("/home")}
          >
            <div>
              <p>ViewNews</p>
            </div>
          </motion.div>

          <ul>
            <NavigationCategories />
            <li className={classes["nav-link"]}>
              <Link to="/about">About</Link>
            </li>
            <li className={classes["nav-link"]}>
              <Link to="/contact">Contact</Link>
            </li>
            <NavigationAccount />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
