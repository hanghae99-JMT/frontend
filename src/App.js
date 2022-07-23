
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { ThemeProvider, Button, ButtonGroup, Toolbar, Box } from '@mui/material';
import {theme, Logo, Header} from "./Styles.js"
import {Routes, Route, useNavigate, useLocation} from "react-router-dom"
import MyPage from "./component/mypage/mypage";

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
      {!(
          location.pathname.startsWith("/sign_in") ||
          location.pathname.startsWith("/sign_up")
        ) && (<Header position="static">
            <Toolbar>
              <Logo/>

              <Box sx={{ flexGrow: 1 }} />
              {/* {isLogin && <Avatar src={ user?.profileSrc ?  user?.profileSrc: MoominIcon}></Avatar>}
              {isLogin && <Typography sx={{mx: 2}}>{user?.name}님, 환영합니다!</Typography>} */}


              {true && (
                <ButtonGroup
                variant="text" 
                  aria-label="outlined primary button group"
                >
                  {/* {!isLogin && ( */}
                    <Button onClick={() => navigate("/sign_up")}>
                      회원가입
                    </Button>
                  {/* )} */}
                  {/* {!isLogin && ( */}
                    <Button onClick={() => navigate("/sign_in")}>로그인</Button>
                  {/* )} */}
                  {/* {isLogin && <Button onClick={logout}>로그아웃</Button>}
                  {isLogin && <Button onClick={addpost}>글쓰기</Button>} */}
                </ButtonGroup>
              )}
            </Toolbar>
          </Header>)}
        <Routes>
          <Route path="/sign_in" element={<SignIn/>} />
          <Route path="/sign_up" element={<SignUp/>} />
          <Route path="/mypage" element={<MyPage/>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
