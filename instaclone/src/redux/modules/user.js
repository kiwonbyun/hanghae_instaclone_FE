import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import jwt_decode from "jwt-decode";
import { RESP } from "../../response";

//action
const GETUSER = "GetUser";
const LOGOUT = "Logout";
const SETPREVIEW = "setPreview";

//init
const initialState = {
  user: null,
  is_login: false,
};

//action creators
const getUser = createAction(GETUSER, (user) => ({ user }));
const logOut = createAction(GETUSER, () => ({}));
const setPreview = createAction(SETPREVIEW, (preview) => ({ preview }));

//middleware
const singUpDB = (userEmail, userName, nickName, password, profileImg) => {
  return async function (dispatch, getState, { history }) {
    try {
      // const response = await axiosInstance.post(
      //   "/api/user/signup",
      //   {
      //     userEmail,
      //     userName,
      //     nickName,
      //     password,
      //     profileImg,
      //   }
      // );
      const response = RESP.USERSIGNUPPOST;
      if (response.status === 200) {
        window.alert("회원가입 완료, 로그인 해주세요");
        history.push("/login");
      } else if (response.status === 400) {
        window.alert(response.msg);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const loginDB = (userEmail, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      // const response = await axiosInstance.post("/api/user/login", {
      //   userEmail,
      //   password,
      // });
      const response = RESP.USERLOGINPOST;
      if (response.status === 200) {
        // const accessToken = response.headers.authorization;
        // let decoded = jwt_decode(accessToken);
        // sessionStorage.setItem("token", accessToken);
        sessionStorage.setItem("token", response.token);
        dispatch(
          getUser({
            // userName: decoded.
            // nickName: decoded.
            // profileImg: decoded.
            userName: "변기원",
            nickName: "Flow",
            profileImg: "https://avatars.githubusercontent.com/u/91737252?v=4",
          })
        );
        window.alert("로그인 성공! 환영합니다.");
        history.replace("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const userCheckDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      // const response = await axiosInstance.get("/api/user/islogin");
      const response = RESP.USERISLOGINGET;
      if (response.nickName) {
        dispatch(
          getUser({
            userName: response.userName,
            nickName: response.nickName,
            profileImg: response.profileImg,
          })
        );
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//reducer
export default handleActions(
  {
    [GETUSER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [SETPREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  getUser,
  singUpDB,
  loginDB,
  userCheckDB,
  logOut,
  setPreview,
};
export { actionCreators };
