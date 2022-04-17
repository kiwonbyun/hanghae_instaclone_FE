import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import comment, { actionCreators3 } from "./redux/modules/comment";
import { useHistory } from "react-router-dom";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const comment_list = useSelector((state) => state.comment.list);
  React.useEffect(() => {
    dispatch(actionCreators3.getCommentDB(props.postId));
  }, []);
  return (
    <div>
      <Exitimg
        src="https://cdn.icon-icons.com/icons2/1524/PNG/512/x_106506.png"
        onClick={() => {
          history.push("/home");
        }}
      ></Exitimg>
      {comment_list.map((c) => {
        return (
          <Commentdiv key={c.commentId}>
            <img src={c.profileImg}></img>
            <span>{c.nickName}</span>
            <p>{c.comment}</p>
          </Commentdiv>
        );
      })}
    </div>
  );
};
const Commentdiv = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 8px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  span {
    margin-left: 5px;
    margin-right: 8px;
    font-weight: 600;
  }
`;
const Exitimg = styled.img`
  position: absolute;
  width: 70px;
  top: 20px;
  right: 15px;
  cursor: pointer;
`;

export default CommentList;
