import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../Components/core/HomePage/HighlightText';
import CTAbutton from '../Components/core/HomePage/Button';
import boxOffice from '../assets/boxoffice.png'
import CodeBlocks from '../Components/core/HomePage/CodeBlocks';
import Timeline from '../Components/core/HomePage/Timeline';
import LearningLanguageSection from '../Components/core/HomePage/LearningLanguageSection';
import Instructor from '../Components/core/HomePage/Instructor';
import ExploreMore from '../Components/core/HomePage/ExploreMore';
import Footer from '../Components/common/Footer';
import ReviewSlider from '../Components/common/ReviewSlider';

const Home = () => {
  return (
    <div className='relative'>
      {/* section 1 */}

        <div className="relative mx-auto flex flex-col max-w-maxContent w-11/12 items-center text-white justify-between">

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-[19px] text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-sm font-inter shadow-[#999DAA]'>
                  
                  <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                  </div>

                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-12'>
              Empower Your Future With 
              <HighlightText text={"Coding Skills"} a="#12D8FA" b="#12D8FA" c="#A6FFCB"/> 
            </div>

            <div className='text-center text-richblack-300 w-[80%] mt-5 font-bold text-lg font-inter'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex gap-7 mt-12'>
                  <CTAbutton active={true} linkedto={"/signup"}>
                    Learn More
                  </CTAbutton>

                  <CTAbutton active={false} linkedto={"/login"}>
                      Book a Demo
                  </CTAbutton>
            </div>

            <div className='mx-3 my-[70px] shadow-abc'>
              <img src={boxOffice} width="2000px">
               
              </img>
            </div> 

            <div>
              <CodeBlocks
            
               heading={<div className='text-4xl font-semibold'>Unlock Your <HighlightText text={"coding potential"} a="#12D8FA" b="#12D8FA" c="#A6FFCB"/>  with your online courses.</div>}
               position={"lg:flex-row"}
               subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
               ctabtn1={{text:"Try it Yourself" , linkedto:"/signup" ,active:true}}
               ctabtn2={{text:"Learn More" , linkedto:"/login" ,active:false}}
               codeblock={`<!DOCTYPE html>\n <html>\n<head><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\n<h1><ahref="/">Header</a>\n/h1>\n<nav><ahref="one/">One</a></a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`}
               codeColor={"text-yellow-25"}
               backgrnGradient={"bg-gradient-to-r from-[#0E1A2D] to-[#111E32]"}
               />
            </div>

            <div>
              <CodeBlocks
             
               heading={<div className='text-4xl font-semibold w-[45%]'> Start <HighlightText text={"coding in seconds"} a="#12D8FA" b="#12D8FA" c="#A6FFCB"/> </div>}
               position={"lg:flex-row-reverse"}
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
               ctabtn1={{text:"Continue Lesson" , linkedto:"/signup" ,active:true}}
               ctabtn2={{text:"Learn More" , linkedto:"/login" ,active:false}}
               codeblock={`<!DOCTYPE html>\n <html>\n<head><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\n<h1><ahref="/">Header</a>\n/h1>\n<nav><ahref="one/">One</a></a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`}
               codeColor={"text-yellow-25"}
               backgrnGradient={"shadow-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFA500]/20 to-[#F8F8FF]/10"}
               />
            </div>


            <div>
              <ExploreMore/>
            </div>
          </div>

          {/* section2 */}

          <div className='bg-pure-greys-5 text-richblack-700 mt-44'>

          <div className='h-[310px] homepage_bg'>

              <div className='w-11/12 max-w-maxContent justify-center flex items-center gap-5 mx-auto'>
                  <div className='flex gap-7 mt-52 text-white'>
                  <CTAbutton active={true} linkedto={"/signup"}>
                    <div className='flex items-center gap-3'>
                    Explore Full Catalog
                    <FaArrowRight/>
                    </div>
                  </CTAbutton>

                  <CTAbutton active={false} linkedto={"/signup"}>
                    <div>
                      Learn More
                    </div>
                  </CTAbutton>

                  </div>


              </div>
          </div>

          <div className='max-w-maxContent w-11/12 mx-auto flex flex-col items-center justify-between gap-7'>

            <div className='flex gap-48 mt-24'>
                <div className='text-4xl font-semibold font-inter w-[45%]'>
                  Get the Skills you need for a <HighlightText text={"job that is in demand."} a="#12D8FA" b="#12D8FA" c="#A6FFCB"/>
                </div>  

                <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <p className='text-[16px]'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </p>
                    <div>
                      <CTAbutton active={true} linkedto={"/signup"}>
                          Learn More
                      </CTAbutton>
                    </div>

                </div>
            </div>

              
          <Timeline/>

          <LearningLanguageSection/>
          </div>


          </div>

          {/* section3 */}

          <div className='w-11/12 max-w-maxContent flex flex-col justify-between gap-8 bg-richblack-900 text-white items-center mx-auto'>

         <Instructor/>

         <h2 className='text-4xl font-semibold mt-10 mb-10 text-center'>Reviews from other Learners</h2>
          
          <ReviewSlider/>

          </div>


          {/* section4 */}
           <Footer/>

         </div>
        
  )
}

export default Home