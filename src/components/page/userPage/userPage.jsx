import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualites/qualites";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  const history = useHistory();
  const editUser = (id) => {
    history.push(`/users/${id}/edit`);
  };

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>{`Профессия: ${user.profession.name}`}</h2>
        <Qualities qualities={user.qualities} />
        <p>{`completedMeetings: ${user.completedMeetings}`}</p>
        <h2>{`Rate: ${user.rate}`}</h2>
        <button onClick={() => editUser(id)}>Изменить</button>
      </div>
    );
  } else {
    return <h2>Loading</h2>;
  }
};
UserPage.propTypes = {
  id: PropTypes.string,
};

export default UserPage;
