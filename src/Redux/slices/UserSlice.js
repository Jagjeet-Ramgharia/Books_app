// prettier-ignore
import axiosInstance from '@/src/Axios/axiosInstance';
import { apiRoutes } from "@/src/Constants/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  userInfoLoading: false,
  userInfoStatus: "",
  userInfoError: "",
};

export const getUserInfo = createAsyncThunk("getUserInfo", async () => {
  const response = await axiosInstance.get(`${apiRoutes.baseUrl}/api/v1/info`);
  const userInfo = response.data?.user;
  return userInfo;
});

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.userInfoLoading = false;
      state.userInfoStatus = true;
      state.userInfoError = false;
    },
    [getUserInfo.pending]: (state) => {
      state.userInfoLoading = true;
      state.userInfoStatus = false;
      state.userInfoError = false;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.uerrInfoError = action.error.message;
      state.userInfoLoading = false;
      state.userInfoError = false;
    },
  },
});

export const { clearErrorMessages } = userSlice.actions;
export default userSlice.reducer;
