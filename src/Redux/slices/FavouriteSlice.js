// prettier-ignore
import axiosInstance from '@/src/Axios/axiosInstance';
import { apiRoutes } from "@/src/Constants/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  FavouriteInfo: {},
  FavouriteInfoLoading: false,
  FavouriteInfoStatus: "",
  FavouriteInfoError: "",
};

export const getFavourites = createAsyncThunk(
  "getFavourites",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${apiRoutes.baseUrl}/api/v1/${apiRoutes.getFavourites}`
      );
      const favourites = response.data;
      return favourites;
    } catch (error) {
      return rejectWithValue;
    }
  }
);

export const Favourite = createSlice({
  name: "Favourite",
  initialState,
  reducers: {},
  extraReducers: {
    [getFavourites.fulfilled]: (state, action) => {
      state.FavouriteInfo = action.payload;
      state.FavouriteInfoLoading = false;
      state.FavouriteInfoStatus = true;
      state.FavouriteInfoError = false;
    },
    [getFavourites.pending]: (state) => {
      state.FavouriteInfoLoading = true;
      state.FavouriteInfoStatus = false;
      state.FavouriteInfoError = false;
    },
    [getFavourites.rejected]: (state, action) => {
      state.uerrInfoError = action.error.message;
      state.FavouriteInfoLoading = false;
      state.FavouriteInfoError = false;
    },
  },
});

export default Favourite.reducer;
