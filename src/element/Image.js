import React from "react";
import styled from "styled-components";

const Image = (props) => {
    const { imageType, src, size, bgSize, width, height, margin, padding } =
        props;

    const styles = {
        imageType,
        src,
        size,
        bgSize,
        width,
        height,
        margin,
        padding,
    };

    if (imageType === "logo") {
        return <ImageLogo {...styles}></ImageLogo>;
    }

    if (imageType === "circle") {
        return <ImageCircle {...styles}></ImageCircle>;
    }
    if (imageType === "rectangle") {
        return (
            <>
                <OutBox>
                    <InBox {...styles} />
                </OutBox>
            </>
        );
    }

    if (imageType === "preview") {
        return <ImageRectangle {...styles}></ImageRectangle>;
    }
    return (
        <>
            <OutBox>
                <InBox {...styles} />
            </OutBox>
        </>
    );
};

Image.defaultProps = {
    imageType: "logo",
    src: "https://newsimg.hankookilbo.com/cms/articlerelease/2021/06/05/ef519975-80c8-40b6-b25a-47ab6270dc60.png",
    size: 40,
    bgSize: "cover",
};

const ImageRectangle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-size: ${(props) => props.bgSize};
  background-image: url("${(props) => props.src}");
`;

const ImageLogo = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-size: ${(props) => props.bgSize};
  background-image: url("${(props) => props.src}");
`;

const OutBox = styled.div`
  width: 100%;
`;
const InBox = styled.div`
  position: relative; 
  padding-top: 100%; 
  overflow: hidden; // 박스 영역을 벗어나면 숨김
  background-image: url("${(props) => props.src}");
  background-size: ${(props) => props.bgSize};
`;

const ImageCircle = styled.div`
  --size: ${(props) =>
    props?.size}px; 
  // width: 36px;
  // height: 36px;
  // border-radius: 36px;
  width: var(
    --size
  );
  //위에 --size 변수를 쓸땐 이렇게 var 하고 ()안에 넣어준다. var()함수
  height: var(--size);
  border-radius: var(
    --size
  );
  min-width: 36px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${(props) => props.margin};
`;

export default Image;