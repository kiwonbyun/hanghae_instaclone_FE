import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";

//action
const GETPOST = "getPost";
const POSTLIKE = "postLike";

//init
const initialState = {
  is_loading: false,
  list: [],
};

//action creators
const getPost = createAction(GETPOST, (post_list) => ({ post_list }));
const postLike = createAction(POSTLIKE, (post) => ({ post }));
//middlewares
const getAllPostDB = (nickName) => {
  return async function (dispatch, getState, { history }) {
    try {
      // const response = await axiosInstance.post("/api/posts", {
      //   nickName,
      // });
      const response = RESP.POSTSPOST;
      if (response) {
        dispatch(getPost(response));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const postLikeDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    // const response = await axiosInstance.post(`/api/likes/${postId}`);
    const response = RESP.LIKEPOSTIDPOST;
    if (response.status === 200) {
      dispatch(
        postLike({
          postId,
          clicked: response.clicked,
        })
      );
    }
  };
};

//reducer
export default handleActions(
  {
    [GETPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.is_loading = true;
      }),
    [POSTLIKE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.post);
        if (action.payload.post.clicked === true) {
          draft.list.map((post) => {
            if (post.postId === action.payload.post.postId) {
              post.clicked = true;
              post.likeCnt += 1;
            }
          });
        } else if (action.payload.post.clicked === false) {
          draft.list.map((post) => {
            if (post.postId === action.payload.post.postId) {
              post.clicked = false;
              post.likeCnt -= 1;
            }
          });
        }
      }),
  },
  initialState
);

const actionCreators2 = {
  getPost,
  getAllPostDB,
  postLikeDB,
};

export { actionCreators2 };
