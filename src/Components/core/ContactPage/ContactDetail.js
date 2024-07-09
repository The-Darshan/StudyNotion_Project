import React from 'react'
import { useSelector } from 'react-redux';
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
// * as Imports all the icon of the bi icons and store them in Icon1 named variable.
const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@studynotion.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ]
  
const ContactDetail = () => {
  const {darkMode} = useSelector((state)=>state.theme)
  return (
    <div className={`flex flex-col gap-12 ${darkMode ? "bg-richblack-800" : "border  border-black" } rounded-lg ml-12 py-10 font-inter w-[500px] h-fit`}>
            {
                contactDetails.map((item,indx)=>{
                    let Icon = Icon1[item.icon] || Icon2[item.icon] || Icon3[item.icon]
                    // [] brackets are used because the value of the item.icon is changing.
                    return(
                        <div key={indx} className='pl-8'>
                            <div className='flex gap-x-5'>
                                <Icon fontSize={24} className="text-richblack-200"/>
                                <h1 className='text-xl font-semibold '>{item?.heading}</h1>
                                </div>
                            <p className="text-richblack-200 text-medium font-medium">{item.description}</p>
                            <p className="text-richblack-200 text-medium font-semibold text-[14px] w-10/12">{item.details}</p>
                        </div>
                    )
                })
            }
    </div>
  )
}

export default ContactDetail