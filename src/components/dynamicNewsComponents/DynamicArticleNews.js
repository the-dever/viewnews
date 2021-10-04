import { useState } from "react";

import Loader from "../../UI/Loader";
import DynamicContent from "./DynamicContent";
import DynamicPagination from "./DynamicPagination";

import classes from "./DynamicArticleNews.module.css";

const DynamicArticleNews = (props) => {
  const [currentPage, setCurrentPage] = useState();
  const [postsPerPage] = useState(6);

  if (!props.data) return <Loader />;

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={classes["dynamic-article-news-container"]}>
      {props.loading && <Loader />}
      <DynamicContent
        currentPosts={currentPosts}
        loading={props.loading}
        paginate={paginate}
      />
      <DynamicPagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={props.data.length}
        paginate={paginate}
      />
    </div>
  );
};

export default DynamicArticleNews;
