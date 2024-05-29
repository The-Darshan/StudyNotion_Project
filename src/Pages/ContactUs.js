import React from 'react'
import ContactDetail from '../Components/core/ContactPage/ContactDetail'
import ContactUsForm from '../Components/common/ContactUsForm'
import Footer from '../Components/common/Footer'
import  ReviewSlider  from '../Components/common/ReviewSlider'

const ContactUs = () => {
  return (
    <div className='bg-richblack-900'>

        {/* Secton 1 */}
        <div className='flex mt-20 gap-x-10 mb-20'>
            {/* Left Div */}
             <ContactDetail/>

             {/* Right Div */}
             <div className='border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex flex-col w-[700px] '>
                <h1 className='text-white text-4xl mb-2 font-semibold'>
                Got a Idea? We've got the skills. Let's team up
                </h1>
                <p className='font-inter text-richblack-300'>
                Tell us more about yourself and what you're got in mind.
                </p>
                <ContactUsForm/>
             </div>
            </div>

                {/* Section 2 */}
            <div className='w-11/12 max-w-maxContent mx-auto text-white'>
               
               <h2 className='text-4xl font-semibold mt-32 mb-20 text-center'>Reviews from other Learners</h2>
          
               <ReviewSlider/>

            </div>

            <Footer/>

    </div>
  )
}

export default ContactUs