import React, { useState } from "react";
import styled from "styled-components";

import {Image, Text} from "../element/index"
import AddComment from "../Component/AddComment";
import CommentList from "../Component/CommentList";

const DetailPost = (props) => {

    return (
        <div style={{
            display: "flex",
        }}>
            <DetailBox>
                <Image
                    imageType="rectangle"
                ></Image>

                <div style={{
                    padding: "8px",
                    width: "50%"
                }}>
                    <div style={{ display: "flex" }}>
                        <Image
                            imageType="circle"
                            width="105px"
                            height="30px"
                            bgsize="cover"
                            src="https://www.snsboom.co.kr/common/img/default_profile.png"
                            margin="8px 16px"
                        ></Image>
                        <p>닉네임</p>
                    </div>
                    <UnderLine/>
                    <div style={{ display: "flex" }}>
                        <Image
                            imageType="circle"
                            width="105px"
                            height="30px"
                            bgsize="cover"
                            src="https://www.snsboom.co.kr/common/img/default_profile.png"
                            margin="16px"
                        ></Image>
                        <p>닉네임</p>
                    </div>
                    <div style={{ height: "50%"}}>
                        <p>상세내용</p>
                        <CommentList/>
                    </div>
                    <UnderLine/>

                    <div>
                        <p>좋아요 이미지 / 댓글 이미지</p>
                        <p>좋아요 X 개</p>
                    </div>

                    <div>
                        <UnderLine/>
                        <div>
                            <AddComment/>
                        </div>
                    </div>
                </div>
            </DetailBox>
        </div>
    )
}
export default DetailPost;

const UnderLine = styled.div`
  border-bottom: 1px solid #e4e4e4;
`;

const DetailBox = styled.div`
  display: flex;
  border: 1px solid #ccc;
  margin: 50px auto;
  width: 950px;
  min-width: 820px;
`