import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { axiosInstance } from "../../shared/request";
import jwt_decode from "jwt-decode";

//action
const GETUSER = "GetUser";

//init
const initialState = {
  user: null,
  is_login: false,
};

//action creators
const getUser = createAction(GETUSER, (user) => ({ user }));

//reducer
export default handleActions(
  {
    [GETUSER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);
const actionCreators = {
  getUser,
};
export { actionCreators };
