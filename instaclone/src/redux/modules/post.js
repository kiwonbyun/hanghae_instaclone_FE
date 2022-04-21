import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";

//action
const GETFIRSTPOST = "getFirstPost";
const GETNEXTPOST = "getNextPost";
const POSTLIKE = "postLike";
const DETAILPOSTLIKE = "detailPostLike";
const LOADING = "loading";
const POSTPREVIEW = "postPreview";

const UPLOADPOST = "uploadPost";
const GETDETAILPOST = "getDetailPost";
const DELETEPOST = "deletePost";
const EDITPOST = "editPost";
const COMMENT_MAINTOPOST = "commentMainToPost";

//init
const initialState = {
  list: [],
  paging: { start: null, next: null, lastPage: false },
  is_loading: false,
};

//action creators
const getFirstPost = createAction(GETFIRSTPOST, (post_list, paging) => ({
  post_list,
  paging,
}));
const getNextPost = createAction(GETNEXTPOST, (post_list, paging) => ({
  post_list,
  paging,
}));
const postLike = createAction(POSTLIKE, (post) => ({ post }));
const detailPostLike = createAction(DETAILPOSTLIKE, (clicked) => ({ clicked }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const postPreview = createAction(POSTPREVIEW, (preview) => ({ preview }));
const uploadPost = createAction(UPLOADPOST, () => ({}));
const getDetailPost = createAction(GETDETAILPOST, (post) => ({ post }));
const deletePost = createAction(DELETEPOST, () => ({}));
const editPost = createAction(EDITPOST, (content) => ({ content }));
const commentMaintoPost = createAction(COMMENT_MAINTOPOST, (comment) => ({
  comment,
}));

//middlewares
const getFirstPostDB = (nickName) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      const response = await axiosInstance.post("/api/posts", {
        nickName,
        page: 1,
      });
      let paging = {
        start: 2,
        next: 3,
        lastPage: response.data.last,
      };
      if (response.status === 200) {
        dispatch(getFirstPost(response.data.content, paging));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const getNextPostDB = (nickName, page) => {
  return async function (dispatch, getState, { history }) {
    try {
      dispatch(loading(true));
      const response = await axiosInstance.post("/api/posts", {
        nickName,
        page,
      });
      // const response = RESP.POSTSPOST;
      let paging = {
        start: page + 1,
        next: page + 2,
        lastPage: response.data.last,
      };

      if (response.status === 200) {
        dispatch(getNextPost(response.data.content, paging));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const postLikeDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const response = await axiosInstance.post(`/api/likes/${postId}`);
    // const response = RESP.LIKEPOSTIDPOST;
    if (response.status === 200) {
      dispatch(
        postLike({
          postId,
          clicked: response.data.clicked,
        })
      );
    }
  };
};
const detailPostLikeDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const response = await axiosInstance.post(`/api/likes/${postId}`);
    // const response = RESP.LIKEPOSTIDPOST;
    dispatch(detailPostLike(response.data.clicked));
  };
};
const uploadPostDB = (formdata, config) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post("/api/post", formdata, config);
      // const response = RESP.POSTPOST;
      if (response.data.status === 200) {
        window.alert("게시물이 작성되었습니다.");
        dispatch(uploadPost());
        history.replace("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const getDetailPostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const user = getState().user.user;
    try {
      const response = await axiosInstance.post("/api/post/detail", {
        postId,
        nickName: user.nickName,
      });
      // const response = RESP.POSTDETAILPOST;
      dispatch(getDetailPost(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.delete(`/api/post/${postId}`);
      // const response = RESP.POSTPOSTIDDELETE;
      if (response.status === 200) {
        window.alert("게시물이 삭제되었습니다.");
        history.replace("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const editPostDB = (postId, content) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.put(`/api/post/${postId}`, {
        content,
      });
      // const response = RESP.POSTPOSTIDPUT;
      if (response.status === 200) {
        window.alert("게시물이 수정되었습니다.");
        history.replace(`/detail/${postId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default handleActions(
  {
    [GETFIRSTPOST]: (state, action) =>
      produce(state, (draft) => {
        // draft.list.push(...action.payload.post_list);
        draft.list = action.payload.post_list;
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),
    [GETNEXTPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        // draft.list = action.payload.post_list;
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),
    [DETAILPOSTLIKE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.clicked) {
          draft.detailPost.likeCnt += 1;
          draft.detailPost.clicked = true;
        } else if (!action.payload.clicked) {
          draft.detailPost.likeCnt -= 1;
          draft.detailPost.clicked = false;
        }
      }),
    [POSTLIKE]: (state, action) =>
      produce(state, (draft) => {
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
    [POSTPREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [UPLOADPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = null;
      }),
    [GETDETAILPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost = action.payload.post;
      }),
    [COMMENT_MAINTOPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.map((p) => {
          if (p.postId === action.payload.comment.postId) {
            p.commnetCnt += 1;
          }
        });
      }),
  },
  initialState
);

const actionCreators2 = {
  getFirstPost,
  getFirstPostDB,
  getNextPostDB,
  postLikeDB,
  postPreview,
  uploadPostDB,
  uploadPost,
  getDetailPostDB,
  detailPostLikeDB,
  deletePostDB,
  editPostDB,
  commentMaintoPost,
};

export { actionCreators2 };
