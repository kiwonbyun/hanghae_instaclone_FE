import React from "react";
import styled from "styled-components";
import { Reset } from "styled-reset";
import { FaFacebookSquare } from "react-icons/fa";

const Singup = () => {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <Container>
        <SignupDiv>
          <div>
            <img src="https://fontmeme.com/images/instagram-new-logo.png"></img>
            <p>친구들의 사진과 동영상을 보려면 가입하세요.</p>
            <button>
              <FaFacebookSquare style={{ width: "14px", height: "14px" }} />
              Facebook으로 로그인
            </button>
          </div>
          <div>
            <span>또는</span>
            <input placeholder="이메일 주소"></input>
            <input placeholder="성명"></input>
            <input placeholder="닉네임"></input>
            <input placeholder="비밀번호"></input>
            <button>가입</button>
          </div>
        </SignupDiv>
        <Tologindiv>
          <span>계정이 있으신가요?</span>
          <span>로그인</span>
        </Tologindiv>
        <TodownloadDiv>
          <div>
            <span>앱을 다운로드 받으세요</span>
          </div>
          <div>
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"></img>
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"></img>
          </div>
        </TodownloadDiv>
      </Container>
    </div>
  );
};

const SignupDiv = styled.div`
  border: 1px solid #dbdbdb;
  div {
    &:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 55%;
      }
      p {
        color: #919191;
        font-size: 15px;
        font-weight: 600;
      }
      button {
        background-color: #2e95f6;
        border: none;
        border: 1px solid #dbdbdb;
        color: white;
        height: 30px;
        border-radius: 4px;
        width: 82%;
        font-weight: 700;
      }
    }
    &:last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-top: 1px solid #dbdbdb;
      margin-top: 20px;
      padding: 10px 0px;
      span {
        position: relative;
        bottom: 18px;
        background-color: white;
        padding: 2px 10px;
      }
      input {
        width: 80%;
        height: 30px;
        background-color: #fafafa;
        border: 1px solid #dbdbdb;
        margin-bottom: 10px;
        border-radius: 4px;
      }
      button {
        border: 1px solid #dbdbdb;
        color: white;
        height: 30px;
        border-radius: 4px;
        background-color: #b2dffc;
        width: 82%;
        font-weight: 700;
        margin-bottom: 25px;
        &:hover {
          background-color: #2e95f6;
        }
      }
    }
  }
`;

const TodownloadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 130px;
  }
  div {
    &:first-child {
      margin: 15px 0px;
    }
    &:last-child {
      width: 80%;
      display: flex;
      justify-content: space-around;
    }
  }
`;

const Tologindiv = styled.div`
  border: 1px solid #dbdbdb;
  margin: 10px 0px;
  padding: 17px 10px;
  display: flex;
  justify-content: space-around;
  span {
    font-size: 13px;
    &:last-child {
      margin-left: -90px;
      color: #2e97f6;
      cursor: pointer;
      font-weight: 600;
    }
  }
`;

const Container = styled.div`
  width: 23%;
  margin: 30px auto;
  background-color: white;
`;
export default Singup;
