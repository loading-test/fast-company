import React from "react";

import PropTypes from "prop-types";

const Search = ({ search, onChange, name }) => {
    return (
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
                type="search"
                className="form-control mt-3"
                placeholder="Search..."
                aria-label="Search"
                value={search}
                onChange={onChange}
                name={name}
            />
        </form>
    );
};
Search.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    search: PropTypes.string
};

export default Search;
