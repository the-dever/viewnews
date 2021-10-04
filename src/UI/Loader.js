import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes["load-wrapp"]}>
      <div className={classes["load-2"]}>
        <div className={classes["line"]}></div>
        <div className={classes["line"]}></div>
        <div className={classes["line"]}></div>
      </div>
    </div>
  );
};

export default Loader;
