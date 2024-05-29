import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorData } from "../../../../Services/operations/ProfileAPI";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";
import { getInstructorDetails } from "../../../../Services/operations/courseDetailsAPI";

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true); 
      const instructorApiData = await getInstructorData(token);
      const result = await getInstructorDetails(token);
      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }

      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);


  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="text-white font-inter">
      <div>
        <h1 className="text-4xl font-semibold">Hi {user?.firstname} 🖐</h1>
        <p className="text-richblack-300 mt-2">Let's start something new</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : courses?.length > 0 ? (
        <div>
          <div className="flex flex-col">
            <div className="flex gap-x-4">
              <InstructorChart courses={instructorData}/>

              <div className="rounded-lg bg-richblack-800 w-3/12 mt-4 pt-5 pl-5">
                <p className="text-3xl text-pure-greys-5 font-semibold mb-4">Statistics</p>

                <div className="mb-4">
                  <p className="text-lg text-pure-greys-100">Total Course</p>
                  <p className="text-2xl text-pure-greys-5">{courses?.length}</p>
                </div>

                <div className="mb-4">
                  <p className="text-lg text-pure-greys-100">Total Students</p>
                  <p className="text-2xl text-pure-greys-5">{totalStudents}</p>
                </div>

                <div>
                  <p className="text-lg text-pure-greys-100">Total Income</p>
                  <p className="text-2xl text-pure-greys-5">Rs. {totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-richblack-800 mt-4 px-10">
            <div className="flex justify-between pt-5">
                <p className="text-xl text-pure-greys-5 font-semibold">
                    Your Courses
                </p>
                <Link className="text-yellow-50 cursor-pointer" to="/dashboard/my-courses"> View All </Link>
            </div>

            <div className="flex mt-3 gap-x-4">
                {
                    courses.slice(0,3)?.map((course,indx)=>(
                        <div key={indx}>
                            <img src={course.thumbnail} className="w-80 h-40"/>

                            <div className="mb-3 mt-2">
                                <p className="text-pure-greys-5">{course.title}</p>

                                <div className="flex text-pure-greys-100 text-center">
                                    <p>{course.studentsEnrolled?.length} students{" "} | Rs {course.price}</p>
                                </div>

                            </div>

                        </div>
                    ))
                }
            </div>

          </div>

        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center mt-10">
            <p className="text-4xl text-center">You have not created any courses yet.</p>
            <Link to="/dashboard/add-course" className="rounded-md bg-yellow-50 text-black py-2 px-3 border font-semibold w-fit">
                Create a Course
            </Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
