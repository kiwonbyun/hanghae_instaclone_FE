import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment";

import {Grid, Button, Input, Text} from "../element/index"
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const AddComment = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const token = sessionStorage.getItem("jwt_token");

    const [comment, setComment] = useState("");

    const commentWrite = (e) => {
        setComment(e.target.value)
    }

    const addComment = () => {
        dispatch(
            commentActions.addCommentSP({
                comment: comment,
                token
            })
        );
        // navigate(`/detail/${id}`);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent : "space-around",
            margin: "auto"
        }}>
            <div style={{ width: "90%" }}>
                <Input
                    multiLine
                    _onChange={commentWrite}
                    padding="12px 4px"
                    margin="0 auto"
                    width="100%"
                    placeholder="댓글 입력..."
                    border="1px solid #fff"
                    rows={1}
                />
            </div>
            <div style={{ width: "10%" }}>
                <Text
                    cursor="pointer"
                    size="15px"
                    color="#0095f6"
                    align="center"
                    _onClick={addComment}
                >게시</Text>
            </div>
        </div>
    );
};

export default AddComment;