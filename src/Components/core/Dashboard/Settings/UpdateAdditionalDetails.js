import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateProfile } from "../../../../Services/operations/settingAPI";
import IconButton from "../../../common/IconButton";
import { useNavigate } from "react-router";
import { setUser } from "../../../../slices/ProfileSlice";

const UpdateAdditionalDetails = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const gender = ["Male","Female","Non-Binary","Prefer not to say","Other"]

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  // const[userData,setUserData] = useState([])
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();


  // console.log(user)

  // useEffect(()=>{

  //   const fetchDetails = async()=>{

  //     setLoading(true)
  //     const response = await getUserDetails(token);

  //     if(response){
  //     setUserData(response)
  //     }
  //     else{
  //       toast.error("Not Fetched")
  //     }
  //     setLoading(false)
  //   }
  //   fetchDetails();
  // },[])

  // useEffect(()=>{
  //   if(userData){
  //     setValue("firstname",userData?.firstname)
  //     setValue("lastname",userData?.lastname)
  //     setValue("contactNumber",userData?.additionalinfo?.contactNumber)
  //     setValue("about",userData?.additionalinfo?.about)
  //     setValue("gender",userData?.additionalinfo?.gender)
  //     setValue("dateOfBirth",userData?.additionalinfo?.dateOfBirth)
  //   }
  // },[userData])

  const submitHandeler = async(data) => {
    setLoading(true)
    const result = await updateProfile(data,token);
    if(result){
      dispatch(setUser(result))
    }
    setLoading(false)
  };

  return (
    <div className="mb-32 ">
      <div className="bg-richblack-800 font-inter rounded-lg border border-richblack-600 p-7 px-10 flex flex-col relative">
        <h1 className="text-lg font-semibold mb-5">Profile Information </h1>
        <form onSubmit={handleSubmit(submitHandeler)} className="flex gap-x-1 justify-between">
          <div className="flex w-full">
          <div className="flex flex-col w-[50%] mb-2 relative">
            <div className="flex flex-col">
              <label htmlFor="firstname" className="text-sm mb-1 mt-5" >
                First Name{" "}
                <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3 ml-1" />{" "}
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                id="firstname"
                {...register("firstname", { required: true })}
                className="bg-richblack-700 shadow pl-2 mr-5 py-3 rounded-lg shadow-[#999DAA] font-inter text-md border-none outline-none"
                defaultValue={user?.firstname}
              />
              {errors.firstname && (
                <span className="text-yellow-100 text-xs mt-2" >
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="dateOfBirth" className="text-sm mb-1 mt-5">
                Date of Birth{" "}
                <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3 ml-1" />
              </label>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                id="dateOfBirth"
                {...register("dateOfBirth", {
                  required:{ value: true, message: "Please enter your Date of Birth."},
                  valueAsDate : true , 
                  max : {value : Date.now() ,  message: "Date of Birth cannot be in the future." },
                })}
                defaultValue={user?.additionalinfo?.dateOfBirth}
                className="bg-richblack-700 shadow pl-2 mr-5 py-3 rounded-lg shadow-[#999DAA] font-inter text-md border-none outline-none"
              />
              {errors.dateOfBirth && (
                <span className="text-yellow-100 text-xs mt-2" >
                    {errors.dateOfBirth.message}
                                  </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="contactNumber" className="text-sm mb-1 mt-5">
                Contact Number{" "}
                <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3 ml-1" />
              </label>
              <input
                type="number"
                className="bg-richblack-700 shadow pl-2 mr-5 py-3 rounded-lg shadow-[#999DAA] font-inter text-md border-none outline-none "
                id="contactNumber"
                placeholder="Enter Contact Number"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                  maxLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalinfo?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="text-yellow-100 text-xs mt-2" >
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col w-[50%] mb-2  relative">
            {/* LASTNAME */}
            <div className="flex flex-col">
              <label htmlFor="lastname" className="text-sm mb-1 mt-5" > 
                Last Name{" "}
                <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3 ml-1" />
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter last name"
                className="bg-richblack-700 shadow pl-2 mr-5 py-3 rounded-lg shadow-[#999DAA] font-inter text-md border-none outline-none "
                {...register("lastname", { required: true })}
                defaultValue={user?.lastname}
              />
              {errors.lastname && (
                <span className="text-yellow-100 text-xs mt-2" >Please enter your last name.</span>
              )}
            </div>

            {/* GENDER */}
            <div className="flex flex-col">
            <label htmlFor="gender" className="text-sm mb-1 mt-5" > Gender                 <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3 ml-1" /></label>
            <select
              id="gender"
              {...register("gender", { required: true })}
              className="bg-richblack-700 shadow pl-2 mr-5 py-4 rounded-lg shadow-[#999DAA] font-inter text-md border-none outline-none "
              defaultValue={user?.additionalinfo?.gender}
            >
             {
              gender.map((items,indx)=>(
                <option key={indx}>
                  {items}
                </option>
              ))
             }
            </select>
            {errors.gender && (
              <span className="text-yellow-100 text-xs mt-2" >Please select an option.</span>
            )}
            </div>

            {/* ABOUT */}

            <div className="flex flex-col">
              <label htmlFor="about" className="text-sm mb-1 mt-5" >About                 <FaAsterisk className="fill-pink-200 inline w-1.5 mb-3 ml-1" /></label>
              <input
                type="text"
                id="about"
                placeholder="Enter Bio Details"
                {...register("about", { required: true })}
                className="bg-richblack-700 shadow pl-2 mr-5 py-3 rounded-lg shadow-[#999DAA] font-inter text-md border-none outline-none "
                defaultValue={user?.additionalinfo?.about}
              />
              {errors.about && (
                <span className="text-yellow-100 text-xs mt-2" >Please enter your About.</span>
              )}
            </div>
          </div>

          <div className="mt-20 mb-12 absolute flex right-0 -bottom-[135px] justify-end gap-4">
        <IconButton text={"Cancel"}  type={'button'} onclick={()=>navigate("/dashboard/my-profile")} customClasses={"text-white bg-richblack-700 rounded-md py-3 px-6 font-inter font-semibold outline-none"}/>
        <IconButton text={"Save"} type={"submit"} customClasses={"text-black bg-yellow-100 rounded-md py-3 px-6 font-inter font-semibold outline-none"}/>
        </div>

      </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdditionalDetails;
