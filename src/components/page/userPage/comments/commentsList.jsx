import React from "react";
import PropTypes from "prop-types";

const CommentsList = ({ user }) => {
  return (
    <div className="card mb-3">
      <div className="card-body ">
        <h2>Comments</h2>
        <hr />
        <div className="d-flex flex-start ">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
              Math.random() + 1
            )
              .toString(36)
              .substring(7)}.svg`}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="65"
            height="65"
          />
          <div className="flex-grow-1 flex-shrink-1">
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1 ">
                  {user.name}
                  <span className="small">//Published Time</span>
                </p>
                <button className="btn btn-sm text-primary d-flex align-items-center">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <p className="small mb-0">//Comment content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
CommentsList.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CommentsList;
