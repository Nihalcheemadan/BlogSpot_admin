import { createSlice } from "@reduxjs/toolkit";
export const blogSlice = createSlice({
    name:"blog",
    initialState:{
        singleBlog: ''
    },
    reducers:{
        setSingleBlog:(state,data) => {
            state.singleBlog = data.payload;
        }
    }
}) 

export const { setSingleBlog } = blogSlice.actions;
export default blogSlice.reducer;