import React, {useState, useRef} from "react";
import styled from "styled-components";

import {Grid, Input, Image, Button, Text} from "../element"
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import {useNavigate, useParams} from "react-router";

const AddPost = (props) => {
    const params = useParams()
    const navigate = useNavigate()
    const fileInput = useRef();

    const token = sessionStorage.getItem("jwt_token");

    const dispatch = useDispatch();

    const user_list = useSelector(
        (state) => state.user.user); // 유저리스트
    const is_login = useSelector(
        (state) => state.user.is_login); // 로그인 체크
    // console.log(is_login)
    // const postList = useSelector((state) => state?.post.list);

    const postId = params.id;
    // console.log(postId)

    // const selectPostInfo = postList.filter(
    //     (list) => list.postId === parseInt(postId)
    // );

    // state 값
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");

    const selectFile = (e) => {
        const reader = new FileReader(); // 미리보기 리더
        const targetImage = fileInput.current.files[0];

        reader.readAsDataURL(targetImage);
        setImage(e.target.files[0]);
        reader.onloadend = () => {
            setPreview(reader.result); //base64
            // console.log(reader.result)
        };
    };

    const addPost = () => {
        dispatch(postActions.addPostDB(
            image, content, postId, token, navigate
        ));
    };

    const editPost = () => {
        dispatch(postActions.editPostDB(
            image, content, postId, token, navigate
        ));
    };

    return (
        <>
            <Grid
                margin="auto"
                width="50%"
                border="1px solid #e4e4e4"
                radius="20px"
                bg="#fff"
            >
                <div style={{
                    display : "flex",
                    justifyContent : "space-between"
                }}>
                    {postId ? (
                        <Text
                            margin="10px auto 0px auto"
                            size="16px"
                            color="#262626"
                            textalign="center"
                            bold
                        >
                            게시물 수정하기
                        </Text>
                    ) : (
                        <Text
                            margin="10px auto 0px auto"
                            size="16px"
                            color="#262626"
                            align="center"
                            bold
                        >
                            새 게시물 만들기
                        </Text>
                    )}

                    {postId ? (
                        <Text
                        margin="12px 10px 0px 0px"
                        size="14px"
                        color="#0095f6"
                        bold
                        cursor="pointer"
                        _onClick={editPost}
                    >완료</Text>
                    ) : (
                        <Text
                            margin="12px 10px 0px 0px"
                            size="14px"
                            color="#0095f6"
                            bold
                            cursor="pointer"
                            _onClick={addPost}
                        >공유하기</Text>
                    )}
                </div>
                <UnderLine/>

                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1.5 }}>
                        <Grid>
                            <Grid is_flex margin="auto">
                                <Image
                                    margin="0 0 0 auto"
                                    imageType="rectangle"
                                    size="200px"
                                    bgsize="cover"
                                    src={
                                        preview
                                            ? preview
                                            : "https://www.touchtaiwan.com/images/default.jpg"
                                    }
                                />
                            </Grid>
                            <Text
                                align="center"
                                size="20px">사진과 동영상을 여기에 끌어다 놓으세요</Text>
                            <Grid padding="16px">
                                <Label htmlFor="input-file">컴퓨터에서 선택</Label>
                                <input
                                    type="file"
                                    id="input-file"
                                    style={{display: "none"}}
                                    onChange={selectFile}
                                    ref={fileInput}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{flex: 1, display: "flex", flexDirection: 'column'}}>
                        <div style={{
                            display: "flex",
                            padding: "16px",
                        }}>
                            <Image
                                imageType="circle"
                                width="105px"
                                height="30px"
                                bgsize="cover"
                                margin="0 8px 0 0"
                                src="https://www.snsboom.co.kr/common/img/default_profile.png"
                            ></Image>
                            <p>닉네임</p>
                        </div>
                        <Grid width={'100%'} height={'100%'} padding={'16px'}>
                            {postId ? (
                                <Input
                                    // defaultValue={selectPostInfo[0] && selectPostInfo[0].content}
                                    _onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                    padding="16px"
                                    label="게시글 내용"
                                    placeholder="문구 입력..."
                                    rows={16}
                                    multiLine
                                />
                            ) : (
                                <Input
                                    value={content}
                                    _onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                    padding="12px 10px"
                                    margin="0 auto"
                                    label="게시글 내용"
                                    placeholder="문구 입력..."
                                    border="1px solid #fff"
                                    bg="#fff"
                                    rows={16}
                                    multiLine
                                />
                            )}
                        </Grid>
                        {/*<Grid margin="30px auto" padding="8px 0">*/}
                        {/*    {postId ? (*/}
                        {/*        <ContentButton*/}
                        {/*            onClick={editPost}*/}
                        {/*        >*/}
                        {/*            게시글 수정*/}
                        {/*        </ContentButton>*/}
                        {/*    ) : (*/}
                        {/*        <ContentButton onClick={addPost}>*/}
                        {/*            게시글 작성*/}
                        {/*        </ContentButton>*/}
                        {/*    )}*/}
                        {/*</Grid>*/}
                    </div>
                </div>


            </Grid>
        </>
    );
};

const UnderLine = styled.div`
  border-bottom: 1px solid #e4e4e4;
  height: 10px;
`;

const Label = styled.label`
  width: 102px;
  background-color: #0095f6;
  font-size: 13px;
  padding: 5px 9px;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  margin: 0 auto;
  display: block;
`;

const ContentButton = styled.button`
  width: 200px;
  background-color: #0095f6;
  font-size: 13px;
  color: white;
  font-weight: bold;
  display: block;
  border: 0px;
  border-radius: 6px;
  padding: 8px 0;
  margin: 20px auto
`

export default AddPost;