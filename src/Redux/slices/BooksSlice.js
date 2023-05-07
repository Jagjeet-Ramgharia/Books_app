// prettier-ignore
import axiosInstance from '@/src/Axios/axiosInstance';
import { apiRoutes } from "@/src/Constants/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  BooksInfo: {},
  BooksInfoLoading: false,
  BooksInfoStatus: "",
  BooksInfoError: "",
};

export const getBooks = createAsyncThunk(
  "getBooks",
  async ({ page, perPage, search, author, genre }) => {
    const response = await axiosInstance.get(
      `${apiRoutes.baseUrl}/api/v1/${apiRoutes.getAllBooks}`,
      {
        params: {
          page,
          perPage,
          search,
          author,
          genre,
        },
      }
    );
    const books = response.data;
    return books;
  }
);

export const BooksSlice = createSlice({
  name: "BooksSlice",
  initialState,
  reducers: {
    resetBooks: (state, action) => {
      state.BooksInfo = {};
      state.BooksInfoError = false;
      state.BooksInfoLoading = false;
      state.BooksInfoStatus = false;
    },
  },
  extraReducers: {
    [getBooks.fulfilled]: (state, action) => {
      state.BooksInfo = action.payload;
      state.BooksInfoLoading = false;
      state.BooksInfoStatus = true;
      state.BooksInfoError = false;
    },
    [getBooks.pending]: (state) => {
      state.BooksInfoLoading = true;
      state.BooksInfoStatus = false;
      state.BooksInfoError = false;
    },
    [getBooks.rejected]: (state, action) => {
      state.uerrInfoError = action.error.message;
      state.BooksInfoLoading = false;
      state.BooksInfoError = false;
    },
  },
});
export const { resetBooks } = BooksSlice.actions;
export default BooksSlice.reducer;
