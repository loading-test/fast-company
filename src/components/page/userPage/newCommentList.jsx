import React, { useEffect, useState } from "react";
import SelectField from "../../common/form/selectField";
import api from "../../../api";
import MeetingsCard from "./meetingsCard";

const NewCommentList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleChange = (target) => {
    console.log(target.name, target.value);
    setUsers((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
    <div className="card mb-3">
      <div className="card-body ">
        <h2>New comment</h2>
        <SelectField
          defaultOption="Выберите пользователя"
          options={users}
          onChange={handleChange}
        />
        <label htmlFor="textaria">Сообщение</label>
        <div className="form-floating">
          <textarea
            className="form-control"
            id="floatingTextarea2"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default NewCommentList;
