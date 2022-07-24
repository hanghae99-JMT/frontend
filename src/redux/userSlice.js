import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";

const axios = require("axios");

export const loginThunk = createAsyncThunk(
  "user/login",
  async ({ id, pw }, thunkAPI) => {
    let data = null;
    let tmp = null;
    await axios({
      method: "post",
      url: "https://d823-119-56-188-115.jp.ngrok.io/api/signin",
      data: {
        id: id,
        pw: pw,
      },
    })
      .then((res) => {
        console.log(res.data.id);
        data = res.data;
        tmp = res;
      })
      .catch((e) => {
        alert(e.response.data.message);
      });

    if (data.error) {
      console.log(data.error);
      return thunkAPI.rejectWithValue(data);
    } else {
      const accessToken = data.token;
      sessionStorage.setItem("token", `${accessToken}`);
      return {
        id: data.id,
        username: data.username,
        token: data.token,
      };
    }
  }
);

export const loginCheckThunk = createAsyncThunk(
  "user/check",
  async (token, thunkAPI) => {
    console.log(token);
    await axios({
      method: "get",
      data: {},
      url: "https://d823-119-56-188-115.jp.ngrok.io/api/user/token",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.code !== 200) {
          throw "200이 아님";
          thunkAPI.rejectWithValue(res);
        }
      })
      .catch((e) => {
        thunkAPI.rejectWithValue(e);
      });
  }
);

export const emailCheckThunk = createAsyncThunk(
  "user/emailcheck",
  async (id, thunkAPI) => {
    console.log(id);
    await axios({
      method: "get",
      data: {},
      url: `https://d823-119-56-188-115.jp.ngrok.io/api/users/${id}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        if (e.response) {
          alert(e.message);
        }else{

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
    await axios({
      method: "post",
      url: "https://d823-119-56-188-115.jp.ngrok.io/api/signup",
      data: {
        id: id,
        username: username,
        pw: pw,
      },
    })
      .then((res) => {
        console.log(res.data.id);
        data = res.data;
      })
      .catch((error) => {
        alert(error);
      });

    if (data.error) {
      console.log(data.error)
        return thunkAPI.rejectWithValue(data);
    } else {
    //   const accessToken = data.token;
    //   sessionStorage.setItem("is_login", `${accessToken}`);
      alert("가입을 축하합니다!")
    //   return {
    //     id: data.id,
    //     username: data.username,
    //   };
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: { id: "", username: "" } },
  reducers: {
    logoutUser(state, action) {
        sessionStorage.removeItem("token")
        state.user = null;
        alert("로그아웃")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(emailCheckThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      return true
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      console.log(action.payload);
      alert(JSON.stringify(action.payload));
    });
  },
});

export default userSlice.reducer;
export const {logoutUser} = userSlice.actions