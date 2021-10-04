import { Link } from "react-router-dom";
import classes from "./DynamicPagination.module.css";

const DynamicPagination = ({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={classes["dynamic-pagination"]}>
      {pageNumbers.map((number) => (
        <li key={number}>
          {currentPage === number && (
            <Link
              onClick={() => paginate(number)}
              to="#"
              className={classes["dynamic-page-number"]}
            >
              {number}
            </Link>
          )}
          {currentPage !== number && (
            <Link onClick={() => paginate(number)} to="#">
              {number}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DynamicPagination;
