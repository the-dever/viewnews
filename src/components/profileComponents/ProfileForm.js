import { motion } from "framer-motion";
import { useRef } from "react";

import classes from "./ProfileForm.module.css";

const containerVariants = {
  hidden: { x: "-100vw" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const ProfileForm = (props) => {
  const pictureInputRef = useRef("");
  const nameInputRef = useRef("");
  const dateInputRef = useRef();
  const addressInputRef = useRef("");
  const phoneInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://task-a3688-default-rtdb.firebaseio.com/${props.userId}/userInfo.json`,
        {
          method: "POST",
          body: JSON.stringify({
            profilePicture: pictureInputRef.current.value,
            name: nameInputRef.current.value,
            date: dateInputRef.current.value,
            address: addressInputRef.current.value,
            phone: phoneInputRef.current.value,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Something went wrong!");

      props.editProfileHandler();
    } catch (error) {
      console.log(error.message);
    }
  };

  /* ------------------------------------------------ SCENARIO: WITH USER INFO DATA ------------------------------------------------ */

  return (
    <motion.form
      onSubmit={submitHandler}
      className={classes["profile-form"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3>EDIT PROFILE</h3>

      {!props.userInfo && (
        <>
          <div>
            <label htmlFor="profile-img">Profile Picture</label>
            <input
              type="url"
              placeholder="IMAGE URL"
              id="profile-img"
              ref={pictureInputRef}
            />
          </div>
          <div>
            <label htmlFor="profile-name">Full Name</label>
            <input
              type="text"
              placeholder="YOUR NAME"
              id="profile-name"
              ref={nameInputRef}
            />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" ref={dateInputRef} />
          </div>
          <div>
            <label htmlFor="profile-address">Address</label>
            <input
              type="text"
              placeholder="YOUR ADDRESS"
              id="profile-address"
              ref={addressInputRef}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="XXX-XXX-XXXX"
              ref={phoneInputRef}
            />
          </div>
        </>
      )}

      {props.userInfo && (
        <>
          <div>
            <label htmlFor="profile-img">Profile Picture</label>
            <input
              type="url"
              defaultValue={
                props.userInfo.profilePicture !==
                "https://images.unsplash.com/photo-1519400197429-404ae1a1e184?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                  ? props.userInfo.profilePicture
                  : ""
              }
              placeholder="IMAGE URL"
              id="profile-img"
              ref={pictureInputRef}
            />
          </div>
          <div>
            <label htmlFor="profile-name">Full Name</label>
            <input
              type="text"
              defaultValue={
                props.userInfo.name !== "Not Provided"
                  ? props.userInfo.name
                  : ""
              }
              placeholder="YOUR NAME"
              id="profile-name"
              ref={nameInputRef}
            />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              defaultValue={
                props.userInfo.date !== "Not Provided"
                  ? props.userInfo.date
                  : ""
              }
              id="dob"
              ref={dateInputRef}
            />
          </div>
          <div>
            <label htmlFor="profile-address">Address</label>
            <input
              type="text"
              defaultValue={
                props.userInfo.address2 !== "Not Provided"
                  ? props.userInfo.address2
                  : ""
              }
              placeholder="YOUR ADDRESS"
              id="profile-address"
              ref={addressInputRef}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="tel"
              defaultValue={
                props.userInfo.phone2 !== "Not Provided"
                  ? props.userInfo.phone2
                  : ""
              }
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="XXX-XXX-XXXX"
              ref={phoneInputRef}
            />
          </div>
        </>
      )}

      <div>
        <button type="button" onClick={props.editProfileHandler}>
          <span>CANCEL</span>
        </button>
        <button type="submit">
          <span>DONE</span>
        </button>
      </div>
    </motion.form>
  );
};

export default ProfileForm;
