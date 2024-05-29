import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { sendOTP, signup } from "../Services/operations/authAPI";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import  {FaArrowLeftLong} from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { loading, signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  function handleOnSubmit(e) {
    e.preventDefault();

    const {
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      accounttype,
    } = signupData;

    dispatch(
      signup(
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        accounttype,
        otp,
        navigate
      )
    );
  }
  return (
    <div className="text-richblack-5 flex justify-center items-center ml-12 mt-[150px]">
      {loading ? (
        <div className="spinner flex justify-center items-center"></div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold font-inter">Verify Email</h1>
          <p className="font-inter font-md text-[20px] text-richblack-100 text-md w-10/12 mt-3 mb-5">A verification code has been sent to you . Enter the code below</p>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} className="shadow shadow-[#999DAA] rounded-md aspect-square focus:border-0 focus:outline-2 focus:outline-yellow-50" placeholder="-"/>}
              inputStyle={{
                width:"60px",
                marginRight:"20px",
                height:'60px',
                backgroundColor:"#161D29",
              }}
              
            />
            <button type="submit" className='text-richblack-900 bg-yellow-50 mt-9 font-medium rounded-lg w-10/12 py-2.5 text-center font-inter cursor-pointer font-md text-md'>Verify Email</button>
          </form>

          <div className="flex items-center gap-44 mt-6">
          <div className="font-inter font-normal  ml-2 text-md font-md flex items-center">
              <Link to='/signup'>
                <p className="flex items-center gap-2"  ><FaArrowLeftLong/>Back To SignUp</p>
              </Link>
            </div>

            <button className=" flex items-center gap-2 text-blue-100" 
              onClick={() => dispatch(sendOTP(signupData.email, navigate))}
            >
              <RxCountdownTimer/>
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
