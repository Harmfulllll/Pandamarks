import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import bookmarkSlice from "./bookmarkSlice";
const store= configureStore({
     reducer:{
         auth: authSlice,
         bookmark: bookmarkSlice,
     }
})

export default store;