// ** Redux, Thunk & Root Reducer Imports

// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  //   middleware: [thunk],
});

export default store;
