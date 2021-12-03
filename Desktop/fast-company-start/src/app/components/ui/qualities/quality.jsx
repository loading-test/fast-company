import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";
const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    console.log(getQuality(id));
    const { _id, color, name } = getQuality(id);
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
    // return "something";
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
