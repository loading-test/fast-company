import React from "react";

import PropTypes from "prop-types";

const Search = ({ users }) => {
    return (
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
                type="search"
                className="form-control mt-3"
                placeholder="Search..."
                aria-label="Search"
            />
        </form>
    );
};
Search.propTypes = {
    users: PropTypes.array
};

export default Search;
