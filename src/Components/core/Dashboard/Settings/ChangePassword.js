import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaAsterisk } from "react-icons/fa";
import IconButton from "../../../common/IconButton";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../Services/operations/settingAPI";

const ChangePassword = () => {
  const [eye, setEye] = useState(false);
  const [eye2, setEye2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth)

  const [formdata, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  function clickHandeler(e) {
    let { name, value, type } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: (type = value),
      };
    });
  }

const handleUpdate = (e)=>{
    e.preventDefault();
    dispatch(changePassword(formdata.currentPassword,formdata.newPassword,token));  
}

  return (
    <form className="text-white" onSubmit={handleUpdate}>
      <div className="bg-richblack-800 border-2 font-inter border-richblack-700 rounded-lg p-7 px-10 flex flex-col ">
        <h1 className="text-lg font-semibold mb-5">Password</h1>
        <div className="flex mt-5">

          <div className="flex flex-col w-[50%] mb-2 relative">
            <label htmlFor="currentPassword" className="mb-1">
              <span className="text-sm "> Current Password </span>
              <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3 ml-1" />
            </label>

            <input
              type={eye ? "text" : "password"}
              placeholder="Enter Current Password"
              id="currentPassword"
              name="currentPassword"
              value={formdata.currentPassword}
              onChange={clickHandeler}
              required
              className="bg-richblack-700 shadow pl-2 mr-5 py-3 rounded-lg shadow-[#999DAA] font-inter text-md border-none outline-none "
            />
            <span
              className="absolute top-11 right-10 pl-10  cursor-pointer"
              onClick={() => setEye(!eye)}
            >
              {eye ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>

          <div className="flex flex-col w-[50%] relative">
            <label htmlFor="newPassword" className="mb-1">
              <span className="text-sm"> New Password </span>
              <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3 ml-1" />
            </label>

            <input
              type={eye2 ? "text" : "password"}
              placeholder="Enter New Password"
              id="newPassword"
              name="newPassword"
              value={formdata.newPassword}
              onChange={clickHandeler}
              required
              className="bg-richblack-700 shadow pl-2  py-3 rounded-lg  shadow-[#999DAA] font-inter  text-md border-none mr-5 outline-none"
            />
            <span
              className="absolute top-11 right-10 cursor-pointer"
              onClick={() => setEye2(!eye2)}
            >
              {eye2 ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-12 mb-12 flex justify-end gap-4">
        <IconButton text={"Cancel"} onclick={()=>navigate('/dashboard/my-profile')} type={'button'} customClasses={"text-white bg-richblack-700 rounded-md py-3 px-6 font-inter font-semibold outline-none"}/>
        <IconButton text={"Update"} type={"submit"} customClasses={"text-black bg-yellow-100 rounded-md py-3 px-6 font-inter font-semibold outline-none"}/>
      </div>
    </form>

  );
};

export default ChangePassword;
