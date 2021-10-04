import { useContext } from "react";
import SigninComponent from "../../components/authenticationComponents/SigninComponent";
import SignupComponent from "../../components/authenticationComponents/SignupComponent";
import { AuthContext } from "../../context/auth-context";
import classes from "./AuthenticationPage.module.css";

const AuthenticationPage = () => {
  const authCtx = useContext(AuthContext);
  return (
    <section className={classes["authentication-section"]}>
      {!authCtx.hasAccount && <SignupComponent />}
      {authCtx.hasAccount && <SigninComponent />}
    </section>
  );
};

export default AuthenticationPage;
