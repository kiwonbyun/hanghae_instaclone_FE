import React from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Header = () => {
  return (
    <Container>
      <div>
        <img src="https://fontmeme.com/images/instagram-new-logo.png"></img>
      </div>
      <div>
        <input></input>
      </div>
      <div>
        <div>
          <FaHome
            style={{ width: "27px", height: "27px", marginRight: "12px" }}
          />
          <FaPaperPlane
            style={{ width: "27px", height: "27px", marginRight: "12px" }}
          />
          <FaPlusSquare
            style={{ width: "27px", height: "27px", marginRight: "12px" }}
          />
          <FaCompass
            style={{ width: "27px", height: "27px", marginRight: "12px" }}
          />
          <FaHeart
            style={{ width: "27px", height: "27px", marginRight: "12px" }}
          />
        </div>
        <img src="https://avatars.githubusercontent.com/u/91737252?v=4"></img>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    &:first-child {
      img {
        width: 140px;
      }
    }
    &:nth-child(2) {
      input {
        width: 200px;
        margin: 0px -60px 0px -40px;
        height: 27px;
        border-radius: 10px;
        border: none;
        background-color: #efefef;
        &:focus {
          outline: none;
        }
      }
    }
    &:last-child {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 9999px;
      }
    }
  }
`;

export default Header;
