import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        console.log("logout");
        logOut();
    }, []);
    return <h1>Loading</h1>;
};

export default LogOut;
