// prettier-ignore
import axiosInstance from '@/src/Axios/axiosInstance';
import { apiRoutes } from "@/src/Constants/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ReviewsInfo: {},
  ReviewsInfoLoading: false,
  ReviewsInfoStatus: "",
  ReviewsInfoError: "",
};

export const getReviews = createAsyncThunk(
  "getReviews",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${apiRoutes.baseUrl}/api/v1/${apiRoutes.getReviews}${id}`
      );
      const reviews = response.data;
      return reviews;
    } catch (error) {
      return rejectWithValue;
    }
  }
);

export const ReviewsSlice = createSlice({
  name: "ReviewsSlice",
  initialState,
  reducers: {
    resetReviews: (state, action) => {
      state.ReviewsInfo = {};
      state.ReviewsInfoError = false;
      state.ReviewsInfoLoading = false;
      state.ReviewsInfoStatus = false;
    },
  },
  extraReducers: {
    [getReviews.fulfilled]: (state, action) => {
      state.ReviewsInfo = action.payload;
      state.ReviewsInfoLoading = false;
      state.ReviewsInfoStatus = true;
      state.ReviewsInfoError = false;
    },
    [getReviews.pending]: (state) => {
      state.ReviewsInfoLoading = true;
      state.ReviewsInfoStatus = false;
      state.ReviewsInfoError = false;
    },
    [getReviews.rejected]: (state, action) => {
      state.uerrInfoError = action.error.message;
      state.ReviewsInfoLoading = false;
      state.ReviewsInfoError = false;
    },
  },
});
export const { resetReviews } = ReviewsSlice.actions;
export default ReviewsSlice.reducer;
