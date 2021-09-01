import React, { useState } from "react";
import Users from "./components/users.jsx";
import api from "./api";
import SearchStatus from "./components/searchStatus.jsx";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(
            users.filter((user) => {
                return user._id !== userId;
            })
        );
    };
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
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </div>
    );
};

export default App;
