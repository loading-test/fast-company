import React, { useEffect, useState } from "react";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import api from "../../../api";
import _ from "lodash";
import UserTable from "../../usersTable";
import Search from "../../common/search";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [search, setSearch] = useState("");

    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.default.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(
            users.filter((user) => {
                return user._id !== userId;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

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
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
        setSelectedProf();
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : users;

        const searchUser = users.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        });

        const count = search ? searchUser.length : filteredUsers.length;

        const sortedUsers = _.orderBy(
            search ? searchUser : filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} users={users} />

                    {count && (
                        <>
                            <Search
                                search={search}
                                onChange={handleSearchChange}
                                name="search"
                            />
                            <UserTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
                            />
                        </>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default UsersListPage;
