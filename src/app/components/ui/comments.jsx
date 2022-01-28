import { orderBy } from "lodash";
import React from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    createComments,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComments
} from "../../store/comments";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        dispatch(createComments(data, userId));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComments(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
