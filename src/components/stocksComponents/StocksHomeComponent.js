import classes from "./StocksHomeComponent.module.css";
import StocksContainer from "./StocksContainer";

const StocksHomeComponent = () => {
  return (
    <section className={classes["section-stocks"]}>
      <StocksContainer />
    </section>
  );
};

export default StocksHomeComponent;
