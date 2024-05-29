import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { removefromCart } from "../../../../slices/cartSlice"
import { MdCurrencyRupee } from "react-icons/md";

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch()

  return (
    <div>
        {
            cart.map((course,indx)=>(
                <div key={indx} className={`flex w-full gap-x-28 ${(cart.length)-1=== indx ?"":" border-b border-richblack-300 pb-9"}`}>

                    <div className='flex'>
                        <img src={course?.thumbnail} className='w-[200px] h-[148px]'/>
                        <div className='pl-4'>
                            <p className='text-lg'>{course?.title}</p>
                            <p className='text-richblack-300 mt-1 mb-1'>{course?.category?.name}</p>
                            <div className='flex items-center justify-center gap-x-2'>
                                <span className='text-yellow-50 font-semibold'>
                                    4.8
                                    {/* Call the average rating function and chance he value */}
                                </span>
                                <ReactStars
                                    count = {5}
                                    edit={false}
                                    size={20}
                                    activeColor = "#ffd700"
                                    emptyIcon = {<GiNinjaStar/>}
                                    fullIcon = {<GiNinjaStar/>}
                                />
                                <span className='text-richblack-300'>{course?.ratingAndReview.length} Ratings </span>
                            </div>
                        </div>
                    </div>

                    <div >
                        <button className='flex rounded-md text-pink-200 border border-richblack-500 bg-richblack-700' onClick={()=>{dispatch(removefromCart(course._id))}} >
                            <div className='flex justify-center gap-x-2 items-center py-3 px-3 font-bold'>
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                            </div>
                        </button> 

                        <p className='flex text-yellow-50 text-3xl items-center justify-end mt-3 font-semibold'><MdCurrencyRupee/> {course?.price}</p>
                    </div>

                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses