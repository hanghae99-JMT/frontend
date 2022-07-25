import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const myPageThunk = createAsyncThunk("restaurant/user", async () => {
  let id = "";
  let data = "";
  await axios({
    method: "get",
    url: `http://localhost:5001/user/${id}/likes`,
  }).then((response) => {
    console.log(response.data);
    data = response.data;
  });
  return data;
});

const myPageSlice = createSlice({
  name: "mypage",
  initialState: {
    mypage: [
      {
        rid: 1,
        name: "가게이름",
        category: "한식",
        description: "삼겹살집",
        address: "동성로",
        phone: "053-111-1234",
        like: 2,
        x: "200",
        y: "100",
        url: "http://localhost:3000",
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myPageThunk.fulfilled, (state, action) => {
      state.restaurant = action.payload;
    });
  },
});

export default myPageSlice.reducer;
