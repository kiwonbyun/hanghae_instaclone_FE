import React from "react";
import styled from "styled-components";
import Suggest from "./Suggest";
import { FaEllipsisH } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegGrinBeam } from "react-icons/fa";

const Home = () => {
  return (
    <Container>
      <PostContainer>
        <Post>
          <Posttitle>
            <div>
              <img src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927"></img>
              <div>
                <span>Byunkiwon</span>
                <small>Seoul, South Korea</small>
              </div>
            </div>
            <FaEllipsisH style={{ width: "40px", height: "18px" }} />
          </Posttitle>
          <Postimgdiv>
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmPGDZ%2FbtrzvLOGlFd%2FGgk7O1IMUqcvbR4xwOBn9k%2Fimg.jpg"></img>
          </Postimgdiv>
          <Icondiv>
            <div>
              <FaRegHeart style={{ marginRight: "15px" }} />
              <FaRegComment style={{ marginRight: "15px" }} />
              <FaRegPaperPlane />
            </div>
            <div>
              <FaRegBookmark />
            </div>
          </Icondiv>
          <Textdiv>
            <span>좋아요 1,279개</span>
            <div>
              <span>Byunkiwon</span>
              <p>우리집 강아지의 사진입니다. ㅇㅅㅇ</p>
            </div>
            <span>댓글 3개 모두 보기</span>
            <small>21시간 전</small>
          </Textdiv>
          <Inputdiv>
            <div>
              <FaRegGrinBeam style={{ height: "20px", width: "20px" }} />
            </div>
            <div>
              <input placeholder="댓글 달기..."></input>
              <button>게시</button>
            </div>
          </Inputdiv>
        </Post>
      </PostContainer>
      <SuggestContainer>
        <Suggest></Suggest>
      </SuggestContainer>
    </Container>
  );
};

const Inputdiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  div {
    position: relative;
    &:first-child {
      margin-right: 30px;
    }
    &:nth-child(2) {
      width: 100%;
      input {
        width: 80%;
        height: 20px;
        border: none;
        font-size: 15px;
        &:focus {
          outline: none;
        }
      }
    }
  }
  button {
    background-color: white;
    border: none;
    color: skyblue;
    font-weight: 500;
    &:hover {
      font-weight: 700;
      color: blue;
    }
  }
`;
const Textdiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  padding: 5px 5px;
  span {
    &:first-child {
      font-weight: 700;
    }
  }
  div {
    display: flex;
    margin: 5px 0px;
    p {
      margin: 0px 10px;
    }
    span {
      font-weight: 700;
    }
  }
  small {
    margin: 5px 0px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Container = styled.div`
  display: flex;
`;
const PostContainer = styled.div`
  width: 55%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const SuggestContainer = styled.div`
  width: 45%;
  height: 100vh;
  position: fixed;
  right: 10px;
`;

const Post = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
`;

const Posttitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px;
  div {
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        font-size: 14px;
      }
    }
  }
`;

const Postimgdiv = styled.div`
  img {
    width: 100%;
  }
`;

const Icondiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  padding: 3px 10px;
`;
export default Home;
