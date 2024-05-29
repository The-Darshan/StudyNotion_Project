import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsofCourse } from "../../../../Services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsofCourse(courseId);
      console.log("Selected Course",result);
      if (result) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result.courseDetails));
      } 
      setLoading(false);
    };
    populateCourseDetails()
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="text-white w-full">
      <h1 className="text-4xl font-inter font-bold">Edit Course</h1>
      <div>{course ? <RenderSteps /> : <p className="text-4xl w-full h-96 font-inter font-bold flex justify-center items-center">Course Not Found.</p>}</div>
    </div>
  );
};

export default EditCourse;
