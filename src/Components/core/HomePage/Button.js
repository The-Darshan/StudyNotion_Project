import React from 'react'
import { Link } from 'react-router-dom'

const CTAbutton = ({children,active,linkedto}) => {
  return (
    <Link to={linkedto}>
        <div className={`text-center text-[20px] px-6 py-3 rounded-md font-bold
            shadow ${active ? "bg-yellow-50 text-black shadow-yellow-5" :"bg-richblack-800 shadow-[#999DAA] text-white " } 
            hover:scale-95 transition-all duration-200 
        `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAbutton