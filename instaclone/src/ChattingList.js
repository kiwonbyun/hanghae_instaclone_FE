import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "./redux/modules/chat";

const ChattingList = () => {
  const dispatch = useDispatch();
  const room_list = useSelector((state) => state.chat.list);
  console.log(room_list);

  React.useEffect(() => {
    dispatch(chatActions.getAllChatRoomDB());
  }, []);
  if (!room_list) {
    return <div></div>;
  }
  return (
    <Container>
      <Listdiv>
        {room_list.map((room) => {
          return (
            <Roomlist
              key={room.id}
              onClick={() => {
                dispatch(chatActions.enterRoomDB(room.id));
              }}
            >
              <img src={room.userProfile}></img>
              <span>{room.chatRoomName}</span>
              <p>{room.username}</p>
            </Roomlist>
          );
        })}
      </Listdiv>
    </Container>
  );
};
const Roomlist = styled.div`
  display: flex;
  align-items: center;
  background-color: red;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  span {
    margin: 0px 10px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Listdiv = styled.div`
  width: 35%;
  height: 600px;
  margin: auto;
  border: 1px solid black;
  margin-top: 50px;
`;

export default ChattingList;
