import React from 'react'
import { useSelector } from 'react-redux'
import {FaCheck} from "react-icons/fa"
import CourseInformationForm from './CourseInformationForm'
import CourseBuilder from './CourseBuilder/CourseBuilder'
import PublishCourse from './PublishCourse'

const RenderSteps = () => {
  const { step } = useSelector((state)=>state.course)

  const steps = [
    {
      id:1,
      title:"Course Information"
    },
    {
      id:2,
      title:"Course Builder"
    },
    {
      id:3,
      title:"Publish"
    },
    ]

  return (
    <div>
      <div className='flex  border-dashed border-richblack-700 ml-12'>
        {
          steps.map((item)=>(
            <>
            <div  key={item.id} className='flex flex-row '>
            <div className={`${step===item.id?"bg-yellow-900 border border-yellow-50 text-yellow-50":" border border-richblack-700 bg-richblack-800 text-richblack-300"} rounded-full w-10 h-10 flex justify-center items-center ${step>item.id? "bg-yellow-50":""}`}> 

            {
              step>item.id ? <FaCheck className="font-bold text-richblack-900"/>: (item.id)
            }
      </div>
            </div>
          
            {
              item.id !== steps.length && (
                <div className={` border-b-2 border-dashed h-[calc(34px/2)] w-[180px] ${ step > item.id  ? "border-yellow-50" : "border-richblack-5"}`}></div>
              )
            }
            </>
          ))
        }  
        </div>   
        <div className='flex mb-16 gap-x-28 ml-10 mt-2'>
          {
            steps.map((item)=>(
              <>
                <div key={item.id}>
                
                  <p className={`text-sm ${item.id==step? "text-white":"text-richblack-500"}`}>{item.title} </p>
                </div>
              </>
            ))
          }
        </div>

          {
            step ===1 && <CourseInformationForm/>
          }
          {
            step === 2 && <CourseBuilder/>
          }
          {
            step === 3 && <PublishCourse/>
          }

    </div>
  )
}

export default RenderSteps