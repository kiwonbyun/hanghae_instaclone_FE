import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const {
        is_flex,
        width,
        padding,
        margin,
        bg,
        color,
        children,
        _onClick,
        position,
        justify,
        height,
        overflow,
        border,
        radius,
        className,
        align,
        borderB,
        wrap,
        cursor,
    } = props;

    const styles = {
        is_flex,
        width,
        height,
        margin,
        padding,
        bg,
        color,
        position,
        justify,
        overflow,
        border,
        radius,
        className,
        align,
        borderB,
        wrap,
        cursor,
    };

    return (
        <React.Fragment>
            <GridBox {...styles} onClick={_onClick}>
                {children}
            </GridBox>
        </React.Fragment>
    );
};

Grid.defaultProps = {
    _onClick: () => {},
};

const GridBox = styled.div`
  /* max-width: 500px; */
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.justify ? `justify-content: ${props.justify};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")}
  ${(props) => (props.position ? `position: ${props.position};` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.borderB ? `border-bottom: ${props.borderB};` : "")}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  ${(props) => (props.overflow ? `overflow: ${props.overflow};` : "")}
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  ${(props) => (props.align ? `text-align: ${props.align};` : "")}
  ${(props) => (props.wrap ? `flex-wrap: ${props.wrap};` : "")}
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default Grid;