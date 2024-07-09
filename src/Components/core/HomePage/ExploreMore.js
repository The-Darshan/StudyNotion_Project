import React, { useState } from 'react'
import { HomePageExplore } from '../../../Data/homepage-explor';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
import { useSelector } from 'react-redux';

const tabName=["Free","New to coding","Most popular","Skills paths","Career paths"];

const ExploreMore = () => {
    
    const [currentTab,setCurrentTab] = useState(tabName[0])
    const [course , setCourse] = useState(HomePageExplore[0].courses)
    const [currentCard ,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)   
    const {darkMode} = useSelector((state)=>state.theme)

    const setMyCards = (value)=>{
        setCurrentTab(value)
        const result = HomePageExplore.filter((course)=>course.tag==value)
        setCourse(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div>
        
        <div className='text-4xl font-inter font-semibold text-center'>
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>
        
        <p className='text-center text-richblack-300 text-md mt-3'>
        Learn to Build Anything You Can Imagine
        </p>

        <div className='flex bg-richblack-800 rounded-md mb-5 border-richblue-100 mt-5 px-1 py-1 gap-5 shadow shadow-[#999DAA]'>
            {
                tabName.map((tab,indx)=>{
                    return(
                    <div className={`text-[16px] flex flex-row gap-2 ${currentTab === tab ?`${ darkMode ?"bg-richblack-900": "bg-richblack-100"} text-richblack-5 font-medium` :"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={indx} onClick={(e)=>setMyCards(e.target.textContent
                    )}>{tab}</div>
                    )
                })
            }
        </div>

   
            <div className='flex absolute  gap-2 w-full left-0 mt-5'>
                {
                    course.map((ele,indx)=>{
                        return (
                            <CourseCard key={indx} cardData={ele} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                        )
                    }
                    )
                }
        </div>

    </div>
  )
}

export default ExploreMore