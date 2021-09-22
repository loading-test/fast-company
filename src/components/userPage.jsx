import React, { useEffect, useState } from "react";
import api from "../api";
import PropTypes from "prop-types";
import Quality from "./quality";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.default.getById(id).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${user.profession.name}`}</h2>
                {user.qualities.map((qual) => (
                    <Quality {...qual} key={qual._id} />
                ))}
                <p>{`completedMeetings: ${user.completedMeetings}`}</p>
                <h2>{`Rate: ${user.rate}`}</h2>
            </div>
        );
    } else {
        return <h2>Loading</h2>;
    }
};
UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
