import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRestaurtanThunk = createAsyncThunk(
  "restaurant/ranking",
  async () => {
    let data = "";
    await axios({
      method: "get",
      url: "http://localhost:5001/ranking",
    })
      .then((response) => {
        data = response.data;
      })
      .catch((error) => alert(error));
    return data;
  }
);

export const getUserLikeThunk = createAsyncThunk(
  "restaurant/user",
  async () => {
    let data = "";
    await axios({
      method: "get",
      url: "http://localhost:5001/likes",
    })
      .then((response) => {
        console.log(response.data);
        data = response.data;
      })
      .catch((error) => alert(error));
    return data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurant: [
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
    user: [],
  },
  reducers: {
    getrestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRestaurtanThunk.fulfilled, (state, action) => {
      state.restaurant = action.payload;
    });
    builder.addCase(getUserLikeThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { getrestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
