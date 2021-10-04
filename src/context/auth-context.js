import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: "",
  hasAccount: null,
  btnNoAccount: () => {},
  btnYesAccount: () => {},
  loggedIn: null,
  btnLoginHandler: () => {},
  btnLogoutHandler: () => {},
  isLoading: null,
  postSignupSigninRequest: () => {},
});

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState("");
  const [hasAccount, setHasAccount] = useState(null);
  const [loggedIn, setLoggedIn] = useState(initialToken);
  const [isLoading, setIsLoading] = useState(null);

  const btnNoAccount = () => setHasAccount(false);

  const btnYesAccount = () => setHasAccount(true);

  const btnLogoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("blogId");
  };

  const btnLoginHandler = () => {
    setLoggedIn(true);

    setTimeout(btnLogoutHandler, 3600000);
  };

  const postSignupSigninRequest = (url, email, password) => {
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          btnLoginHandler();
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message)
              errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        window.location.reload();
        setToken(data.tokenId);
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("userId", data.localId);
      })
      .catch((err) => alert(err.message));
  };

  const store = {
    token,
    hasAccount,
    btnNoAccount,
    btnYesAccount,
    loggedIn,
    btnLoginHandler,
    btnLogoutHandler,
    isLoading,
    postSignupSigninRequest,
  };
  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
