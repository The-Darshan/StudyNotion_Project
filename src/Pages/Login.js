import React, { useState } from 'react';
import { FaAsterisk } from "react-icons/fa";
import xyz from "../assets/login.webp";
import background from "../assets/frame (2).png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../Services/operations/authAPI";

const Login = () => {
  const [eye, setEye] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEye() {
    setEye(!eye);
  }

  const [formdata, setFormData] = useState({
    email: "",
    password: ""
  });

  function clickHandler(e) {
    let { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log(formdata);
    dispatch(login(formdata.email, formdata.password, navigate));
  }

  return (
    <div className='bg-richblack-900 w-full'>
      <div className='flex flex-col lg:flex-row h-full'>
        {/* Left Div */}
        <div className='flex flex-col px-6 lg:px-14 lg:pr-24 py-8 lg:mt-16 h-full lg:w-1/2 gap-5'>
          <p className='text-2xl lg:text-4xl text-white font-inter font-semibold'>Welcome Back</p>
          <p className='text-richblack-100 lg:pr-40'>
            Build skills for today, tomorrow, and beyond. <span className='text-blue-100 font-edu-sa'>Education to future-proof your career.</span>
          </p>

          <form className='text-richblack-5 flex flex-col gap-1' onSubmit={submitHandler}>
            <label htmlFor="email" className='text-sm font-inter'>Email Address <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3' /></label>
            <input
              type="email"
              placeholder="Enter email address"
              id="email"
              name='email'
              value={formdata.email}
              onChange={clickHandler}
              required
              className='bg-richblack-700 shadow pl-2 py-3 rounded-lg lg:mr-24 shadow-[#999DAA] font-inter mb-2 text-md outline-none'
            />

            <div className='flex flex-col relative'>
              <label htmlFor="password" className='text-sm font-inter mt-2'>Password <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3 ml-1' /></label>
              <input
                type={eye ? "text" : "password"}
                placeholder="Enter Password"
                id="password"
                name='password'
                value={formdata.password}
                onChange={clickHandler}
                required
                className='bg-richblack-700 shadow pl-2 py-3 rounded-lg lg:mr-24 shadow-[#999DAA] font-inter text-md border-none outline-none'
              />
              <span className='absolute top-10 lg:top-12 right-4 lg:right-[120px] cursor-pointer' onClick={handleEye}>
                {eye ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
              </span>
            </div>

            <Link to="/forgotPassword" className='text-blue-100 text-inter flex justify-end pr-4 lg:pr-28 text-[12px] mt-1 font-inter'>
              Forgot Password
            </Link>

            <button type='submit' className='text-black bg-yellow-50 mt-8 lg:mr-24 rounded-lg py-2 text-center font-inter cursor-pointer font-md'>
              Sign In
            </button>
          </form>
        </div>

        {/* Right Div */}
        <div className='relative flex justify-center items-center lg:items-start lg:w-1/2 pt-10 lg:pt-20'>
          <img src={background} alt="Background" className='absolute w-80 lg:w-[460px] h-auto translate-x-2 lg:translate-x-5 translate-y-5' />
          <img src={xyz} alt="Login" className='absolute w-80 lg:w-[460px] h-auto' />
        </div>
      </div>
    </div>
  );
}

export default Login;
