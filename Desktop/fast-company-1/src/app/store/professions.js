import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlise = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professinsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFild: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionReducer, actions } = professionsSlise;
const { professinsRequested, professionsReceved, professionsRequestFild } =
    actions;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDated(lastFetch)) {
        dispatch(professinsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceved(content));
        } catch (error) {
            dispatch(professionsRequestFild(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionsById = (professionId) => (state) => {
    if (state.professions.entities) {
        const professionsArray = [];
        for (const profId of state.professions.entities) {
            if (profId._id === professionId) {
                professionsArray.push(profId);
            }
        }
        return professionsArray;
    }
    return [];
};

export default professionReducer;
