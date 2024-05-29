import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { createRating } from '../../../Services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const { courseEntireData } = useSelector((state)=>state.viewCourse)
    const {register, handleSubmit , setValue , formState:{errors}} = useForm();

    console.log(courseEntireData)
    const ratingChanged = (newRating)=>{
        setValue("courseRating",newRating)
    }
    
    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[])
    
    const onSubmit = async (data)=>{
        await createRating({ courseID : courseEntireData?.courseDetails?._id , rating :data.courseRating , review : data.courseExperience },token)
        setReviewModal(false);
    }
    
    return (
    <div className='text-white backdrop-blur-sm inset-0 bg-opacity-10 z-10 fixed flex justify-center items-center'>

        <div className='bg-richblack-800 w-5/12 rounded-lg border border-richblack-700'>
            <div className='bg-richblack-700 rounded-t-lg flex justify-between py-2 px-5' >
                {/* Modal Header */}
                <p>Add Review</p>
                <button onClick={()=>setReviewModal(false)}>X</button>
                {/* Icon Add karna h x ka */}
            </div>

            {/* Modal Body */}
            <div className='flex flex-col'>

                <div className='flex mt-4 gap-3 items-center justify-center'>
                    <img 
                        src={user?.image} className='aspect-square w-[50px] rounded-full object-cover' alt='User Image'
                    />
                    <div>
                        <p className='font-semibold'>{user?.firstname} {user?.lastname}</p>
                        <p className='text-sm'>Posting Publicly</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex items-center mt-2 mb-2 flex-col'>

                    < ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />
                    
                    <div className='w-full px-5'>
                        <label htmlFor='courseExperience' className='text-sm'>
                            Add Your Experience <sup className='text-pink-300'>*</sup>
                        </label>

                        <textarea
                        id="courseExperience"
                        placeholder='Add Your Experience'
                        {...register("courseExperience",{required:true})}
                        className='min-h-[100px] w-full rounded-md bg-richblack-700 pt-2 pl-2 text-sm text-white outline-none mt-1 border-b border-richblack-400' 
                        />

                        {
                            errors.courseExperience && (
                                <span>Please add your experience</span>
                            )
                        }
                    </div>

                    <div className='flex justify-end items-end w-full px-5 gap-x-2 mt-2 mb-2'>

                        <button onClick={()=>setReviewModal(false)} className='bg-richblack-300 text-black rounded-md py-1 px-4'>
                            Cancel
                        </button>

                        <button className='bg-yellow-50 text-black rounded-md py-1 px-4'> 
                            Save
                        </button>
                    </div>
                    
                </form> 
            </div>
        </div>

    </div>
  )
}

export default CourseReviewModal