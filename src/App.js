import "./App.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {
  ThemeProvider,
  Button,
  ButtonGroup,
  Toolbar,
  Box,
} from "@mui/material";
import { theme, Logo, Header } from "./Styles.js";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Detail from "./component/detail/Detail";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { loginCheckThunk, logoutUser } from "./redux/userSlice";
import Main from "./component/main/main";
import MyPage from "./component/mypage/mypage";
import Search from "./component/search/search";
const axios = require("axios");

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 체크
  const loginCheck = async (token) => {
    let valid = false;
    await axios({
      method: "get",
      data: {},
      url: "https://3b69-119-56-188-115.jp.ngrok.io/api/user/token",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        valid = true;
        // alert("확인완료");
      })
      .catch((e) => {
        valid = false;
        // alert("유효하지 않음");
      });
    return valid;
  };

  console.log(sessionStorage.getItem("token"));
  useEffect(() => {
    // loginCheck(sessionStorage.getItem("token"))
    console.log(sessionStorage.getItem("token"));
    //쿠키에 저장된 액세스 토큰이 존재할 때만 서버에 검증 요청
    if (sessionStorage.getItem("token")) {
      // 토큰이 유효하지 않으면
      if (!loginCheck(sessionStorage.getItem("token"))) {
        // 토큰 삭제
        dispatch(logoutUser());
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    }
  }, [user, location]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {!(
          location.pathname.startsWith("/sign_in") ||
          location.pathname.startsWith("/sign_up")
        ) && (
          <Header position="static">
            <Toolbar>
              <Logo />
              <Box sx={{ flexGrow: 1 }} />
              {/* {isLogin && <Avatar src={ user?.profileSrc ?  user?.profileSrc: MoominIcon}></Avatar>}
              {isLogin && <Typography sx={{mx: 2}}>{user?.name}님, 환영합니다!</Typography>} */}
              {true && (
                <ButtonGroup
                  variant="text"
                  aria-label="outlined primary button group"
                >
                  {/* {!isLogin && ( */}
                  <Button onClick={() => navigate("/sign_up")}>회원가입</Button>
                  <Button
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    로그아웃
                  </Button>
                  {/* )} */}
                  {/* {!isLogin && ( */}
                  <Button onClick={() => navigate("/sign_in")}>로그인</Button>
                  {/* 편의용으로 임시로 버튼 추가 */}
                  <Button onClick={() => navigate("/mypage")}>
                    마이페이지
                  </Button>
                  <Button onClick={() => navigate("/detail")}>가게상세</Button>
                  {/* )} */}
                  {/* {isLogin && <Button onClick={logout}>로그아웃</Button>}
                  {isLogin && <Button onClick={addpost}>글쓰기</Button>} */}
                </ButtonGroup>
              )}
            </Toolbar>
          </Header>
        )}
        {isLogin.toString()}
        <Routes>
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
