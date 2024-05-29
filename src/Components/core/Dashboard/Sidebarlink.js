import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import {  matchPath, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { resetCourseState } from '../../../slices/courseSlice';


const Sidebarlink = ({link,iconName}) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname);
  }

  if(link.name == "Add Course"){
    dispatch(resetCourseState())
  }

  return (
    <NavLink 
    to={link.path} 
    // onClick={} Homework
    className={` relative px-8 py-2  flex  ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50 font-bold text-md":"bg-opacity-0 text-sm text-richblack-300 font-medium"}`}
    >
      <span className={`absolute h-full left-0 top-0 w-[0.2rem] bg-yellow-50 ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}></span>

      <div className='flex items-center gap-x-2'>
        <Icon className="text-lg"/>
        <span>{link.name}</span>
      </div>

    </NavLink>
  )
}

export default Sidebarlink