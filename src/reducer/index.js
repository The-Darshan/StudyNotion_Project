import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import ProfileReducer from "../slices/ProfileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import viewCourseReducer from "../slices/viewCourseSlice";
import themeReducer from "../slices/themeSlice";

const rootReducer = combineReducers({
    auth:authReducer,
    profile:ProfileReducer,
    cart:cartReducer,
    course : courseReducer,
    viewCourse : viewCourseReducer,
    theme:themeReducer
})

export default rootReducer