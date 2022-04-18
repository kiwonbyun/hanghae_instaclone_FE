import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const Input = ({
                   type,
                   value,
                   placeholder,
                   _onChange,
                   width,
                   multiLine,
                   onSubmit,
                   border,
                   padding,
                   margin,
                   defaultValue,
                   fontSize,
                   bg,
                   left,
                   rows = 10
               }) => {
    const styles = {
        padding,
        margin,
        placeholder,
        width,
        border,
        bg,
        left,
        rows
    };
    if (multiLine) {
        return (
            <Grid>
                <ElTextarea
                    {...styles}
                    rows={rows}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={_onChange}
                ></ElTextarea>
            </Grid>
        );
    }

    return (
        <>
            <Grid>
                <InputSome
                    {...styles}
                    type={type}
                    value={value}
                    onChange={_onChange}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onSubmit(e);
                        }
                    }}
                ></InputSome>
            </Grid>
        </>
    );
};

Input.defaultProps = {
    type: "text",
    value: undefined,
    placeholder: "입력해주세요.",
    label: null,
    _onChange: () => {
    },
    onSubmit: () => {
    },
    padding: null,
    margin: null,
    width: "100%",
    bg: null,
    border: "1px solid #212121",
};

const ElTextarea = styled.textarea`
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  left: ${(props) => props.left};
  font-size: ${(props) => props.fontSize || '14px'};
  box-sizing: border-box;
  display: block;
  resize: none;
  outline: none;
`;

const InputSome = styled.input`
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: ${(props) => props.width};
  border: ${(props) => props.border};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  left: ${(props) => props.left};
`;

export default Input;