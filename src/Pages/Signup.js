import React, { useState } from 'react';
import { FaAsterisk } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import signup from "../assets/signup.webp";
import frame from "../assets/frame (2).png" 
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP } from '../Services/operations/authAPI';
import { setSignupData} from "../slices/authSlice"
import {ACCOUNT_TYPE} from "../utils/constant"

const Signup = () => {

  const [eye,setEye] = useState(false)
  const [eye2,setEye2] = useState(false)
  const [active,setActive] = useState(false)
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)


  function handleEye(){
    setEye(!eye)
  }

  function handleEye2(){
    setEye2(!eye2)
  }

  function roleHandeler(a){
    if(a==ACCOUNT_TYPE.STUDENT){
      setAccountType(ACCOUNT_TYPE.STUDENT)
      setActive(true);
    }
   else{
      setAccountType(ACCOUNT_TYPE.INSTRUCTOR)
      setActive(false)
    }
  }

  const [formData , setFormData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmpassword:""
  })

  function formHandeler(e){
    let {name , value, type} = e.target
    setFormData(prev=>{
      return{
        ...prev,
        [name]:type = value
      }
    })
  } 

  function submitHandeler(e){
    e.preventDefault();
    if(formData.password !== formData.confirmpassword){
      return 
    }

    const Data = {
      ...formData,
      accounttype:accountType
    }

    dispatch(setSignupData(Data))
    dispatch(sendOTP(formData.email,navigate));
    console.log(formData.password,formData.confirmpassword)
    setFormData({
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      confirmpassword:""
    })
  }
  return (
    <div>
        <div className='flex flex-row'>

          {/* Left Side Div */}

          <div className='w-[50%] flex flex-col mt-12 ml-16'>

            <p className='text-richblack-5 text-4xl font-semibold font-inter pr-32'>Join the millions learning to code with StudyNotion for free</p>

            <p className='text-richblack-100 font-edu-sa w-6/12 mt-5 mb-8'>Build skills for today, tomorrow, and beyond. <span className='text-blue-100'>Education to future-proof your career.</span></p>

            <div className='bg-richblack-800 cursor-pointer flex justify-start font-inter text-richblack-200 w-4/12 pr-2 py-1 rounded-full gap-5 shadow shadow-[#999DAA] mb-8'>
              <button onClick={()=>roleHandeler(ACCOUNT_TYPE.STUDENT)} className={active?"bg-richblack-900 rounded-full text-richblack-5 px-5 py-2 ml-2":" ml-8"}>
                Student
              </button>
              <button onClick={()=>roleHandeler(ACCOUNT_TYPE.INSTRUCTOR)} className={active?"":"bg-richblack-900 rounded-full text-richblack-5 px-5 py-2 "}>
                Instructor
              </button>
            </div>

            <form className='text-richblack-5' onSubmit={submitHandeler}>
            
            <div className='flex mb-3'>
              <div className='-mr-14'>
                <label htmlFor='firstname' className=' font-inter text-sm'>First Name <FaAsterisk className='inline fill-pink-200 w-1.5 mb-3'/></label>
                <br>
                </br>
                <input id='firstname' name='firstname' type='text' placeholder='Enter first name' className='bg-richblack-700 shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-1  text-md outline-none w-9/12' required value={formData.firstname} onChange={formHandeler}/>
              </div>

              <div>
              <label htmlFor='lastname' className='font-inter text-sm'>Last Name<FaAsterisk className='inline fill-pink-200 w-1.5 mb-3'/></label>
                <br>
                </br>
                <input id='lastname' name='lastname' type='text' placeholder='Enter last name' className='bg-richblack-700 shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-1  text-md outline-none' required value={formData.lastname} onChange={formHandeler}/>
              </div>
            </div>

            <div className='mb-3'>
              <div className='w-8/12 pr-1.5'>
                <label htmlFor='email' className=' font-inter text-sm'>Email  Address <FaAsterisk className='inline fill-pink-200 w-1.5 mb-3'/></label>
                <br>
                </br>
                <input id='email' name='email' type='text' placeholder='Enter email address' className='bg-richblack-700 shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-1  text-md outline-none w-full' required value={formData.email} onChange={formHandeler}/>
              </div>
            </div>

            <div className='flex mb-10'>
              <div className='relative -mr-14'>
                <label htmlFor='password' className=' font-inter text-sm'>Create Password <FaAsterisk className='inline fill-pink-200 w-1.5 mb-3'/></label>
                <br>
                </br>
                <input id='password' name='password' type={eye?"text":"password"} placeholder='Enter Password' className='bg-richblack-700 shadow  pl-2 py-3 rounded-lg mr-24 w-9/12 -pr-2 shadow-[#999DAA] font-inter mb-1  text-md outline-none ' required value={formData.password} onChange={formHandeler}/>
                <span className='absolute  left-[190px] top-[39px]'>
                {
                  eye?<AiOutlineEyeInvisible onClick={handleEye} fontSize={22} fill="#AFB2BF"/>:<AiOutlineEye onClick={handleEye} fontSize={22} fill="#AFB2BF"/>
                }
                </span>
              </div>

              <div className='relative '>
              <label htmlFor='confirmpassword' className='font-inter text-sm'> Confirm Password<FaAsterisk className='inline fill-pink-200 w-1.5 mb-3'/></label>
                <br>
                </br>
                <input id='confirmpassword' name='confirmpassword' type={eye2?"text":"password"} placeholder='Confirm Password' className='bg-richblack-700 shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-1  text-md outline-none' required value={formData.confirmPassword} onChange={formHandeler}/>

                <span className='absolute  left-[170px] top-[39px]'>
                {
                  eye2?<AiOutlineEyeInvisible onClick={handleEye2} fontSize={22} fill="#AFB2BF"/>:<AiOutlineEye onClick={handleEye2} fontSize={22} fill="#AFB2BF"/>
                }
                </span>

              </div>
            </div>

                <button type='submit' className='font-inter text-md font-medium text-richblack-900 bg-yellow-50 rounded-md pl-2 py-1.5 mb-10 text-lg outline-none w-8/12 mr-10'>Create Account</button>
            </form>
          </div>


          {/* Right Side Div */}

          <div className='relative w-[40%] flex ml-20 mt-8'>
            <img src={frame} width={450} height={450} className='left-4 top-4 absolute'/>
            <img src={signup} className='absolute' width={450} height={450}/>
          </div>

        </div>
    </div>
  )
}

export default Signup