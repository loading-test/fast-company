import React from "react";
import Qualities from "../../ui/qualites/qualites";
import PropTypes from "prop-types";

const QualitiesCard = ({ user }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <Qualities qualities={user.qualities} />
        </p>
      </div>
    </div>
  );
};
QualitiesCard.propTypes = {
  user: PropTypes.object,
};

export default QualitiesCard;
