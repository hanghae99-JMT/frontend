import React, { useRef, useState, Suspense } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { Logo, UserTextField } from "./Styles";
import { useDispatch, useSelector } from "react-redux"
import { loginThunk } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const input_email = useRef();
  const input_pw = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const signin = async () => {
    try{
      dispatch(loginThunk({id: input_email.current.value, pw: input_pw.current.value})).then((res) => {
        navigate("/")
      }).catch((e) => {
        alert("로그인에 실패했습니다. 홈으로 이동합니다.")
      })
    }
    catch(e) {
      alert("로그인 실패. 아이디와 비밀번호를 확인하세요")
    }
    
  }

  React.useEffect(() => {
    console.log(user)
  },[user])

  return (
    <>
      <Box
        style={{
          //   backgroundColor: "aliceblue",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')",
          backgroundSize: "cover",
          // backgroundColor: "rgba(0,0,0,.5)"
        }}
      >
        <Box sx={{backgroundColor: "rgba(255,255,255,0.8)", padding: "2em", boxShadow: "0 3px 8px rgba(0,0,0,.5)", borderRadius: "5px"}}>
          <Logo />
          <Typography variant="h5" sx={{ my: 1 }}>
            로그인
          </Typography>
          <UserTextField
            inputRef={input_email}
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="아이디(이메일)"
            variant="outlined"
            placeholder="example@email.com"
          />
          <UserTextField
            inputRef={input_pw}
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="비밀번호"
            variant="outlined"
            type="password"
          />
          <Button
            sx={{ my: 1 }}
            style={{ display: "block" }}
            onClick={signin}
            variant="contained"
            color="secondary"
          >
            로그인
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
