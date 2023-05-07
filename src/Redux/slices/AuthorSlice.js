// prettier-ignore
import axiosInstance from '@/src/Axios/axiosInstance';
import { apiRoutes } from "@/src/Constants/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  AuthorsInfo: {},
  AuthorsInfoLoading: false,
  AuthorsInfoStatus: "",
  AuthorsInfoError: "",
};

export const getAuthors = createAsyncThunk(
  "getAuthors",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${apiRoutes.baseUrl}/api/v1/${apiRoutes.getAuthors}`
      );
      const authors = response.data;
      return authors;
    } catch (error) {
      return rejectWithValue;
    }
  }
);

export const AuthorsSlice = createSlice({
  name: "AuthorsSlice",
  initialState,
  reducers: {
    resetAuthors: (state, action) => {
      state.AuthorsInfo = {};
      state.AuthorsInfoError = false;
      state.AuthorsInfoLoading = false;
      state.AuthorsInfoStatus = false;
    },
  },
  extraReducers: {
    [getAuthors.fulfilled]: (state, action) => {
      state.AuthorsInfo = action.payload;
      state.AuthorsInfoLoading = false;
      state.AuthorsInfoStatus = true;
      state.AuthorsInfoError = false;
    },
    [getAuthors.pending]: (state) => {
      state.AuthorsInfoLoading = true;
      state.AuthorsInfoStatus = false;
      state.AuthorsInfoError = false;
    },
    [getAuthors.rejected]: (state, action) => {
      state.uerrInfoError = action.error.message;
      state.AuthorsInfoLoading = false;
      state.AuthorsInfoError = false;
    },
  },
});
export const { resetAuthors } = AuthorsSlice.actions;
export default AuthorsSlice.reducer;
