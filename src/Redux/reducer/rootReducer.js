const { combineReducers } = require("@reduxjs/toolkit");
import UserSlice from "../slices/UserSlice";
import BooksSlice from "../slices/BooksSlice";
import FavouriteSlice from "../slices/FavouriteSlice";

const rootReducer = combineReducers({
  UserSlice,
  BooksSlice,
  FavouriteSlice,
});

export default rootReducer;
