import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link">Previous</a>
                </li>
                {pages.map((page) => (
                    <li
                        className={
                            "page-item " +
                            (page === currentPage ? "active" : "")
                        }
                        key={page}
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link">Next</a>
                </li>
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
