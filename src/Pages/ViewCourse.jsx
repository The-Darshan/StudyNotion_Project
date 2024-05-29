import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router';
import { getFullDetailOfCourseWithUser} from "../Services/operations/courseDetailsAPI"
import { setCourseSectionData , setEntireCourseData , setCompletedLectures, setTotalNoofLectures} from "../slices/viewCourseSlice"
import ViewDetailsSidebar from '../Components/core/ViewCourse/ViewDetailsSidebar';
import CourseReviewModal from '../Components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false);
  const {courseId} = useParams();
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    const setCourseSpecificDetails = async()=>{
      const courseData = await getFullDetailOfCourseWithUser(courseId,token);
      console.log(" CourseData : ",courseData);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData));
      dispatch(setCompletedLectures(courseData?.completedVideos)); 
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec)=>{
        lectures += sec?.subSection?.length;
      })
      dispatch(setTotalNoofLectures(lectures));
    }

    setCourseSpecificDetails();
  },[])

  return (
    <>
      <div className='flex no-scrollbar'>  
        <ViewDetailsSidebar setReviewModal={setReviewModal}/>

        <div className='relative w-[1080px] no-scrollbar'>
          <Outlet/>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse;