import React, { useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaAsterisk } from "react-icons/fa";
import { getPasswordResetToken } from "../Services/operations/authAPI";
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  const [emailSent, setEmailSent] = useState(false);

  function handleOnSubmit(e){
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent)) 
  }

  return (
    <div>
      {loading ? (
        <div className="spinner flex justify-center items-center"></div>
      ) : (
        <div className="text-richblack-5 h-[596px] flex justify-center translate-x-[35%] flex-col">
          <h1 className="text-3xl font-inter font-semibold">{!emailSent ? "Reset your Password" : "Check email"}</h1>

          <p className="font-inter text-richblack-100 text-xl mt-4 w-4/12 mb-4">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to
            ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label htmlFor="email">
                <p className="font-inter text-sm mb-2">Email Address<FaAsterisk className="mb-3 inline-block ml-1 fill-pink-300" fontSize={6}/></p>
                <input 
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-richblack-700 w-4/12 shadow text-white pl-2 py-2.5 rounded-lg shadow-[#999DAA] font-inter mb-3  text-md outline-none"
                ></input>
                  <br></br>
                <button type="submit" className='text-richblack-900 bg-yellow-50 mt-3 font-medium rounded-lg w-4/12 py-2.5 text-center font-inter cursor-pointer font-md'>
                  {!emailSent ? "Submit" : "Resend Email"}
                </button>
              </label>
            )}
          </form>

            <div className="font-inter mt-5 ml-2 text-md font-md flex items-center">
              <Link to='/login'>
                <p className="flex items-center gap-2"  ><FaArrowLeftLong/>Back To Login</p>
              </Link>
            </div>

        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
