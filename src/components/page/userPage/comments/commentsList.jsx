import React, { useEffect, useState } from "react";
import api from "../../../../api";
import Comment from "./Comment";
import PropTypes from "prop-types"
import NewComment from "./newComment";
import _ from "lodash";

const CommentsList = ({ userId }) => {
    const [comment, setComment] = useState();

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComment(data));
    }, []);
    console.log(comment);

    const addComment = (com) => {
        setComment([...comment, com])
    }

    const handleRemoveComment = (id) => {
       api.comments.remove(id).then((id) => setComment(comment.filter((x) => x._id !== id)))
    };

    const sortedComment = _.orderBy(comment, ["created_at"], ["desc"])

    if (comment) {
        return (
            <>
            <NewComment addComment={addComment} />
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {sortedComment.map((data) => (
                        <Comment data={data} onRemove={handleRemoveComment} key={data._id} />
                    ))}
                </div>
            </div>
            </>
        );
    }
    return "Loading";
};
CommentsList.propTypes ={
    id: PropTypes.string
}

export default CommentsList;
