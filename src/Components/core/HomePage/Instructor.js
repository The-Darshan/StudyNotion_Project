import React from 'react'
import instructor from "../../../assets/Instructor.png"
import HighlightText from './HighlightText'
import CTAbutton from './Button'
import { FaArrowRight } from "react-icons/fa";

const Instructor = () => {
  return (
    <div className='flex gap-20
     items-center mt-16 ml-20'>
        <div className='w-[50%]'>
            <img src={instructor} className='shadow shadow-white2'/>
        </div>

        <div className='w-[50%] flex flex-col gap-10'>
            <div className='text-4xl font-semibold font-inter w-[50%]'>
                Become an <HighlightText text={"Instructor"} a="#12D8FA" b="#12D8FA" c="#A6FFCB"/>
            </div>
            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

            <div className='w-fit'>
                <CTAbutton active={true} linkedto={"/signup"}>
                    <div className='flex gap-2 items-center'>
                    Start Learning Today
                    <FaArrowRight/>
                    </div>
                </CTAbutton>
            </div>

        </div>
    </div>
  )
}

export default Instructor