const { combineReducers } = require("@reduxjs/toolkit");
import UserSlice from "../slices/UserSlice";
import BooksSlice from "../slices/BooksSlice";
import FavouriteSlice from "../slices/FavouriteSlice";
import GenresSlice from "../slices/GenresSlice";
import AuthorsSlice from "../slices/AuthorSlice";
import ReviewsSlice from '../slices/ReviewSlice';

const rootReducer = combineReducers({
  UserSlice,
  BooksSlice,
  FavouriteSlice,
  GenresSlice,
  AuthorsSlice,
  ReviewsSlice
});

export default rootReducer;
