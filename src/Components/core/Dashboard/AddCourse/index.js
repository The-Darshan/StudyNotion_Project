import React from 'react'
import RenderSteps from './RenderSteps'
import { AiOutlineThunderbolt } from "react-icons/ai";

const AddCourse = () => {
    
  return (
    <>
        <div className='text-white flex gap-7'>
            <div className='w-[60%]'>
                <h1 className='font-inter text-4xl font-bold mb-10'>Add Course</h1>
                <div>
                    <RenderSteps/>
                </div>
            </div>
            <div className=' bg-richblack-800 rounded-lg border-richblack-700 border h-fit w-96 p-6 font-inter flex justify-center items-start flex-col gap-y-6 right-20'>
                <p className='text-lg font-semibold flex gap-x-2 justify-center items-center'><AiOutlineThunderbolt className='inline-block' fill='#FFD60A'/>Course Upload Tips</p>
                <ul className='flex gap-y-3 flex-col text-xs list-disc ml-4'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default AddCourse