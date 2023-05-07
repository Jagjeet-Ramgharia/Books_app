const { combineReducers } = require("@reduxjs/toolkit");
import UserSlice from "../slices/UserSlice";
import BooksSlice from "../slices/BooksSlice";
import FavouriteSlice from "../slices/FavouriteSlice";
import GenresSlice from "../slices/GenresSlice";
import AuthorsSlice from "../slices/AuthorSlice";

const rootReducer = combineReducers({
  UserSlice,
  BooksSlice,
  FavouriteSlice,
  GenresSlice,
  AuthorsSlice,
});

export default rootReducer;
