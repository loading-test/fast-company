import React from "react";
import { useParams } from "react-router-dom";
import Users from "../layouts/users";
import UserPage from "./userPage";

const UsersList = () => {
    const params = useParams();
    const { userId } = params;

    return <> {userId ? <UserPage id={userId} /> : <Users />}</>;
};

export default UsersList;
