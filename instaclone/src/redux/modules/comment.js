import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";

//action
const GETCOMMENT = "getComment";
//init
const init = {
  list: [],
};

//action creators
const getComment = createAction(GETCOMMENT, (comment_list) => ({
  comment_list,
}));

//middleware
const getCommentDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      //   const response = await axiosInstance.get(`/api/comment/${postId}`);
      const response = RESP.COMMENTPOSTIDGET;
      dispatch(getComment(response));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer
export default handleActions(
  {
    [GETCOMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment_list;
      }),
  },
  init
);

const actionCreators3 = {
  getComment,
  getCommentDB,
};
export { actionCreators3 };
