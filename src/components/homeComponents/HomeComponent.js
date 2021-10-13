import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { glasses, network, pen, search } from "../../UI/svgs/icons";
import Loader from "../../UI/Loader";

import classes from "./HomeComponent.module.css";
import { newsKey } from "../../context/keys";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  exit: {
    x: "-100vw",
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

const HomeComponent = () => {
  const [showForm, setShowForm] = useState(null);
  const [showAll, setShowAll] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const searchInputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${newsKey}`
        );
        if (!res.ok || !res) throw new Error("News data cannot be found.");
        const data = await res.json();
        setNewsData(data.results);
      } catch (err) {
        console.log(err.message);
        setErrorMessage("News data cannot be found. Please try again!");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const buttonShowFormHandler = () => {
    setShowForm(!showForm);
  };

  const buttonShowHandler = () => {
    setShowAll(!showAll);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSearched(true);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchInputRef.current.value}&api-key=${newsKey}`
      );
      if (!response.ok || !response)
        throw new Error("News data cannot be found.");
      const data = await response.json();
      console.log(data);
      setNewsData(data.response.docs);
    } catch (err) {
      setErrorMessage("News data cannot be found. Please try again!");
      console.log(err);
    }
    setLoading(false);
  };

  if (!newsData) return <Loader />;

  const content = showAll
    ? newsData
    : searched
    ? newsData.slice(0, 5)
    : newsData.slice(0, 10);
  const imgSrc =
    "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=649&q=80";

  // prettier-ignore
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

  return (
    <div className={classes["news-main-container"]}>
      {loading && <Loader />}
      {errorMessage && (
        <h1 className={classes["error-message"]}>{errorMessage}</h1>
      )}
      {!errorMessage && (
        <motion.div
          className={classes["news-container"]}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h2 variants={childVariants}>Recent Headlines</motion.h2>

          {!showForm && (
            <motion.button
              className={classes["btn-icon"]}
              variants={childVariants}
              onClick={buttonShowFormHandler}
            >
              {search}
            </motion.button>
          )}
          {showForm && (
            <motion.form
              className={classes["search-form"]}
              onSubmit={submitHandler}
              variants={childVariants}
              onBlur={buttonShowFormHandler}
            >
              <input
                className={classes["search-input"]}
                placeholder="SEARCH NEWS"
                ref={searchInputRef}
              ></input>
              <button className={classes["btn-search"]}>Search {search}</button>
            </motion.form>
          )}

          {!searched &&
            content.length > 0 &&
            content.map((data, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                style={{
                  backgroundImage: `linear-gradient(to right, #261c2cf2, #261c2cf2), url(${
                    data.multimedia && data.multimedia.length > 0
                      ? data.multimedia[0].url
                      : imgSrc
                  })`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                }}
              >
                <figure
                  variants={childVariants}
                  className={classes["news-img"]}
                >
                  <img
                    src={
                      data.multimedia && data.multimedia.length > 0
                        ? data.multimedia[0].url
                        : imgSrc
                    }
                    alt="news-img"
                  />
                </figure>
                <div
                  variants={childVariants}
                  className={classes["news-content-container"]}
                >
                  <p className={classes["news-title"]}>
                    ‘{data.title ? data.title : "Title Not Provided"}
                  </p>
                  <p className={classes["news-content"]}>
                    {data.abstract ? data.abstract : "Content Not Provided"}
                  </p>
                </div>
                <div
                  variants={childVariants}
                  className={classes["news-info-container"]}
                >
                  <p className={classes["news-author"]}>
                    {pen} Authoured by
                    <br /> {data.byline ? data.byline.slice(3) : "Not Provided"}
                  </p>
                  <p className={classes["news-date"]}>
                    {network} Published on <br />
                    {data.published_date
                      ? `${
                          months[new Date(data.published_date).getMonth()]
                        } ${String(
                          new Date(data.published_date).getDate()
                        ).padStart(2, 0)}, ${new Date(
                          data.published_date
                        ).getFullYear()}`
                      : "Not Provided"}
                  </p>
                  <p>
                    {glasses} Read more on <br />
                    <a
                      className={classes["news-link"]}
                      href={data.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      NEW York Times
                    </a>
                  </p>
                </div>
              </motion.div>
            ))}

          {searched &&
            content.length > 0 &&
            content.map((data, i) => (
              <motion.div
                key={i}
                variants={childVariants}
                style={{
                  backgroundImage: `linear-gradient(to right, #261c2cf2, #261c2cf2), url(${
                    data.multimedia.length > 0
                      ? `https://static01.nyt.com/${data.multimedia[0].url}`
                      : imgSrc
                  })`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                }}
              >
                <figure
                  variants={childVariants}
                  className={classes["news-img"]}
                >
                  <img
                    src={
                      data.multimedia.length > 0
                        ? `https://static01.nyt.com/${data.multimedia[0].url}`
                        : imgSrc
                    }
                    alt="news-img"
                  />
                </figure>
                <div
                  variants={childVariants}
                  className={classes["news-content-container"]}
                >
                  <p className={classes["news-title"]}>
                    ‘{data.headline ? data.headline.main : "Title Not Provided"}
                  </p>
                  <p className={classes["news-content"]}>
                    {data.abstract ? data.abstract : "Content Not Provided"}
                  </p>
                </div>
                <div
                  variants={childVariants}
                  className={classes["news-info-container"]}
                >
                  <p className={classes["news-author"]}>
                    {pen} Authoured by
                    <br />{" "}
                    {data.byline.original
                      ? data.byline.original.slice(3)
                      : "Not Provided"}
                  </p>
                  <p className={classes["news-date"]}>
                    {network} Published on <br />
                    {data.pub_date
                      ? `${months[new Date(data.pub_date).getMonth()]} ${String(
                          new Date(data.pub_date).getDate()
                        ).padStart(2, 0)}, ${new Date(
                          data.pub_date
                        ).getFullYear()}`
                      : "Not Provided"}
                  </p>
                  <p>
                    {glasses} Read more on <br />
                    <a
                      className={classes["news-link"]}
                      href={data.web_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      NEW York Times
                    </a>
                  </p>
                </div>
              </motion.div>
            ))}
          <button className={classes["btn-show"]} onClick={buttonShowHandler}>
            <span>{showAll ? "SHOW LESS" : "SHOW ALL"}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default HomeComponent;
