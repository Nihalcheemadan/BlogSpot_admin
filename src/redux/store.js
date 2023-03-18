import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";


export default configureStore({
    reducer:{
        blog:blogSlice
    }
})