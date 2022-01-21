import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    getProfessionLoadingStatus,
    getProfessionsById,
    loadProfessionsList
} from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getProfessionLoadingStatus());
    const getProfession = useSelector(getProfessionsById(id));

    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    const prof = getProfession;

    if (!isLoading) {
        return <p>{prof.map((p) => p.name)}</p>;
    } else return "loading ...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
