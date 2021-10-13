import { useContext, useRef } from "react";
import { AuthContext } from "../../context/auth-context";
import { HelperContext } from "../../context/helper-context";
import { motion } from "framer-motion";

import { arrowRight } from "../../UI/svgs/icons";

import classes from "./SigninComponent.module.css";
import { firebaseKey } from "../../context/keys";

const containerVariants = {
  hidden: { x: "100vw" },
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
    x: "100vw",
    transition: { ease: "easeInOut" },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const SigninComponent = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const helperCtx = useContext(HelperContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    authCtx.postSignupSigninRequest(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`,
      enteredEmail,
      enteredPassword
    );
    helperCtx.scrollToSection(window, 0, 0);
  };

  return (
    <motion.div
      className={classes["signin-container"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={classes["signin-img"]}>
        <motion.p variants={childVariants}>
          It is good to have you back, fellow explorer!
        </motion.p>
      </div>
      <form className={classes["signin-form"]} onSubmit={submitHandler}>
        <motion.h2 className={classes["form-heading"]} variants={childVariants}>
          Sign In
        </motion.h2>

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

        <div className={classes["btn-container"]}>
          <motion.button
            type="submit"
            variants={childVariants}
            className={classes["btn-signin"]}
          >
            SIGN IN {arrowRight}
          </motion.button>
          <motion.button
            variants={childVariants}
            type="button"
            className={classes["btn-redirect"]}
            onClick={authCtx.btnNoAccount}
          >
            DON'T HAVE AN ACCOUNT?
          </motion.button>
        </div>
        <div className={classes["form-last-text-container"]}>
          <motion.p
            variants={childVariants}
            className={classes["form-last-text"]}
          >
            Get back to exploring...
          </motion.p>
        </div>
      </form>
    </motion.div>
  );
};

export default SigninComponent;
