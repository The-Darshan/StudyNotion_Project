import React from 'react'
import Logo1 from "../../../assets/Logo1.svg"
import Logo2 from "../../../assets/Logo2.svg"
import Logo3 from "../../../assets/Logo3.svg"
import Logo4 from "../../../assets/Logo4.svg"
import timelineImage from "../../../assets/TimelineImage.png"

const timeline=[
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully comitted to the success company"

    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"

    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills"

    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"

    },
]

const Timeline = () => {
  return (
    <div className='flex gap-52 items-center'>
        
        <div className='flex flex-col w-[45%] gap-5'>
            <div>
                {
                    timeline.map((ele,indx)=>{
                        return (
                            <div key={indx} className='flex gap-6 mt-12 ml-10 items-start mb-10'>
                                <div className='w-[50px] h-[50px] flex flex-col justify-center items-center bg-white rounded-[100%]'>
                                    <img src={ele.Logo}/>
                                </div>
                                <div>
                                    <h2  className='font-semibold text-[18px]'>{ele.heading}</h2>
                                    <p  className='text-base'>{ele.Description}</p>
                                </div>
                                <div className={ `${timeline.length-1 == indx ? "":"w-0.5 h-9 bg-[#AFB2BF] absolute mt-14 ml-6"}` }></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <div className='relative shadow-blue-200'>
             <img className='shadow-white object-cover h-fit' src={timelineImage}/>
             
             <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>

                <div className='gap-5 flex items-center px-7'>
                <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                </div>
             </div>
        </div>

    </div>
  )
}

export default Timeline