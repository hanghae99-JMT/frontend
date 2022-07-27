import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";
import JMTapis from "../shared/resquests";
const axios = require("axios");

export const loginThunk = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    console.log(userData);
    let data = null;
    let tmp = null;
    let flag = false;
    let fetchedData = null;
    await JMTapis.loginUser(userData)
      .then((res) => {
        console.log(userData);
        console.log("얍얍얍!!!!");
        console.log("로그인 호출 완료 시점" + res.data.token);
        flag = true;
        data = res.data;
        tmp = res;
        console.log(data);
      })
      .catch((e) => {
        alert(e.response.data.message);
      });

    // if (data.error) {
    //   console.log(data.error);
    //   return thunkAPI.rejectWithValue(data);
    // } else {

    console.log(data);
    if (flag) {
      const accessToken = data.token;
      sessionStorage.setItem("token", `${accessToken}`);
      return {
        id: data.id,
        username: data.username,
      };
    }
  }
  //   }
);

export const loginCheckThunk = createAsyncThunk(
  "user/check",
  async (data, thunkAPI) => {
    const asyncSessionStorage = async() => {
        return sessionStorage.getItem("token")
    }

    const token = await asyncSessionStorage()
    if (token) {
        await axios
          .get(`${process.env.REACT_APP_JMT_SERVER_API}/api/user/token`, {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            // 토큰이 유효한 경우
            thunkAPI.dispatch(fetchUser(res.data));
          })
          .catch((e) => {
            // 토큰이 유효하지 않은 경우
            thunkAPI.dispatch(logoutUser());
          });
    }
  }
);

export const emailCheckThunk = createAsyncThunk(
  "user/emailcheck",
  async (id, thunkAPI) => {
    console.log(id);
    await axios({
      method: "get",
      data: {},
      url: `https://b864-59-24-129-68.jp.ngrok.io/api/users/${id}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        if (e.response) {
          alert(e.message);
        } else {
        }
        thunkAPI.rejectWithValue(e);
      });
  }
);

export const signUpThunk = createAsyncThunk(
  "user/signUp",
  async ({ id, username, pw }, thunkAPI) => {
    // const navigate = useNavigate()
    let data = null;
    await JMTapis.signUp({
      id: id,
      username: username,
      pw: pw,
    })
      .then((res) => {
        console.log(res.data.id);
        data = res.data;
      })
      .catch((error) => {
        alert(error);
      });

    if (data.error) {
      console.log(data.error);
      return thunkAPI.rejectWithValue(data);
    } else {
      //   const accessToken = data.token;
      //   sessionStorage.setItem("is_login", `${accessToken}`);
      alert("가입을 축하합니다!");
      window.location.href = "/";
      //   return {
      //     id: data.id,
      //     username: data.username,
      //   };
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: { id: "로그인 정보가 없습니다", username: "" } },
  reducers: {
    logoutUser(state, action) {
      sessionStorage.removeItem("token");
      state.user = { id: "로그인 정보가 없습니다", username: "" };
      // alert("로그아웃")
      window.location.reload();
    },
    fetchUser(state, action) {
        console.log("여기에서 페치!!", action.payload.id);
        console.log(action.payload);
        console.log(state);
        state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      //   window.location.href = "/";
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(emailCheckThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      return true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      console.log(action.payload);
      alert(JSON.stringify(action.payload));
    });
  },
});

export default userSlice.reducer;
export const { logoutUser, fetchUser } = userSlice.actions;
