import React, { useEffect, useState } from "react";
import SelectField from "../../common/form/selectField";
import api from "../../../api";

const NewCommentList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  return (
    <div className="card mb-3">
      <div className="card-body ">
        <h2>New comment</h2>
        <SelectField />
      </div>
    </div>
  );
};

export default NewCommentList;
