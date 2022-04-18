import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const {
        text,
        onClick,
        children,
        margin,
        width,
        padding,
        disabled,
        radius,
        bgColor,
        opacity,
        color,
        className,
        mainBtn,
        profileBtn,
    } = props;

    const styles = {
        margin: margin,
        width: width,
        padding: padding,
        disabled: disabled,
        radius: radius,
        bgColor: bgColor,
        opacity: opacity,
        color: color,
        className: className,
    };
    if (mainBtn) {
        return (
            <>
                <MainBtn {...styles} onClick={onClick}>
                    {text ? text : children}
                </MainBtn>
            </>
        );
    }
    if (profileBtn) {
        return (
            <>
                <ProfileBtn {...styles} onClick={onClick}>
                    {text ? text : children}
                </ProfileBtn>
            </>
        );
    }
    return (
        <>
            <ElButton {...styles} onClick={onClick}>
                {text ? text : children}
            </ElButton>
        </>
    );
};

Button.defaultProps = {
    children: null,
    onClick: () => {},
    width: "100%",
    padding: "12px 0px",
    opacity: 1,
    color: "#ffffff",
};

//로그인, 회원가입화면 버튼
const MainBtn = styled.div`
  background-color: #0095f6;
  color: #ffffff;
  font-size: 14px;
  margin: 15px 40px;
  padding: 5px 9px;
  width: 268px;
  height: 30px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  justify-content: center;
  display: flex;
  line-height: 1.5;
  cursor: pointer;
`;

//프로필 편집 버튼
const ProfileBtn = styled.button`
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin: 0 20px;
  padding: 5px 9px;
  font-weight: 600;
  text-align: center;
  background: none;
  cursor: pointer;
`;

//---- 기본 return Button ----
const ElButton = styled.button`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  position: ${(props) => (props.position ? `${props.position}` : "")};
  background-color: ${(props) => (props.bgColor ? `${props.bgColor}` : "")};
  ${(props) => (props.className ? `className: ${props.className}` : "")};
  cursor: pointer;
`;

export default Button;