import { useCallback, useContext, useEffect, useRef, useState } from "react";

import ProfileForm from "./ProfileForm";
import Loader from "../../UI/Loader";
import { edit } from "../../UI/svgs/icons";

import classes from "./ProfileComponent.module.css";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/auth-context";
import { firebaseKey } from "../../context/keys";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
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
    scale: 0,
    // width: 0,
  },
  visible: {
    scale: 1,
    // width: "100%",
    transition: { type: "spring", stiffness: 100 },
  },
};

const nextVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 120 },
  },
};

const ProfileComponent = (props) => {
  const [editProfile, setEditProfile] = useState(null);
  const [isMotion, setIsMotion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const authCtx = useContext(AuthContext);

  const newPasswordInputRef = useRef();

  const editProfileHandler = useCallback(
    () => setEditProfile(!editProfile),
    [editProfile]
  );

  const { userInfoRequest } = props;

  useEffect(() => {
    userInfoRequest();
  }, [userInfoRequest]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredNewPassword = newPasswordInputRef.current.value;
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      setMessage("Password Changed");
    });
    newPasswordInputRef.current.value = "";
    setTimeout(() => setMessage(false), 3000);
  };

  let percent = 0;

  if (props.userInfo) {
    percent =
      props.userInfo.profilePicture !==
      "https://images.unsplash.com/photo-1519400197429-404ae1a1e184?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
        ? percent + 20
        : percent;
    percent = props.userInfo.name !== "Not Provided" ? percent + 20 : percent;
    percent = props.userInfo.date !== "Not Provided" ? percent + 20 : percent;
    percent =
      props.userInfo.address !== "Not Provided" ? percent + 20 : percent;
    percent = props.userInfo.phone !== "Not Provided" ? percent + 20 : percent;
  }

  /* ------------------------------------------------ SCENARIO: WITH USER INFO DATA ------------------------------------------------ */

  return (
    <motion.div
      className={classes["profile-container"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading && <Loader />}
      <motion.div
        className={classes["profile-bar-container"]}
        variants={childVariants}
      >
        <div
          style={{
            backgroundImage: `linear-gradient(90deg, #d4ecdd ${percent}%, transparent 0%)`,
          }}
        ></div>
        <p>{percent}% Profile Completed</p>
      </motion.div>

      <div className={classes["profile-info-container"]}>
        {!editProfile && (
          <>
            <motion.h4 variants={childVariants}>About Me</motion.h4>
            <p className={classes["refresh-message"]}>
              You might have to refresh the page to reflect changes
            </p>

            {!props.userInfo && (
              <>
                <motion.figure
                  className={classes["profile-picture"]}
                  variants={childVariants}
                >
                  <img
                    src="https://images.unsplash.com/photo-1519400197429-404ae1a1e184?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                    alt=""
                  />
                </motion.figure>

                <div>
                  <motion.div variants={childVariants}>
                    <p>Name:</p>
                    <p>Not Provided</p>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <p>Date Of Birth:</p>
                    <p>Not Provided</p>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <p>Address:</p>
                    <p>Not Provided</p>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <p>Phone:</p>
                    <p>Not Provided</p>
                  </motion.div>
                </div>
              </>
            )}

            {props.userInfo && (
              <>
                <motion.figure
                  className={classes["profile-picture"]}
                  variants={childVariants}
                >
                  <img src={props.userInfo.profilePicture} alt="" />
                </motion.figure>

                <div>
                  <motion.div variants={childVariants}>
                    <p>Name:</p>
                    <p>{props.userInfo.name}</p>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <p>Date Of Birth:</p>
                    <p>{props.userInfo.date}</p>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <p>Address:</p>
                    <p>{props.userInfo.address}</p>
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <p>Phone:</p>
                    <p>{props.userInfo.phone}</p>
                  </motion.div>
                </div>
              </>
            )}

            <motion.div
              className={classes["btn-edit"]}
              variants={childVariants}
            >
              <button onClick={editProfileHandler}>EDIT PROFILE {edit}</button>
            </motion.div>
          </>
        )}

        {editProfile && (
          <ProfileForm
            editProfileHandler={editProfileHandler}
            userInfoRequest={props.userInfoRequest}
            userId={props.userId}
            userInfo={props.userInfo}
          />
        )}

        <motion.form
          className={classes["profile-password-form"]}
          variants={childVariants}
          onSubmit={submitHandler}
        >
          <h5>Want to Change Your Password?</h5>
          <input
            onClick={() => setIsMotion(true)}
            type="password"
            id="new-password"
            minLength="6"
            placeholder="NEW PASSWORD"
            required
            ref={newPasswordInputRef}
          />
          {isMotion && (
            <motion.div
              variants={nextVariants}
              initial="hidden"
              animate="visible"
            >
              <button>CHANGE PASSWORD</button>
            </motion.div>
          )}
          <p className={classes.message}>{message}</p>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ProfileComponent;
