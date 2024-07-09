import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
    darkMode:true,
}

const themeSlice = createSlice({
    name:'theme',
    initialState:initialvalue,

    reducers:{
        toggleDarkMode (state){
            state.darkMode = !state.darkMode;
        }
    }
})

export const {toggleDarkMode} = themeSlice.actions;
export default themeSlice.reducer;