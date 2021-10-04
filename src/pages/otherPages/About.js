import {
  facebook,
  github,
  instagram,
  tiktok,
  twitter,
  youtube,
} from "../../UI/svgs/icons";

import classes from "./About.module.css";

const About = () => {
  return (
    <section className={classes.about}>
      <p>
        We, here at ViewNews, are the ones who always love to stay up to date
        with all the news in the world. We are passionate about knowledge and
        education. That is why we have brought you a mean to get all the
        information that is needed to stay up to date in this world. We bring
        news from all over the globe and also provide a way to search for any
        news that has happened in the past few days so that you do not miss out
        on anything.
      </p>
      <p>
        We are also pleased to inform you that we have included 'Articles' as
        well so that it is not only the news that you will get but also
        researches, surveys and other educational stuff for you and your family.
        Have something to share or want to make a suggestion?
      </p>
      <div>
        <span>
          Address: 432 newsOne Lane, Holy Moly District, Not Asgard, N1N 1N1
        </span>
        <br />
        <span>Phone: 999-NEW-N1N1 Email: viewNews@whatever.com</span>
      </div>
      <div>
        <h4>Or Follow us on Social Media:</h4>
        <div className={classes["about-links"]}>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            {twitter}
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            {instagram}
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            {facebook}
          </a>
          <a href="https://youtube.com/" target="_blank" rel="noreferrer">
            {youtube}
          </a>
          <a href="https://tiktok.com/" target="_blank" rel="noreferrer">
            {tiktok}
          </a>
          <a
            href="https://github.com/the-dever"
            target="_blank"
            rel="noreferrer"
          >
            {github}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
