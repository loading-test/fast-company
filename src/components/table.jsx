import React from "react";
import PropType from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    onSort: PropType.func,
    selectedSort: PropType.object,
    columns: PropType.object,
    data: PropType.array,
    children: PropType.array
};

export default Table;
