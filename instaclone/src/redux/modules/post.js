import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";

//action
const GETPOST = "getPost";
const POSTLIKE = "postLike";
const LOADING = "loading";
//init
const initialState = {
  list: [],
  paging: { start: null, next: null },
  is_loading: false,
};

//action creators
const getPost = createAction(GETPOST, (post_list, paging) => ({
  post_list,
  paging,
}));
const postLike = createAction(POSTLIKE, (post) => ({ post }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
//middlewares
const getFirstPostDB = (nickName) => {
  console.log("난 getFirstPostDB다", nickName);
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      // const response = await axiosInstance.post("/api/posts", {
      //   nickName,
      //   page: 1,
      // });
      const response = RESP.POSTSPOST;
      let paging = {
        start: 2,
        next: 3,
      };
      dispatch(getPost(response, paging));
    } catch (err) {
      console.log(err);
    }
  };
};

const getNextPostDB = (nickName, page) => {
  console.log("난 getNextPostDB다", nickName, page);
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      // const response = await axiosInstance.post("/api/posts", {
      //   nickName,
      //   page,
      // });
      const response = RESP.POSTSPOST;
      let paging = {
        start: page + 1,
        next: page + 2,
      };
      console.log(paging);
      if (response) {
        dispatch(getPost(response, paging));
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
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
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
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators2 = {
  getPost,
  getFirstPostDB,
  getNextPostDB,
  postLikeDB,
};

export { actionCreators2 };
