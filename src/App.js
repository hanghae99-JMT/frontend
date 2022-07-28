import "./App.css";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {
  ThemeProvider,
  Button,
  ButtonGroup,
  Toolbar,
  Box,
  CircularProgress
} from "@mui/material";
import { theme, Logo, Header } from "./Styles.js";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Detail from "./component/detail/Detail";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { loginCheckThunk, logoutUser, setLoading } from "./redux/userSlice";
import Main from "./component/main/main";
import MyPage from "./component/mypage/mypage";
import Search from "./component/search/search";
import JMTapis from "./shared/resquests";
const axios = require("axios");

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const isLoading = useSelector((state) => state.user.isLoading)
  const [openDetail, setOpenDetail] = useState(false);
  const handleClose = (value) => {
    setOpenDetail(false);
  };

  console.log(sessionStorage.getItem("token"));
  useEffect(() => {
    dispatch(loginCheckThunk());
    dispatch(setLoading(false))
  }, [location]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {isLoading && <div className="progress">
          <CircularProgress color="primary" size={150} />
        </div>}
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
                  {!isLogin && (
                    <>
                      <Button onClick={() => navigate("/sign_up")}>
                        회원가입
                      </Button>
                      <Button onClick={() => navigate("/sign_in")}>
                        로그인
                      </Button>
                    </>
                  )}

                  {isLogin && (
                    <>
                      <Button
                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                      >
                        로그아웃
                      </Button>
                      <Button onClick={() => navigate("/mypage")}>
                        마이페이지
                      </Button>
                    </>
                  )}
                </ButtonGroup>
              )}
            </Toolbar>
          </Header>
        )}
        <Detail open={openDetail} onClose={handleClose} />
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
