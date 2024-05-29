import React, { useState } from "react";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Tr, Thead, Th, Td } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constant";
import { deleteCourse, getInstructorDetails } from "../../../../Services/operations/courseDetailsAPI";
import { setCourse } from "../../../../slices/courseSlice";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from "react-router";
import { MdWatchLater , MdCurrencyRupee } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const CoursesTable = ({ courses, setCourses }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleCourseDelete = async (courseId)=>{
    setLoading(true);

    await deleteCourse({courseID : courseId},token)
    const result = await getInstructorDetails(token)
    if(result){
        setCourses(result)
        dispatch(setCourse(result))
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <div className="text-white font-inter">
      <Table>
        <Thead>
          <Tr  className="flex gap-x-10 text-sm  border border-richblack-800 p-2 text-richblack-100 justify-between px-10">
            <Th>COURSES</Th>
            <div className="flex gap-x-10">
            <Th>DURATION</Th>
            <Th>PRICE</Th>
            <Th>ACTIONS</Th>
            </div>
          </Tr>
        </Thead>

        <Tbody>
          {courses.length === 0 ? (
            <Tr className="flex justify-center items-center mt-10 ">
              <Td className="text-2xl text-richblack-100">No Course Found</Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border border-richblack-800 p-8 justify-between"
              >
                <Td className="flex gap-x-4 h-fit">
                  <img
                    src={course?.thumbnail}
                    className="h-[150px] w-[220px] rounded-lg object-cover"
                  />

                  <div className="flex flex-col w-28">
                    <p className="text-lg font-semibold flex flex-wrap">{course?.title}</p>
                    <p className="text-xs text-richblack-500 mt-7 mb-7">{course?.description}</p>
                    <p className="text-xs mb-5">Created :</p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="text-xs text-pink-100 font-semibold flex justify-center items-center bg-richblack-700 rounded-full gap-x-1 py-[2px] px-2"><MdWatchLater className="text-pink-100 " size={17}/>Drafted</p>
                    ) : (
                      <p className="text-xs text-yellow-100 font-semibold flex justify-center items-center bg-richblack-700 rounded-full gap-x-1 py-[2px] px-2"><CiCircleCheck className="text-yellow-100" size={17} />Published</p>
                    )}
                  </div>
                </Td>

                <Td className="ml-72 text-richblack-100 text-sm font-semibold">
                      2hr
                </Td>

                <Td className="flex justify-center h-fit items-center text-sm text-richblack-100 font-semibold"><MdCurrencyRupee/>{course?.price}</Td>

                <Td className="cursor-pointer h-fit">
                    <button disabled={loading} 
                    onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}
                    className="mr-[19px] hover:text-caribbeangreen-100 hover:scale-125 transition-all duration-200"
                    >
                        <FiEdit2 fontSize={20}/>
                    </button>

                    <button disabled={loading} onClick={()=>setConfirmationModal({
                        text1:"Do you want to delete this course?",
                        text2:"All the data related to this course will be deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler:!loading ? ()=>handleCourseDelete(course._id):()=>{},
                        btn2Handler:!loading ? ()=>setConfirmationModal(null) : ()=>{}
                    })} className="hover:text-pink-400 hover:scale-125 transition-all duration-200 mt-2">
                        <RiDeleteBin6Line fontSize={20}/>
                    </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
      }
    </div>
  );
};

export default CoursesTable;
