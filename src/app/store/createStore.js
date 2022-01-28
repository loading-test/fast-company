import commentsReducer from "./comments";
import professionReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionReducer,
    users: usersReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
