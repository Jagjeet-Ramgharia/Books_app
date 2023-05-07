// prettier-ignore
import axiosInstance from '@/src/Axios/axiosInstance';
import { apiRoutes } from "@/src/Constants/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  GenresInfo: {},
  GenresInfoLoading: false,
  GenresInfoStatus: "",
  GenresInfoError: "",
};

export const getGenres = createAsyncThunk(
  "getGenres",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${apiRoutes.baseUrl}/api/v1/${apiRoutes.getGenres}`
      );
      const genres = response.data;
      return genres;
    } catch (error) {
      return rejectWithValue;
    }
  }
);

export const GenresSlice = createSlice({
  name: "GenresSlice",
  initialState,
  reducers: {
    resetGenres: (state, action) => {
      state.GenresInfo = {};
      state.GenresInfoError = false;
      state.GenresInfoLoading = false;
      state.GenresInfoStatus = false;
    },
  },
  extraReducers: {
    [getGenres.fulfilled]: (state, action) => {
      state.GenresInfo = action.payload;
      state.GenresInfoLoading = false;
      state.GenresInfoStatus = true;
      state.GenresInfoError = false;
    },
    [getGenres.pending]: (state) => {
      state.GenresInfoLoading = true;
      state.GenresInfoStatus = false;
      state.GenresInfoError = false;
    },
    [getGenres.rejected]: (state, action) => {
      state.uerrInfoError = action.error.message;
      state.GenresInfoLoading = false;
      state.GenresInfoError = false;
    },
  },
});
export const { resetGenres } = GenresSlice.actions;
export default GenresSlice.reducer;
