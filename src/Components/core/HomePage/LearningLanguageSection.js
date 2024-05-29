import React from 'react'
import HighlightText from './HighlightText'
import image1 from "../../../assets/Know_your_progress.png"
import image2 from "../../../assets/Compare_with_others.png"
import image3 from "../../../assets/Plan_your_lessons.png"
import CTAbutton from './Button'

const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-5 mt-[130px] mb-32 items-center'>

      <div className='font-inter text-4xl font-semibold text-center'>
        <h1>You Swiss knife for <HighlightText text={"learning any language"} a="#12D8FA" b="#12D8FA" c="#A6FFCB"/> </h1>
      </div>

      <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%]'>
      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      <div className='relative flex items-center mt-5'>
        <img src={image1} className='object-contain -mr-32'/>
        <img src={image2} className='object-contain'/>
        <img src={image3} className='object-contain -ml-36'/>
      </div>

      <div className='w-fit'>
        <CTAbutton active={true} linkedto={"/signup"}>
          Learn More
        </CTAbutton>
      </div>

    </div>
  )
}

export default LearningLanguageSection