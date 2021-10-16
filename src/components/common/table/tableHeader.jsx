import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const buttonSort = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-up-fill"></i>;
            } else {
                return <i className="bi bi-caret-down-fill"></i>;
            }
        }
        return null;
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((colum) => (
                    <th
                        key={colum}
                        onClick={
                            columns[colum].path
                                ? () => handleSort(columns[colum].path)
                                : undefined
                        }
                        {...{
                            role: columns[colum].path && "button"
                        }}
                        scope="col"
                    >
                        {columns[colum].name}
                        {buttonSort(selectedSort, columns[colum].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
