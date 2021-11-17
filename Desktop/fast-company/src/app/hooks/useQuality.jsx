import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/qulity.service";
import PropTypes from "prop-types";

const QualitiesContex = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContex);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualities();
    }, []);

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    const getQualities = async () => {
        try {
            const { content } = await qualityService.fetchAll();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <QualitiesContex.Provider
            value={{
                isLoading,
                qualities,
                getQuality
            }}
        >
            {!isLoading ? children : "<h1>Qualities Loading...</h1>"}
        </QualitiesContex.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
