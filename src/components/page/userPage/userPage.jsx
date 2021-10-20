import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "./userCard";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";
import NewCommentList from "./newCommentList";

const UserPage = ({ id }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} id={id} />
            <QualitiesCard user={user} />
            <MeetingsCard user={user} />
          </div>
          <div className="col-md-8">
            <NewCommentList />
          </div>
        </div>
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
};
UserPage.propTypes = {
  id: PropTypes.string,
};

export default UserPage;
