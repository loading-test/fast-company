import React, { useEffect, useState } from "react";
import Users from "./components/users.jsx";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.default.fetchAll());

    const handleDelete = (userId) => {
        setUsers(
            users.filter((user) => {
                return user._id !== userId;
            })
        );
    };
    useEffect(() => {
        api.users.default.fetchAll().then((data) => {
            setUsers(data);
        });
    });
    const handleToggleBookMark = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            })
        );
        console.log(id);
    };

    return (
        <div>
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </div>
    );
};

export default App;
