import CurrencyHomeComponent from "../../components/currencyComponents/CurrencyHomeComponent";
import CurrencyMainImage from "../../components/currencyComponents/CurrencyMainImage";
import classes from "./CurrencyPage.module.css";

const CurrencyPage = () => {
  return (
    <section className={classes["currency-main-component"]}>
      <CurrencyMainImage />
      <CurrencyHomeComponent />
    </section>
  );
};

export default CurrencyPage;
