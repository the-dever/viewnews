import { useContext } from "react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import { HelperContext } from "../../context/helper-context";

import classes from "./Footer.module.css";

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

const Footer = () => {
  const helperCtx = useContext(HelperContext);
  return (
    <footer>
      <div className={classes.footer}>
        <div>
          <div>
            <p>VN</p>
          </div>
        </div>
        <div>
          <div className={classes["footer-prompt"]}>
            <p>
              Become a member <span>to enjoy the utmost experience!</span>
            </p>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              onClick={helperCtx.scrollToSection.bind(null, window, 0, 0)}
            >
              <NavLink to="/account">Sign up!</NavLink>
            </motion.button>
          </div>
          <div className={classes["footer-links"]}>
            <div>
              <h3>Powered by:</h3>
              <a
                href="https://firebase.google.com/"
                target="_blank"
                rel="noreferrer"
              >
                FireBase
              </a>
              <a
                href="https://www.alphavantage.co/"
                target="_blank"
                rel="noreferrer"
              >
                AlphaVantage
              </a>
              <a
                href="https://www.visualcrossing.com/weather-data"
                target="_blank"
                rel="noreferrer"
              >
                VisualCrossing
              </a>
              <a
                href="https://exchangerate.host/#/"
                target="_blank"
                rel="noreferrer"
              >
                ExchangeRate
              </a>
              <a
                href="https://developer.nytimes.com/"
                target="_blank"
                rel="noreferrer"
              >
                NYTimes
              </a>
            </div>

            <div>
              <h3>Follow us</h3>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                Twitter
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
              >
                Youtube
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://github.com/the-dever"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>
          </div>
        </div>
        <p>
          © This Website was created by
          <a
            href="https://github.com/the-dever"
            target="_blank"
            rel="noreferrer"
          >
            Saboor
          </a>
          . The API providers do not endorse or certify this website.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
