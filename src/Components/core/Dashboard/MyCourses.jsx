import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getInstructorDetails } from '../../../Services/operations/courseDetailsAPI'
import IconButton from '../../common/IconButton'
import CoursesTable from './InstructorCourses/CoursesTable'

const MyCourses = () => {
    const {token } = useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const [courses , setCourses] = useState([])

    useEffect(()=>
    {
        const fetchCourses = async()=>{ 
          const result = await getInstructorDetails(token);
          console.log(result)
        if(result){
            setCourses(result);
        }
    }
        fetchCourses()
    },[])

  return (
    <div className='text-white font-inter'>
        <div className='flex justify-between items-center mb-[60px]'>
          <h1 className='text-3xl font-semibold '>My Courses</h1>
          <IconButton text="Add Course +" customClasses="bg-yellow-50 px-5 py-2 text-black rounded-lg font-semibold font-imter cursor-pointer" onclick={()=>navigate("/dashboard/add-course")}/>
        </div>

        {
          courses && <CoursesTable courses={courses} setCourses={setCourses}/> 
        }
    </div>
  )
}

export default MyCourses