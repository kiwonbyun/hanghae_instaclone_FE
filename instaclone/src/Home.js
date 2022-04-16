import React, { useEffect } from "react";
import styled from "styled-components";
import Suggest from "./Suggest";
import Moment from "moment";
import { useDispatch } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegGrinBeam } from "react-icons/fa";
import { useSelector } from "react-redux";
import { actionCreators2 } from "./redux/modules/post";
import SimpleSlider from "./Slider";

const Home = () => {
  const dispatch = useDispatch();
  const login_user = useSelector((state) => state.user?.user);
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post?.list);

  function displayedAt(createdAt) {
    const milliSeconds = new Date() - createdAt;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }
  const likeClick = (postId) => {
    console.log("좋아요 클릭");
    dispatch(actionCreators2.postLikeDB(postId));
  };

  useEffect(() => {
    if (is_login) {
      dispatch(actionCreators2.getAllPostDB(login_user.nickName));
    } else if (!is_login) {
      dispatch(actionCreators2.getAllPostDB(null));
    }
  }, []);
  return (
    <Container>
      <PostContainer>
        {post_list?.map((v) => {
          const startTime = new Date(v.createAt).getTime();
          const postId = v.postId;
          return (
            <Post key={v.postId}>
              <Posttitle>
                <div>
                  <img src={v.profileImg}></img>
                  <div>
                    <span>{v.nickName}</span>
                    <small>Seoul, South Korea</small>
                  </div>
                </div>
                <FaEllipsisH style={{ width: "40px", height: "18px" }} />
              </Posttitle>
              <Postimgdiv>
                <SimpleSlider img_list={v.contentImg} />
              </Postimgdiv>
              <Icondiv>
                <div>
                  {v.clicked ? (
                    <FaHeart
                      style={{ marginRight: "15px", color: "red" }}
                      onClick={() => {
                        likeClick(postId);
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      style={{ marginRight: "15px" }}
                      onClick={() => {
                        likeClick(postId);
                      }}
                    />
                  )}

                  <FaRegComment style={{ marginRight: "15px" }} />
                  <FaRegPaperPlane />
                </div>
                <div>
                  <FaRegBookmark />
                </div>
              </Icondiv>
              <Textdiv>
                <span>좋아요 {v.likeCnt}개</span>
                <div>
                  <span>{v.nickName}</span>
                  <p>{v.content}</p>
                </div>
                <span>댓글 {v.commentCnt}개 모두 보기</span>
                <small>{displayedAt(startTime)}</small>
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
          );
        })}
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
  margin-bottom: 20px;
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
  z-index: 9999;
`;
export default Home;
