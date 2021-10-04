import HomeComponent from "../../components/homeComponents/HomeComponent";
import HomeMainImage from "../../components/homeComponents/HomeMainImage";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={classes["home-main-component"]}>
      <HomeMainImage />
      <HomeComponent />
    </section>
  );
};

export default HomePage;
