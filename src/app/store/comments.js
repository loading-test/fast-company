import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFild: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addComments: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        deleteComment: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFild,
    addComments,
    deleteComment
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFild(error.message));
    }
};
export const createComments = (data) => async (dispatch, getState) => {
    const { users } = getState();

    const comment = {
        ...data,
        _id: nanoid(),
        created_at: Date.now(),
        userId: users.auth.userId
    };
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(addComments(content));
    } catch (error) {
        dispatch(commentsRequestFild(error.message));
    }
    console.log(comment);
};
export const removeComments = (id) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(deleteComment(id));
        }
    } catch (error) {
        dispatch(commentsRequestFild(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
