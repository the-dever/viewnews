import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { signout, signup, user } from "../../UI/svgs/icons";

import classes from "./NavigationAccount.module.css";

const NavigationAccount = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const goToSignup = () => {
    authCtx.btnNoAccount();
    history.push("/account");
  };

  const goToSignin = () => {
    authCtx.btnYesAccount();
    history.push("/account");
  };

  return (
    <>
      <li className={classes["nav-link"]}>Account</li>

      <div className={classes["account-container"]}>
        {!authCtx.loggedIn && <p>You are not Logged in.</p>}
        {authCtx.loggedIn && <p>Welcome back</p>}
        {!authCtx.loggedIn && (
          <button onClick={goToSignin}>SIGN IN {user}</button>
        )}
        {authCtx.loggedIn && (
          <button onClick={() => history.push("/account/profile")}>
            PROFILE {user}
          </button>
        )}
        {authCtx.loggedIn && (
          <button onClick={authCtx.btnLogoutHandler}>LOG OUT {signout}</button>
        )}
        {!authCtx.loggedIn && (
          <button onClick={goToSignup}>SIGN UP {signup}</button>
        )}
      </div>
    </>
  );
};

export default NavigationAccount;
