import React, { useState, useEffect } from "react";

import {Button, Grid, Image, Text} from "../element/index";


import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useNavigate } from "react-router-dom";

const DetailComments = (props) => {

    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;

    const token = sessionStorage.getItem("jwt_token");

    const nickname = useSelector(
        (state) => state?.user.user);
    const commentList = useSelector(
        (state) => state?.comment.list);

    const [upComment, setUpComment] = useState();
    const [idx, setIdx] = useState();

    useEffect(() => {
        dispatch(commentActions.getCommentSP(id, token));
    }, []);

    return (
        <>
            {commentList.map((cur, idx) => (
                <Grid
                    is_flex
                    border={"1px solid black"}
                    bor_radius
                    width={"50px"}
                    padding={"20px"}
                    height={"120px"}
                    margin={"0 auto 20px auto"}
                    key={cur.id}
                >
                    <Grid>
                        <Image
                            imageType="circle"
                            width="105px"
                            height="30px"
                            bgsize="cover"
                            src="https://www.snsboom.co.kr/common/img/default_profile.png"
                            margin="16px"
                        ></Image>
                        <span>{cur.user.nickname}</span>
                        <p>{cur.comment}</p>
                    </Grid>
                    <Grid is_flex>
                        <Text
                            color="red"
                            visibility={
                                nickname === cur.user.nickname ? "visible" : "hidden"
                            }
                            onClick={() => {
                                dispatch(commentActions.deleteCommentSP(cur, token)
                                );
                            }}
                        >
                            삭제
                        </Text>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default DetailComments;