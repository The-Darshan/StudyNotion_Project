import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {

    const {total,totalItem} = useSelector((state)=>state.cart)

  return (
    <div className='text-white font-inter w-full h-full'> 
        <h1 className='text-4xl mb-10'>Cart</h1>
        <p className='text-richblack-300 border-b pb-2 font-semibold border-richblack-300'>{totalItem} {totalItem.length>1 ? "Courses in Cart":"Course in Cart"}</p>

        {
            total>0 ?
            (
                <div className='mt-8 flex w-full justify-between'>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            )
            :
            (
                <p className='text-4xl text-center mt-5'>Your Cart is Empty</p>
            )
        }
    </div>
  )
}

export default Cart