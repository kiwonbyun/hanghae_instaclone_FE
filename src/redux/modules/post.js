import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const GET_DETAIL = "GET_DETAIL";
const IS_LIKE = "IS_LIKE";
const NEW_COMMENT = "NEW_COMMENT";

// action type
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post_list) => ({ post_list }));
const editPost = createAction(EDIT_POST, (image, content, postId) => ({
    image,
    content,
    postId,
}));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));
const like = createAction(IS_LIKE, (postId, userId) => ({ postId, userId }));


const initialState = {
    list: [],
    detail: false,
};

const initialPost = {
    content: "",
    imgUrl:
        "https://newsimg.hankookilbo.com/cms/articlerelease/2021/06/05/ef519975-80c8-40b6-b25a-47ab6270dc60.png",
    postDate: moment().format("YYYY-MM-DD"),
    title: "",
    // uid: "키값",
    // userId:"값",
    area: "",
};

const addPostDB = (image, content, token, navigate) => {
    return function (dispatch, getState) {

        console.log(image)
        console.log(content)

        const frm = new FormData();
        frm.append("image", image);
        frm.append("content", content);

        axios
            .post("http://3.38.162.11:8080/api/post", frm, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // let postList = res.data;
                console.log(res.data)
                // navigate("/");
                // dispatch(addPost(postList));
            })
            .catch((err) => {
                alert("이미지를 추가해 주세요");
                console.log(err.response);
            });
    };
};


const editPostDB = (image, content, postId, token, navigate) => {
    return function (dispatch, getState,) {

        const frm = new FormData();
        frm.append("content", content);

        axios
            .put(`http://3.38.162.11:8080/api/posts/${postId}`, frm, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data)
                // navigate("/");
                // dispatch(editPost(content, postId));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const deletePostDB = (postId, token, navigate) => {
    return function (dispatch, getState) {

        axios
            .delete(`http://3.38.162.11:8080/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data)
                // navigate("/");
                // dispatch(deletePost(postId));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const likePost = (postId, token, userId) => {
    return function (dispatch, getState) {

        axios
            .post(
                `/api/likes/${postId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                dispatch(like(postId, userId));
            });
    };
};

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
                draft.list = action.payload.post_list;
            }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {
                draft.list.unshift(action.payload.post_list);
                // draft.list = action.payload.post;
            }),

        [EDIT_POST]: (state, action) => produce(state, (draft) => {
                let index = draft.list.findIndex(
                    (l) => l.postId === action.payload.postId
                );
                draft.list[index] = {
                    ...draft.list[index],
                    ...action.payload.new_post,
                };
            }),
        [DELETE_POST]: (state, action) => produce(state, (draft) => {
                let new_post_list = draft.list.filter((target) => {
                    if (target.postId !== action.payload.post) {
                        return target;
                    }
                });
                draft.list = new_post_list;
            }),
        [IS_LIKE]: (state, action) => produce(state, (draft) => {
                let idx = draft.list.findIndex(
                    (p) => p.postId === action.payload.postId
                );
                let likeIndex = draft.list[idx].likeList.findIndex(
                    (p) => p.userId === action.payload.userId
                );

                const is_like = { userId: action.payload.userId };
                likeIndex === -1
                    ? draft.list[idx].likeList.push(is_like)
                    : draft.list[idx].likeList.splice(likeIndex);
            }),
    },
    initialState
);


const actionCreators = {
    setPost,
    addPostDB,
    editPostDB,
    deletePostDB,
    likePost,
};

export { actionCreators };