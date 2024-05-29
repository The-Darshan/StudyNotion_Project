import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPassword } from "../Services/operations/authAPI";
import { FaAsterisk  } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [eye, setEye] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;
  const location = useLocation();

  function handleOnChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const abc = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="text-richblack-5 flex justify-center items-center h-[595px] font-inter">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <h1 className="text-3xl font-medium mb-3">Choose new Password</h1>
          <p className="text-richblack-100 w-11/12 mb-3 tracking-wide">
            Almost done. Enter your new password and youre all set.
          </p>

          <form onSubmit={abc}>
            <label className="relative">
              <p className="text-sm text-richblack-5">
                New Password
                <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3" />
              </p>
              <input
                type={eye ? "text" : "password"}
                placeholder="Enter Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                required
                className="bg-richblack-700  shadow pl-2  py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter  text-md w-11/12  border-none outline-none mb-5"
              />
            <span
              className="absolute right-28 top-9 cursor-pointer"
              onClick={() => setEye(!eye)}
              >
              {eye ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
            </span>
                  </label>

            <label className="relative">
              <p className="text-sm text-richblack-5">Confirm New Password <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3" /></p>
              <input
                className="bg-richblack-700  shadow pl-2  py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter  text-md w-11/12  border-none outline-none mb-4"
                required
                placeholder="Enter Confirm Password"
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
              />
            <span  className="absolute left-[353px] top-9 cursor-pointer" onClick={() => setShowConfirmPass(!showConfirmPass)}>
              {showConfirmPass ? (
                <AiOutlineEyeInvisible fontSize={24}  fill="#AFB2BF"/>
                ) : (
                  <AiOutlineEye fontSize={24}  fill="#AFB2BF"/>
                  )}
            </span>
                  </label>

            <button type="submit"  className='font-inter text-md font-medium text-richblack-900 bg-yellow-50 rounded-md  py-1.5  text-lg outline-none w-11/12 mt-4 mb-3'>Reset Password</button>
          </form>

          <div>
          <Link to='/login'>
                <p className="flex items-center gap-2 mt-2"  ><FaArrowLeftLong/>Back To Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
