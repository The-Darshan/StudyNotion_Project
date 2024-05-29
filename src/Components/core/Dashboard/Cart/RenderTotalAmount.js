import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
import { MdCurrencyRupee } from "react-icons/md";
import { buyCourse } from '../../../../Services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router';
import { resetCart } from '../../../../slices/cartSlice';

const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state)=>state.cart)
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.profile)

    const handleBuyCourse = ()=>{
      if(token){
        const courses = cart.map((course)=>course._id);
        console.log("Bought these Courses :",courses);
        const buyed = buyCourse(token,dispatch,navigate,courses,user);
        if(buyed){
        dispatch(resetCart())
        }
      }
    }

  return (
    <div className='bg-richblack-800 h-fit py-7 rounded-lg border border-richblack-700 flex w-[30%] pr-5 justify-start flex-col pl-5 '>
        <p className='text-sm text-richblack-300'>Total :</p>
        <p className='text-yellow-50 text-4xl mt-2 mb-3 font-bold flex'> <MdCurrencyRupee/> {total}</p>
        <IconButton text="Buy Now" onclick={handleBuyCourse} customClasses={"w-full justify-center bg-yellow-50 rounded-md py-2 mt-2 font-semibold px-10 text-black"}/>
    </div>
  )
}

export default RenderTotalAmount