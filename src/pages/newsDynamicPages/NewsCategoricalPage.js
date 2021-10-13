import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DynamicArticleNews from "../../components/dynamicNewsComponents/DynamicArticleNews";
import classes from "./NewsCategoricalPage.module.css";
import Loader from "../../UI/Loader";
import { newsKey } from "../../context/keys";

const headingVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: { delay: 0.3 },
  },
};

const NewsCategoricalPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const categoryTitle = `${params.id[0].toUpperCase()}${params.id.slice(
    1,
    params.id.length
  )}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/${params.id}.json?api-key=${newsKey}`
        );
        if (!response || !response.ok)
          throw new Error("News data cannot be found");
        const data = await response.json();
        setLoading(false);
        setData(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [params.id]);

  if (!data) return <Loader></Loader>;

  return (
    <section className={classes["news-categorical-section"]}>
      {loading && <Loader />}
      <motion.h1 variants={headingVariants} initial="hidden" animate="visible">
        {categoryTitle} Headlines From Around The World
      </motion.h1>
      {data.length !== 0 && (
        <DynamicArticleNews data={data} loading={loading} />
      )}
      {data.length === 0 && (
        <div className={classes["no-content"]}>
          <h1>No {categoryTitle} Headlines were recieved for today</h1>
        </div>
      )}
    </section>
  );
};

export default NewsCategoricalPage;
