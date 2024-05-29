import React from 'react';
import HighlightText from '../Components/core/HomePage/HighlightText';
import BannerImage1 from  "../assets/aboutus1.webp";
import BannerImage2 from  "../assets/aboutus2.webp";
import BannerImage3 from  "../assets/aboutus3.webp";
import FoundingStory from "../assets/FoundingStory.png"
import StatsComponent from '../Components/core/AboutPage/StatsComponent';
import LearningGrid from '../Components/core/AboutPage/LearningGrid';
import ContactFormSection from '../Components/core/AboutPage/ContactFormSection';
import Footer from '../Components/common/Footer';
import ReviewSlider from '../Components/common/ReviewSlider';

const About = () => {
  return (
    <div className='text-richblack-5'>
        
        {/* Section 1 */}

        <section className='bg-richblack-700'>
            <div className='pt-16 relative'>
                <header className='flex justify-center items-center flex-col'>
                <h1 className='text-4xl pl-28 w-8/12 font-inter font-semibold flex justify-center items-center flex-col'>
                Driving Innovation in Online Education for a
                <HighlightText text="Brighter Future" a="#12D8FA" b="#12D8FA" c="#A6FFCB"/>
                </h1>
                <p className='text-richblack-300 w-8/12 text-center font-semibold mt-3 mb-72'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>
            <div className='flex gap-x-10 mx-auto absolute top-60 pl-16 mt-12'>
                <img src={BannerImage1}/>
                <img src={BannerImage2}/>
                <img src={BannerImage3}/>
            </div>

            </div>
        </section>

        {/* Section 2 */}
        <section className='mt-40 flex text-4xl font-bold ml-10 mr-20 text-center mb-24 w-11/12 max-w-maxContent'>
            <div>
            We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text="combines technology" />,{" "}
            <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819]   text-transparent bg-clip-text'>{" "} expertise</span>{" "}, and community to create an {" "}<span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text'>unparalleled educational experience.</span>
            </div>
        </section>

            <div className='border-b-2 border-richblack-700 mb-24'>
            </div>

        {/* Section 3 */}
        <div className='flex flex-col mb-24'>
                {/* Div 1 */}
                <div className='flex'>
                    {/* Left Part */}
                    <div className='ml-12 mb-56 w-[50%]'>
                        <h1 className='bg-gradient-to-b from-[#833AB4] via-[#FD1D1D] to-[#FCB045]  text-transparent bg-clip-text text-4xl font-inter font-semibold mb-5'>
                        Our Founding Story
                        </h1>

                        <p className='text-richblack-300  mt-10 font-inter font-medium'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p className='text-richblack-300  mt-10 font-inter font-medium'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* Right Div */}
                    <div className='w-[50%] ml-52 mt-12'>
                        <img src={FoundingStory}  className='shadow-[0_0_20px_0] shadow-[#FC6767] w-[450px]'  />
                    </div>
                </div>
                
                {/* Div 2 */}
                <div className='flex flex-row gap-32'>
                    {/* Left Box */}
                    <div className='w-[50%] ml-12'>
                        <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819]   text-transparent bg-clip-text text-4xl font-semibold '>Our Vision</h1>
                        <p className='mt-8 w-10/12 pr-10 font-medium text-richblack-300 font-inter'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                        {/* Right Box */}
                    <div className='w-[50%]'>
                        <h1 className='text-4xl font-medium'>
                            <HighlightText text={"Our Mission"}/>
                        </h1>
                        <p className='mt-8 w-11/12 pr-20 text-richblack-300 font-inter font-medium'>
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
        </div>

        {/* Section 4 */}
        <StatsComponent/>

        {/* Section 5 */}
            <section className='flex flex-col items-center justify-between gap-5'>
                <LearningGrid/>
                <ContactFormSection/>
            </section>

            <div className='w-11/12 max-w-maxContent mx-auto text-white'>
               
               <h2 className='text-4xl font-semibold  mb-20 text-center'>Reviews from other Learners</h2>
          
               <ReviewSlider/>

            </div>

        {/* Footer */}
            <Footer/>

    </div>
  )
}

export default About