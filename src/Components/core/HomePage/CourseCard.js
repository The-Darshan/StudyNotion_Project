import React from 'react'
import { IoMdPeople } from "react-icons/io";
import {ImTree} from "react-icons/im";

const CourseCard = ({setCurrentCard,cardData,currentCard}) => {
  return (
    
      <div onClick={()=>{setCurrentCard(cardData.heading)}} className={`${currentCard==cardData.heading ? "flex flex-col bg-white mt-6 w-8/12 mr-12 -pr-20 font-inter hover:bg-richblack-5 shadow-[12px_12px_0_0] shadow-yellow-50 transition-all duration-200" :"flex flex-col  bg-richblack-800 w-8/12 mt-6 hover:bg-richblack-5 hover:text-richblack-800 mr-12 -pr-20 font-inter"}`}>

        <div className={`${currentCard==cardData.heading ?"mt-7 ml-5 font-inter font-semibold text-xl text-richblack-900" :"mt-7 ml-5 font-inter font-semibold text-xl text-white"}`}>
          {cardData.heading}
        </div>

        <p className='ml-5 mt-5 w-11/12 mb-20 text-richblack-400'>
          {cardData.description}
        </p>

      <div className='flex justify-around border-t-[2px] border-dashed border-richblack-500 pt-3 mb-5 text-blue-300 gap-20'>
        <p className='flex items-center gap-2 justify-center'>
          <IoMdPeople/>
          {cardData.level}
        </p>

        <p className='flex items-center gap-2 justify-center'>
          <ImTree/>
          {cardData.lessionNumber+" Lession"}
        </p>

        </div>

      </div>

  )
}

export default CourseCard