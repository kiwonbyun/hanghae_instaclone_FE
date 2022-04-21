import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";

//action
const GETALLCHATROOM = "getAllChatRoom";
const ENTERROOM = "enterRoom";
const GETMESSAGE = "getMessage";
const GETNEWMESSAGE = "getNewMassage";

//init
const initialState = {
  list: [],
};

//action creator

const getAllChatRoom = createAction(GETALLCHATROOM, (room_list) => ({
  room_list,
}));
const enterRoom = createAction(ENTERROOM, (room) => ({ room }));
const getMessage = createAction(GETMESSAGE, (messages) => ({ messages }));
const getNewMassage = createAction(GETNEWMESSAGE, (message) => ({ message }));

// middlewares
const getAllChatRoomDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.get("/api/chat/rooms");
      console.log(response);
      if (response.status === 200) {
        dispatch(getAllChatRoom(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const enterRoomDB = (roomId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.get(`/api/chat/rooms/${roomId}`);
      console.log(response);
      const room_data = {
        roomId: response.data.id,
        roomName: response.data.chatRoomName,
      };
      dispatch(enterRoom(room_data));
      window.location.replace(`/chat/${response.data.id}`);
    } catch (err) {
      console.log(err.responce);
    }
  };
};

const getMessageDB = (roomid) => {
  return async function (dispatch, getState, { history }) {
    const response = await axiosInstance.get(
      `/api/chat/rooms/${roomid}/messages`
    );
    console.log(response);
    dispatch(getMessage(response.data.content));
  };
};
//방 만들기
const addChatRoomDB = (nickName) => {
  return async function (dispatch, getState, { history }) {
    const responce = await axiosInstance.post("/api/chat/rooms", {
      nickName,
    });
    console.log(responce);
    history.push(`/chatrooms`);
    // ChatAPI.addChatRoom(room)
    //   .then((response) => {
    //     // console.log("addChatRoomDB : response", response.data);
    //     dispatch(getChatRoomDB());
    //   })
    //   .catch((error) => {
    //     console.log("addChatRoomDB : ERROR", error.response);
    //   });
  };
};

//reducer
export default handleActions(
  {
    [GETALLCHATROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.room_list;
      }),
    [ENTERROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room = action.payload.room;
      }),
    [GETMESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.message = action.payload.messages;
      }),
    [GETNEWMESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.message.push(action.payload.message);
      }),
  },
  initialState
);
const chatActions = {
  getAllChatRoomDB,
  enterRoomDB,
  getMessageDB,
  getNewMassage,
  addChatRoomDB,
};

export { chatActions };
