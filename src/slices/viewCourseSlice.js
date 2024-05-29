import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData : [],
    courseEntireData : [],
    completedLectures : [],
    totalNoofLectures : 0,
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers : {
        setCourseSectionData : (state , action) => {
            state.courseSectionData = action.payload;
        },
        setEntireCourseData : (state,action) => {
            state.courseEntireData = action.payload
        },
        setTotalNoofLectures : (state , action) => {
            state.totalNoofLectures = action.payload
        },
        setCompletedLectures : (state,action) => {
                state.completedLectures = action.payload
            },
        updateCompletedLectures: (state, action) => {
                state.completedLectures = [...state.completedLectures, action.payload]
              },
        },
    }
)

export const {setCompletedLectures , setCourseSectionData , setEntireCourseData , setTotalNoofLectures,updateCompletedLectures} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;