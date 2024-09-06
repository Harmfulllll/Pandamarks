import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bookmarks: [],
}

const bookmarkSlice= createSlice({
    name: 'bookmark',
    initialState,
    reducers:{
        createBookmark: (state, action)=>{
            state.bookmarks.push(action.payload);
        },
        deleteBookmark: (state, action)=>{
            state.bookmarks= action.payload;
        },
        getBookmarks: (state, action)=>{
            state.bookmarks.push(action.payload);
        }
        
    }
});

export default bookmarkSlice.reducer;
export const {createBookmark, deleteBookmark, getBookmarks}= bookmarkSlice.actions;