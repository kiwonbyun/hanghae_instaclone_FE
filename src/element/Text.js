import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const {
        bold,
        color,
        size,
        children,
        margin,
        className,
        align,
        link,
        span,
        padding,
        _onClick,
        cursor,
    } = props;

    const styles = {
        bold,
        color,
        size,
        margin,
        className,
        align,
        link,
        padding,
        cursor,
    };

    if (link) {
        return (
            <A {...styles} onClick={_onClick}>
                {children}
            </A>
        );
    }
    if (span) {
        return <Span {...styles}>{children}</Span>;
    }

    return (
        <P {...styles} onClick={_onClick}>
            {children}
        </P>
    );
};

Text.defaultProps = {
    children: null,
    _onClick: () => {},
};

const A = styled.a`
  color: #0095f6;
  font-weight: 600;
  margin: ${(props) => props.margin};
  cursor: pointer;
`;

const Span = styled.span`
  padding: 0 5px;
  color: #8e8e8e;
  size: 12px;
`;

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  ${(props) => (props.className ? `className: ${props.className};` : "")}
  ${(props) => (props.align ? `text-align: ${props.align};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
`;
export default Text;