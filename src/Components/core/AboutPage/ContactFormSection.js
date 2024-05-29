import React from 'react';
import ContactUsForm from '../../common/ContactUsForm';

const ContactFormSection = () => {
  return (
    <div className='mx-auto mb-[150px] mt-5 font-medium'>
        <h1 className='text-center text-4xl mb-3 font-semibold'>
            Get in Touch
        </h1>
        <p className='text-center font-inter text-richblack-300'>
        We'd love to here for you, Please fill out this form.
        </p>
        <div className='w-[500px]'>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection