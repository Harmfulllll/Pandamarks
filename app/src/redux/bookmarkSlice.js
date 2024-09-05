import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bookmarks: null,
}

const bookmarkSlice= createSlice({
    name: 'bookmark',
    initialState,
    reducers:{
        createBookmark: (state, action)=>{
            state.bookmarks= action.payload;
        },
        deleteBookmark: (state, action)=>{
            state.bookmarks= action.payload;
        },
        
    }
});

export default bookmarkSlice.reducer;