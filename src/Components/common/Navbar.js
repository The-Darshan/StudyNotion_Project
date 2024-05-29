import React, { useEffect, useState } from 'react'
import Logo from "../../assets/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../Data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { IoIosArrowDown } from "react-icons/io";
import { getAllCategories } from '../../Services/operations/courseDetailsAPI'
import { ACCOUNT_TYPE } from '../../utils/constant'
const Navbar = () => {

  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)
  const {totalItem} = useSelector((state) => state.cart)
  const location = useLocation();
  const [subLinks , setSubLinks] = useState([])

  const fetchSubLinks = async ()=>{
    try{
      const result = await getAllCategories();
      if(result){
      setSubLinks(result)
      }
    }
    catch(err){
      console.log("Category fetching error")
      console.log(err)
    }
  }
    useEffect(()=>{
     fetchSubLinks()
  },[])

  const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname);
  }

  return (
    <div className='flex h-14 items-center bg-[#161D29] justify-center border-b-[1px] border-b-richblack-700 w-full'>
      
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

          {/* Image Added */}
          <Link to='/'>
            <img src={Logo} width={160} height={32}/>
          </Link>

          <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
          {
            NavbarLinks.map((ele,indx)=>(
                <li key={indx}>
                    {
                    ele.title ==="Catalog"?
                    <div className= {`relative flex items-center gap-1 group  ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}>
                      <p className={`flex z-10 `}>{ele.title}</p>
                      <IoIosArrowDown className='flex z-10'/>

                      <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>

                      <div className='absolute -z-10 left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-45%] translate-x-[80%]'>
                      </div>
                        {
                          subLinks.length?
                              subLinks?.map((ele,indx)=>(
                                <Link className=' py-3 hover:bg-richblack-50 rounded-md pl-4' key={indx} to={`/catalog/${ele.name.split(" ").join("-").toLowerCase()}`}>
                                  {ele.name}
                                </Link>
                              ))  
                          :
                          <div></div>
                        }
                      </div>

                    </div>
                    :
                    <Link to={ele.path}>
                      <p className={`${matchRoute(ele.path)?"text-yellow-25" :" text-richblack-25" }`}>
                      {ele.title}
                      </p>
                    </Link>
                    }
                  </li>
              )
            )
          }
          </ul>
          </nav>

          {/* Login / Signup / Dashboard */}
          <div className='flex gap-x-5 justify-center items-center relative'>

            {
              user && user?.accounttype != ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to='/dashboard/cart' className='relative text-richblack-200' >
                  <FaShoppingCart size={24}/>
                  {
                    totalItem > 0  && (
                      <span className='absolute top-3 left-3 z-10 text-yellow-50 rounded-full bg-richblack-600 w-5 h-5 flex justify-center items-center text-xs'>
                        {totalItem}
                      </span>
                    )
                  }
                </Link>
              )
            }
            {
              token===null && (
                <Link to='/login'>
                  <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                    Log in
                  </button>
                </Link>
              )
            }
            {
              token===null && (
                <Link to='/signup'>
                  <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                    Sign Up
                  </button>
                </Link>
              )
            }
            {
              token!==null && (
                <ProfileDropDown/>
              )
            }
          </div>

        </div>
    </div>
  )
}

export default Navbar