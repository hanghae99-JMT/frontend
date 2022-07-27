import React, { useRef, useState, Suspense } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { Logo, UserTextField } from "./Styles";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk, emailCheckThunk } from "./redux/userSlice";
import { FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import JMTapis from "./shared/resquests";
const axios = require("axios");

const SignUp = () => {
  const input_name = useRef();
  const input_email = useRef();
  const input_pw = useRef();
  const input_pw_confirm = useRef();
  const [signuppable, setSignuppable] = useState(false);
  const [errors, setErrors] = useState([false, false, false, false]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const emailRegExp =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const pwRegExp =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+])[A-Za-z\d@$!%*+?&0-9]{8,16}$/;
  const [validEmail, setValidEmail] = useState(false);
  const [emailcheckable, setEmailCheckable] = useState(true);
  const navigate = useNavigate()

  const signup = async () => {
    try {
      dispatch(
        signUpThunk({
          id: input_email.current.value,
          username: input_name.current.value,
          pw: input_pw.current.value,
        })
      ).then(
        navigate("/")
      );
    } catch (e) {
      alert(e.message);
    }
  };

  // ^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$

  // const emailCheckClick = () => {
  //   if(emailCheck()){
  //     alert("사용 가능한 메일입니다.")
  //   }else{
  //     alert("이미 등록된 메일입니다.")
  //     setValidEmail(false)
  //   }
  // }

  const emailCheck = async () => {
    let valid = false;
    try {
      await JMTapis.emailCheck(input_email.current.value)
        .then((res) => {
          valid = true;
          setValidEmail(true);
          setEmailCheckable(false)
          alert("사용 가능한 메일입니다.");
        })
        .catch((e) => {
          if (e.response) {
            valid = false;
            setValidEmail(false);
            setEmailCheckable(true)
            alert(e.response.data.message);
          }
        });
    } catch (e) {
      valid = false;
    }
    return valid;
  };

  const checkVal = () => {
    let new_errors = [...errors];
    let res = true;
    if (!emailRegExp.test(input_email.current.value)) {
      res = false;
      new_errors[0] = true;
    } else {
      new_errors[0] = false;
    }
    if (input_name.current.value == "") {
      res = false;
      new_errors[1] = true;
    } else {
      new_errors[1] = false;
    }
    if (
      input_pw.current.value.length < 6 ||
      !pwRegExp.test(input_pw.current.value)
    ) {
      res = false;
      new_errors[2] = true;
    } else {
      new_errors[2] = false;
    }
    if (
      input_pw_confirm.current.value.length < 6 ||
      input_pw.current.value != input_pw_confirm.current.value
    ) {
      res = false;
      new_errors[3] = true;
    } else {
      new_errors[3] = false;
    }

    setErrors(new_errors);
    setSignuppable(res);
    return res;
  };

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
          backgroundImage:
            "url('https://images.unsplash.com/photo-1657299156537-f4bcdced5392?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')",
          backgroundSize: "cover",
          // backgroundColor: "rgba(0,0,0,.5)"
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "2em",
            boxShadow: "0 3px 8px rgba(0,0,0,.5)",
            borderRadius: "5px",
          }}
        >
          <Logo />
          <Typography variant="h5" sx={{ my: 1 }}>
            회원가입
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UserTextField
              inputRef={input_email}
              sx={{ my: 1, flexGrow: 2 }}
              label="아이디(이메일)"
              variant="outlined"
              placeholder="example@email.com"
              onChange={() => {
                checkVal();
                setValidEmail(false);
                setEmailCheckable(true)
              }}
              error={errors[0]}
              helperText={errors[0] ? "이메일 형식이 잘못되었습니다." : false}
            />
            <div>
              <Button
                onClick={emailCheck}
                variant="contained"
                sx={{ flexGrow: 1, minWidth: "fit-content", whiteSpace: "nowrap" }}
                disabled={!emailcheckable}
                size="medium"
              >
                중복확인
              </Button>
              <FormHelperText error={!validEmail} sx={{ color: "green" }}>
                {!validEmail ? "중복 확인 필요" : "사용 가능"}
              </FormHelperText>
            </div>
          </div>
          <UserTextField
            inputRef={input_name}
            sx={{ my: 1 }}
            label="이름"
            variant="outlined"
            placeholder="존맛탱"
            onChange={checkVal}
            error={errors[1]}
            helperText={errors[1] ? "이름을 입력해주세요." : false}
          />
          <UserTextField
            inputRef={input_pw}
            sx={{ my: 1 }}
            label="비밀번호"
            variant="outlined"
            type="password"
            onChange={checkVal}
            error={errors[2]}
            helperText={
              errors[2]
                ? "영문자와 특수문자(!@#$%^&*)포함\n 8-16자로 입력해주세요."
                : false
            }
          />
          <UserTextField
            inputRef={input_pw_confirm}
            sx={{ my: 1 }}
            label="비밀번호 확인"
            variant="outlined"
            type="password"
            onChange={checkVal}
            error={errors[3]}
            helperText={errors[3] ? "비밀번호가 일치하지 않습니다." : false}
          />
          <Button
            sx={{ my: 1 }}
            style={{ display: "block" }}
            onClick={signup}
            variant="contained"
            disabled={!signuppable || !validEmail}
            color="secondary"
          >
            회원가입
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
