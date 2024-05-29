import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../../common/IconButton'
import { resetCourseState, setSteps } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constant'
import { editCourseDetails } from '../../../../../Services/operations/courseDetailsAPI'
import { useNavigate } from 'react-router'

const PublishCourse = () => {

    const {register , handleSubmit , setValue , getValues} = useForm()
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const goBack=()=>{
        dispatch(setSteps(2))
    }

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true)
        }
    },[]);

    const goToCourse =  () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public")===true || (course?.status === COURSE_STATUS.DRAFT && getValues("public")===false)){
            goToCourse();
            return ; 
        }
        // If form is updated
        const formData = new FormData();
        formData.append("courseId",course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

        formData.append("status",courseStatus);

        setLoading(true)
        const result = await editCourseDetails(formData,token);

        if(result){
            goToCourse();
        }

        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish()
    }

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-white'>
         
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='public'>
                <input type='checkbox' id='public' {...register("public")} className='rounded h-4 w-4'/>
                <span className='ml-3'>Make this Course as Public</span>
                </label>
            </div>

            <div className='flex justify-end gap-x-3'>
                <button type='button' disabled={loading} onClick={goBack} className='flex items-center bg-richblack-300 p-6'>
                    Back
                </button>
                <IconButton disabled={loading} text="Save Changes"/>
            </div>

        </form>
    </div>
  )
}

export default PublishCourse