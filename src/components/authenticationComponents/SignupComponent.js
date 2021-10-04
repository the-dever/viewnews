import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/auth-context";
import { HelperContext } from "../../context/helper-context";
import Loader from "../../UI/Loader";

import classes from "./SignupComponent.module.css";

const containerVariants = {
  hidden: { x: "-100vw" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: "120",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const childVariants = {
  hidden: {
    // y: "-100vh",
    opacity: 0,
  },
  visible: {
    // y: 0,
    opacity: 1,
  },
};

const SignupComponent = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const helperCtx = useContext(HelperContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    authCtx.postSignupSigninRequest(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmbR7YWNV5wURfEe9SgpbL4-MLwR5QzMg`,
      enteredEmail,
      enteredPassword
    );

    helperCtx.scrollToSection(window, 0, 0);
  };

  return (
    <>
      {authCtx.isLoading && <Loader />}
      <motion.div
        className={classes["signup-container"]}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={classes["signup-img"]}>
          <motion.p variants={childVariants}>
            We are off to a good start. Lets get you signed up!
          </motion.p>
        </div>

        <form onSubmit={submitHandler} className={classes["signup-form"]}>
          <motion.h2
            className={classes["form-heading"]}
            variants={childVariants}
          >
            Create Account
          </motion.h2>

          <motion.p variants={childVariants} className={classes["form-text"]}>
            Password must contain at least 6 characters
          </motion.p>

          <motion.div
            variants={childVariants}
            className={classes["email-container"]}
          >
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="email"
              id="email"
              placeholder="YOUR EMAIL"
              required
              ref={emailInputRef}
            />
          </motion.div>

          <motion.div
            variants={childVariants}
            className={classes["password-container"]}
          >
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              minLength="6"
              placeholder="YOUR PASSWORD"
              required
              ref={passwordInputRef}
            />
          </motion.div>

          <motion.button
            variants={childVariants}
            type="submit"
            className={classes["btn-signup"]}
          >
            SIGN UP
          </motion.button>
          <motion.button
            variants={childVariants}
            type="button"
            className={classes["btn-redirect"]}
            onClick={authCtx.btnYesAccount}
          >
            ALREADY HAVE AN ACCOUNT?
          </motion.button>
          <motion.p
            variants={childVariants}
            className={classes["form-last-text"]}
          >
            Hours of exploring awaits...
          </motion.p>
        </form>
      </motion.div>
    </>
  );
};

export default SignupComponent;
