import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { chatActions } from "./redux/modules/chat";
import { useParams } from "react-router";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useHistory } from "react-router-dom";

const ChattingRoom = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const roomid = params.roomId;
  const message = useSelector((state) => state.chat?.message);
  const token = sessionStorage.getItem("token");
  const sendTextref = useRef("");
  const sender = useSelector((state) => state.user?.user?.nickname);

  // 웹소켓연결
  let sock = new SockJS("http://14.45.4.252:8080/ws-stomp");
  let ws = Stomp.over(sock);
  const newtoken = token.substring(7);
  // 연결하고 구독하기
  function ConnectSub() {
    try {
      ws.connect(
        {
          token: newtoken,
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${roomid}`,
            (response) => {
              const newMessage = JSON.parse(response.body);
              console.log("받은 메세지", newMessage);
              dispatch(chatActions.getNewMassage(newMessage));
            },
            {
              token: newtoken,
            }
          );
        }
      );
    } catch (error) {
      console.log("fdfdfdfdf", error.response);
    }
  }

  function DisConnectUnsub() {
    try {
      ws.disconnect(
        {
          Headers: {
            Authorization: `${token}`,
          },
        },
        () => {
          ws.unsubscribe("sub-0");
        },
        { token: token }
      );
    } catch (error) {
      console.log(error);
    }
  }
  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  // 메시지 보내기
  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        history.replace("/");
      }
      // send할 데이터
      const sendText = sendTextref.current.value;
      const data = {
        type: "TALK",
        roomId: roomid,
        sender: sender,
        message: sendText,
      };
      // 빈문자열이면 리턴
      if (sendText === "") {
        return;
      }
      // 로딩 중
      // dispatch(chatActions.isLoading());
      waitForConnection(ws, function () {
        ws.send(
          "/pub/api/chat/message",
          { token: newtoken },
          JSON.stringify(data)
        );
        console.log(ws.ws.readyState);
      });
    } catch (error) {
      console.log(error);
      console.log(ws.ws.readyState);
    }
  }

  React.useEffect(() => {
    ConnectSub(token);
    return () => {
      DisConnectUnsub();
    };
  }, [roomid]);

  React.useEffect(() => {
    dispatch(chatActions.getMessageDB(roomid));
  }, []);

  if (!message) {
    return <div></div>;
  }
  return (
    <div>
      {message.map((m) => {
        return (
          <div key={m.id}>
            <span>{m.sender}</span>
            <span>{m.message}</span>
          </div>
        );
      })}

      <div>
        <input ref={sendTextref}></input>
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default ChattingRoom;
