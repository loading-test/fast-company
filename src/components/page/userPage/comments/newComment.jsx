import React, { useEffect, useState } from "react";
import SelectField from "../../../common/form/selectField";
import api from "../../../../api";
import { useParams } from "react-router";
import PropTypes from "prop-types";

const NewComment = ({ addComment }) => {
  const { userId } = useParams();
  const [users, setUsers] = useState();
  const [value, setValue] = useState({
    content: "",
    userId: "",
    pageId: userId,
  });

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    console.log("New comment", value);
  }, [value]);

  const handleChange = (target) => {
    setValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.comments.add(value);
    addComment(value);
    setValue({ content: "", userId: "" });
  };

  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      name: users[userId].name,
      value: users[userId]._id,
    }));

  return (
    <div className="card mb-3">
      <div className="card-body ">
        <h2>New comment</h2>
        <form onSubmit={handleSubmit}>
          <SelectField
            onChange={handleChange}
            options={arrayOfUsers}
            name="userId"
            value={value.userId}
            defaultOption="Выберите пользователя"
          />
          <label htmlFor="textaria">Сообщение</label>
          <div className="form-floating ">
            <textarea
              className="form-control"
              id="textaria"
              rows="3"
              name="content"
              value={value.content}
              onChange={(event) => handleChange(event.target)}
            ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary mt-3">
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
NewComment.propTypes = {
  addComment: PropTypes.func,
};

export default NewComment;
