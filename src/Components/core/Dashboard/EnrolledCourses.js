import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getEnrolledCourse } from "../../../Services/operations/ProfileAPI";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();
  const getEnrolledCourses = async () => {
    try {
      const respone = await getEnrolledCourse(token)
      setEnrolledCourses(respone);
    } catch (err) {
      console.log("Unable to fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div  className="text-white font-inter">
      <div className="text-4xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="spinner"></div>
      ) : !enrolledCourses.length ? (
        <p className="text-center text-white text-xl mt-10  pt-10">You have not enrolled in any course yet.</p>
      ) : (
        <div className="mt-10">
          <div className="bg-richblack-700 flex rounded-t-lg justify-between text-richblack-50 py-4 px-5 border border-richblack-700">
            <p>Course Name</p>
            <p>Durations</p>
            <p className="pr-16">Progress</p>
          </div>
          {/* Cards */}
          {enrolledCourses.map((course, indx) => (
            <div  className="flex justify-between items-center px-5 py-5 border border-richblack-700 outline-none " key={indx}>
              <div className="flex justify-center items-center cursor-pointer"
               onClick={()=>{
                navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`);
                }}>
                <img src={course.thumbnail} className="w-[52px] h-[52px] rounded-lg"/>

                <div className="ml-5">
                  <p className="text-xl">{course.title}</p>
                  <p className="text-richblack-300 text-sm">{course.description}</p>
                </div>
              </div>

              <div className="text-richblack-50">
                {course?.totalDuration}
              </div>

              <div>
                <p className="text-richblack-50 text-xs pr-12 mb-1"> Progress : {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
