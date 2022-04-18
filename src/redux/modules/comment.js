import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";

// action type
const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";
const DELETE = "DELETE";

// action creator
const addComment = createAction(ADD_COMMENT, (user) => ({ user }));
const getComment = createAction(GET_COMMENT, (comment) => ({ comment }));
const deleteComment = createAction(DELETE, (commentInfo) => ({ commentInfo }));


const initialState = {
    list: []
};

// middleWare
const addCommentSP = (postId, comment, token) => {
    return function (dispatch, getState) {

        console.log(comment)
        axios
            .post(
                `http://3.38.162.11:8080/api/comment/${postId}`,
                {
                    token,
                    comment: comment,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                // dispatch(addComment);
            })
            .catch((err) => {
                console.log(err)
            });
    };
};

const getCommentSP = (postId, token) => {
    return function (dispatch) {
        axios
            .get(`http://3.38.162.11:8080/api/comment/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const post = res.data;
                dispatch(getComment(post));
                console.log(post)
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const deleteCommentSP = (commentId, token) => {
    return function (dispatch) {
        axios
            .delete(`http://3.38.162.11:8080/api/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                dispatch(deleteComment(commentId));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

// reducer
export default handleActions(
    {
        [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
                draft.comment.unshift(action.payload.user);
            }),
        [GET_COMMENT]: (state, action) => produce(state, (draft) => {
                // console.log(action.payload.comment);
                draft.comment = action.payload.comment;
            }),
        [DELETE]: (state, action) => produce(state, (draft) => {
                // console.log(state.comment);
                const index = state.comment.indexOf(action.payload.commentInfo);
                // console.log(draft.comment);
                draft.comment.splice(index, 1);
            }),
        // [NEW_COMMENT]: (state, action) => produce(state, (draft) => {
        //     let idx = draft.list.findIndex(
        //         (p) => p.postId === action.payload.postId
        //     );
        //     draft.list[idx].commentList.push("count를위해추가");
        //     // console.log(draft.list[idx])
        //     // console.log(state.list[idx]); // 위치 체크용 state.
        // }),
    },
    initialState
);

const actionCreators = {
    addCommentSP,
    getCommentSP,
    deleteCommentSP,
};

export { actionCreators };