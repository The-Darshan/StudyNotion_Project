import React from 'react';
import {FooterLink2} from "../../Data/footer-links";
import { FaFacebook ,FaGoogle ,FaYoutube ,FaTwitter ,FaHeart, Fa4 } from "react-icons/fa6";
import Logo2 from "../../assets/Logo-Full-Light.png"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Company = ["About","Careers","Affiliates"]
const Resources = ["Articles","Blogs","Chart Sheet","Code Challenges","Docs","Projects","Videos","Workspaces"]

const Plans = ["Paid memberships","For students","Business solutions"]
const Community = ["Forums","Chapters","Events"]
const Lower = ["Privacy Policy","Cookie Policy","Terms"]

const Footer = () => {
  const {darkMode} = useSelector((state)=>state.theme)
  return (
    // Sabse bada div bg k
  <div className={`${darkMode ? 'medium' : 'light'} flex flex-col items-center justify-center w-full`}>

    {/* Jisme content h */}
    <div className='flex  justify-center mt-10 gap-12 '>
      {/* Left side */}
      <div className='flex gap-12'>
        <div className='flex flex-col cursor-pointer'>

          <div>
            <img src={Logo2}/>
          </div>

          <div className='flex flex-col mt-4'>
          <p className='mb-2 text-richblack-100 text-semibold'>Company</p>
              {
              Company.map((ele,indx)=>{
                return (<div key={indx} className=' mt-2 text-richblack-400 hover:text-richblack-50 cursor-pointer'>{ele}</div>)
              })
              }
        </div>

        <div className='flex gap-5 mt-3 text-richblack-400'>
          <FaFacebook/>
          <FaGoogle/>
          <FaTwitter/>
          <FaYoutube/>
        </div>

        </div>

        <div>

          <div className='mb-10'>
            <p className='text-richblack-100 mb-2'>Resources</p>
            {
              Resources.map((ele,indx)=>{
                return(
                  <div className='text-richblack-400 mt-2 cursor-pointer hover:text-richblack-50' key={indx}>
                    {ele}
                  </div>
                )
              })
            }
          </div>

          <div>

          </div>
          <p className='text-richblack-100 mb-2'>Support</p>
          <div className='text-richblack-400 mt-2 cursor-pointer hover:text-richblack-50'>Help Center</div>
        </div>

        <div>

          <div>
            <p className='text-richblack-100 mb-2'>Plans</p>
            {
              Plans.map((ele,indx)=>{
                return(
                  <div className='text-richblack-400 mt-2 cursor-pointer hover:text-richblack-50' key={indx}>
                    {ele}
                  </div>
                )
              })
            }
          </div>

          <div className='mt-10'>
            <p className='text-richblack-100 mb-2'>Community</p>
            {
              Community.map((ele,indx)=>{
                return(
                  <div className='text-richblack-400 mt-2 cursor-pointer hover:text-richblack-50' key={indx}>
                    {ele}
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>

     {/* Staright line bich ki */}
      <div className='h-98 bg-richblack-700 w-0.5'>
      </div>

      {/* Right Side div */}
            <div className='flex flex-row gap-12 justify-center'>

          {
            FooterLink2.map((ele,indx)=>{
              return(
                <div className='text-richblack-100 mb-2' key={indx}>
                  <div>{ele.title} </div>
                  <div >
                    {ele.links.map((ele2,indx)=>{
                      return(
                        <Link to={ele2.link}>
                        <div key={indx} className= ' hover:text-richblack-50 text-richblack-400 mt-2 cursor-pointer'>{ele2.title}</div>
                        </Link>
                      )
                    })}
                    </div>
                  </div>
              )
            })
          }
      


      </div>

    </div>

    {/* Lower Line */}

    <div className='h-0.5 bg-richblack-700 w-11/12 -mx-24  mt-9 '>
    </div>


    <div className='flex justify-around w-full gap-96 mr-3 text-richblack-300 mt-5 mb-20'>

      <div className='flex'>
        {
          Lower.map((ele,indx)=>{
            return (
              <div key={indx} className={` ${
                Lower.length - 1 === indx
                  ? "hover:text-richblack-50 cursor-pointer"
                  : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
              } px-3 `}>
                <div>
                {ele}
                </div>
              </div>
            )
          })
        }
      </div>

      <p className='tracking-widest'>
        Made with <FaHeart className='fill-pink-200 inline'/> CodeHelp © 2023 Studynotion
      </p>

    </div>

  </div>
  )
}

export default Footer