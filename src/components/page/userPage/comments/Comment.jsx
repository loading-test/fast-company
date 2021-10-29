import React from "react";
import { useEffect, useState } from "react";
import api from "../../../../api";
import PropTypes from "prop-types";
import { convertDate } from "../../../../utils/convertDate";

const Comment = ({ data, onRemove }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.users.getById(data.userId).then((user) => setUser(user));
  }, []);

  const date = new Date(parseInt(data.created_at));
  const currentDate = new Date();
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  return (
    <div className="d-flex flex-start">
      <img
        src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
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
              {user.name}{" "}
              <span className="small">{convertDate(data.created_at)}</span>
            </p>
            <button
              className="btn btn-sm text-primary d-flex align-items-center"
              onClick={() => onRemove(data._id)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <p className="small mb-0">{data.content}</p>
        </div>
      </div>
    </div>
  );
};
Comment.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onRemove: PropTypes.func,
};

export default Comment;
