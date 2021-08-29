import React from "react";

const BookMark = ({ status, ...rest }) => {
    console.log(status)
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};

export default BookMark;
