import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import IconButton from '../../common/IconButton';
import { FiEdit } from "react-icons/fi";
import { dateFormatter } from '../../../utils/DateFormatter';

const MyProfile = () => {

    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    console.log("User 2:",user)
    const dob = dateFormatter(user?.additionalinfo?.dateOfBirth)

  return (
    <div className='text-white max-w-maxContent relative mx-auto ml-10 mr-16'>
        
        <h1 className='text-4xl font-inter mb-12'>My Profile</h1>

        {/* Section 1 */}
        <div className='bg-richblack-800 rounded-lg border border-richblack-700 flex py-8 px-12  items-center justify-between mb-10'>
            <div className='flex'> 
                <img src={user?.image} alt={`profile-${user?.firstname}`} className='aspect-square w-[78px] rounded-full object-cover'/>
                    <div className='flex flex-col justify-center ml-5 font-inter'>
                        <p className='font-semibold text-lg'>{user?.firstname + " " + user?.lastname}</p>
                        <p className='text-sm text-richblack-300'>{user?.email}</p>
                    </div>
            </div>
            <div className='flex justify-center items-center gap-x-3 bg-yellow-50 rounded-lg py-2 text-black font-semibold font-inter px-3'>
            <IconButton text={"Edit"} onclick={()=> {navigate("/dashboard/settings")}}/>
            <FiEdit/>
            </div>
        </div>

        {/* Section 2 */}

            <div className='bg-richblack-800 rounded-lg border border-richblack-700 flex py-8 px-12  items-center justify-between mb-10'>
                <div className='flex flex-col gap-y-10'>
                    <p className='font-semibold text-lg font-inter'>About</p>
                    <p className="text-sm text-richblack-300">{user?.additionalinfo?.about ?? "Write Something about Yourself"}</p>
                    {/* Icon Adding for edit button */}
                </div>
                   
                <div className='flex justify-center items-center gap-x-3 bg-yellow-50 rounded-lg py-2 text-black font-semibold font-inter px-3'>
                <IconButton text={"Edit"} onclick={()=> {navigate("/dashboard/settings")}}/>
            <FiEdit/>
            </div>
            </div>

        {/* Section 3 */}

        <div className='bg-richblack-800 rounded-lg border border-richblack-700 flex py-8 px-12  items-center flex-col justify-between mb-10'>
            <div className='flex items-center justify-between w-full'>
                <p className='text-lg font-semibold font-inter'>Personal Details</p>
                <div className='flex justify-center items-center gap-x-3 bg-yellow-50 rounded-lg py-2 text-black font-semibold font-inter px-3'>
                <IconButton text={"Edit"} onclick={()=> {navigate("/dashboard/settings")}}/>
                <FiEdit/>
                </div>
            </div>

            <div className='mt-10 flex gap-x-52 justify-start items-center w-full'>
                <div >
                <div className='mb-7'>
                <p className='text-sm text-richblack-300 mb-1'>First Name</p>
                <p className='text-md font-semibold'>
                    {user?.firstname}
                </p>
                </div>

                <div className='mb-7'>
                <p  className='text-sm text-richblack-300 mb-2'>Email</p>
                <p  className='text-md font-semibold'>
                    {user?.email}
                </p>
                </div>

                <div className='mb-7'>
                <p  className='text-sm text-richblack-300 mb-2'>Gender</p>
                <p  className='text-md font-semibold'>
                    {user?.additionalinfo?.gender ?? "Add Gender"}
                </p>
                </div>
                </div>

                    <div>
                <div className='mb-7'>
                <p  className='text-sm text-richblack-300'>Last Name</p>
                <p  className='text-md font-semibold'>
                    {user?.lastname}
                </p>
                </div>

                <div className='mb-7'>
                <p  className='text-sm text-richblack-300 mb-2'>Phone Number</p>
                <p  className='text-md font-semibold'>
                    {user?.additionalinfo?.contactNumber ?? "Add Contact Number"}
                </p>
                </div>

                <div className='mb-7'>
                <p  className='text-sm text-richblack-300 mb-2'>Date of Birth</p>
                <p  className='text-md font-semibold'>
                    {dob ?? "Add Date of Birth"}
                </p>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MyProfile