import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { AuthContext } from "./context/auth-context";

import About from "./pages/otherPages/About";
import Contact from "./pages/otherPages/Contact";

import HomePage from "./pages/homePage/HomePage";
import WeatherPage from "./pages/weatherPages/WeatherPage";
import CurrencyPage from "./pages/currencyPage/CurrencyPage";
import StocksPage from "./pages/stocksPage/StocksPage";
import ErrorPage from "./pages/errorPage/ErrorPage";

import NewsCategoricalPage from "./pages/newsDynamicPages/NewsCategoricalPage";
import AuthenticationPage from "./pages/authenticationPage/AuthenticationPage";
import ProfilePage from "./pages/profilePages/ProfilePage";
import BlogPage from "./pages/profilePages/BlogPage";

import Navigation from "./components/headerComponents/Navigation";
import Footer from "./components/footerComponents/Footer";
import WeatherDetails from "./pages/weatherPages/WeatherDetails";
import Layout from "./UI/Layout";
import Sidebar from "./components/sidebarComponents/Sidebar";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <Navigation />

      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Layout>
            <Sidebar />
            <HomePage />
          </Layout>
        </Route>
        <Route path="/home_weather">
          <Layout>
            <Sidebar />
            <WeatherPage />
          </Layout>
        </Route>
        <Route path="/home_currency">
          <Layout>
            <Sidebar />
            <CurrencyPage />
          </Layout>
        </Route>
        <Route path="/home_stocks">
          <Layout>
            <Sidebar />
            <StocksPage />
          </Layout>
        </Route>

        <Route path="/weather/:id">
          <WeatherDetails />
        </Route>

        <Route path="/news/:id">
          <NewsCategoricalPage />
        </Route>

        <Route path="/account/myblogs_:id">
          {authCtx.loggedIn && <BlogPage />}
          {!authCtx.loggedIn && <Redirect to="/account"></Redirect>}
        </Route>

        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/account" exact>
          {authCtx.loggedIn && <Redirect to="/account/profile"></Redirect>}
          <AuthenticationPage />
        </Route>
        <Route path="/account/profile" exact>
          {authCtx.loggedIn && <ProfilePage />}
          {!authCtx.loggedIn && <AuthenticationPage />}
        </Route>

        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
