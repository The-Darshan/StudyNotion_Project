import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setLoading } from "../../slices/authSlice";
import countryCode from "../../Data/countrycode.json";
import { DevTool } from "@hookform/devtools";
import { contact } from '../../Services/apis'
import toast from "react-hot-toast";
import { apiConnector } from "../../Services/apiconnector";

const ContactUsForm = () => {
  const [loading, setLoding] = useState(false);
  // We created another variable for loading because these are open routes , A person without even registering can come to this place , and that loading is for auth Pages.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    control
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data : ", data);
    try {
      setLoding(true);
      const response = await apiConnector("POST" , contact.CONTACT_API , data)
      toast.success("Submitted Successfully");
      setLoding(false);

    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      email: "",
      firstname: "",
      lastname: "",
      message: "",
      phoneNo: "",
    });
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5 text-black mt-10 w-full">
        <div className="flex gap-5 w-full">
          {/* FirstName */}
          <div className="flex flex-col w-[50%]">
            <label htmlFor="firstname" className="text-white font-inter font-med text-sm">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
              className='bg-richblack-700 shadow  pl-2 py-3 rounded-lg shadow-[#999DAA] font-inter mb-2   text-md outline-none text-white mt-2'
            />
            {errors.firstname && <span  className="text-pink-100 text-xs">Please Enter Your Firstname</span>}
          </div>

          {/* Lastname */}
          <div className="flex flex-col w-[50%]">
            <label htmlFor="lastname" className="text-white text-sm">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              {...register("lastname")}
              placeholder="Enter last name"
              className='bg-richblack-700 shadow  pl-2 py-3 rounded-lg shadow-[#999DAA] font-inter mb-2  text-md outline-none text-white mt-2'
            />
              {errors.firstname && <span  className="text-pink-100 text-xs">Please Enter Your Lastname</span>}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white text-sm">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            {...register("email", { required: true })}
            className='bg-richblack-700 shadow  pl-2 py-3 rounded-lg shadow-[#999DAA] font-inter mb-2  text-md outline-none text-white mt-2'
          />
          {errors.email && <span  className="text-pink-100 text-xs">Please enter your email address</span>}
        </div>

        {/* Phone number */}
        <div className="flex gap-x-10 flex-col">

          <label htmlFor="phoneNo" className="text-richblack-5 text-sm font-inter">
            Phone Number
          </label>

          <div className="flex gap-6 mt-2">
            {/* Drop down */}
              <select
              className="w-[60px] h-[48px] bg-richblack-700 shadow rounded-md shadow-[#999DAA] text-white  pl-2 mt-2 outline-none"
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true , message:"Enter the Country Code" })}
              >
                {countryCode.map((ele, indx) => {
                  return (
                    <option key={indx} value={ele.code}>
                     <span >{ele.code}</span>  
                     -
                     <span >{ele.country}</span>
                    </option>
                  );
                })}
                {
                  errors.countrycode && <span className="text-pink-100 text-xs">{errors.countrycode.message}</span>
                }
              </select>
              <input
                type="number"
                name="phoneNo"
                id="phoneNo"
                placeholder="12345-6789"
                className=" w-[calc(100%-90px)] bg-richblack-700 shadow  pl-2 py-3 rounded-lg shadow-[#999DAA] font-inter mb-2  text-md outline-none text-white mt-2"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter your phone number",
                  },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                  maxLength: { value: 10, message: "Invalid Contact Number" },
                })}
              />
          </div>
          {errors.phoneNo && <span className="text-pink-100 text-xs">{errors.phoneNo.message}</span>}
        </div>

        {/* Messages */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-white font-inter text-sm">Message</label>
          <textarea
            placeholder="Enter your message here"
            id="message"
            {...register("message", { required: true })}
            name="message"
            cols={30}
            rows={7}
            className="mt-2 bg-richblack-700 text-white outline-none shadow  pl-2 py-3 rounded-lg shadow-[#999DAA]"
          />
          {errors.message && <span  className="text-pink-100 text-xs mt-2">Please enter your message.</span>}
        </div>


        <button
          className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black mt-3 py-3"
          type="submit"
        >
          Send Message
        </button>
      </div>
      <DevTool control={control}/>
    </form>
  );
};

export default ContactUsForm;
