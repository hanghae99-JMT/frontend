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
import JMTapis from "./shared/resquests";
const axios = require("axios");

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);
  const [openDetail, setOpenDetail] = useState(false)
  const handleClose = (value) => {
    setOpenDetail(false);
  };

  console.log(sessionStorage.getItem("token"));
  useEffect(() => {
    dispatch(loginCheckThunk())
  }, [location]);
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
                  <Button onClick={() => setOpenDetail(true)}>가게상세</Button>
                  {/* )} */}
                  {/* {isLogin && <Button onClick={logout}>로그아웃</Button>}
                  {isLogin && <Button onClick={addpost}>글쓰기</Button>} */}
                </ButtonGroup>
              )}
            </Toolbar>
          </Header>
        )}
        {isLogin.toString()}
        <Detail open={openDetail} onClose={handleClose}/>
        <Routes>
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          {/* <Route path="/detail" element={<Detail />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </ThemeProvider>
      {/* {!openDetail && <div id="map"></div>} */}
    </div>
  );
}

export default App;
