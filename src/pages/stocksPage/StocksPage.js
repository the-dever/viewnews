import StocksHomeComponent from "../../components/stocksComponents/StocksHomeComponent";
import StocksMainImage from "../../components/stocksComponents/StocksMainImage";
import classes from "./StocksPage.module.css";

const StocksPage = () => {
  return (
    <section className={classes["stocks-main-component"]}>
      <StocksMainImage />
      <StocksHomeComponent />
    </section>
  );
};

export default StocksPage;
