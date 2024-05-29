import React from 'react'
import {RiDeleteBin6Fill} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '../../../../Services/operations/settingAPI';
import { useNavigate } from 'react-router';

const DeleteAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth)
  return (
    <div>
        <div className='bg-pink-900 rounded-lg border border-pink-700 flex py-8 px-12 items-center justify-between mb-10'>
            <div className='rounded-full bg-pink-700 p-3'>
                <RiDeleteBin6Fill fontSize={30} fill={"#EF476F"}/>
            </div>
            <div>
                <h1 className='text-lg mb-3 font-inter font-bold '>Delete Account</h1>
                <p className='text-sm font-medium text-pink-25 font-inter'>Would you like to delete account?</p>
                <p className='text-sm font-medium mb-3 w-7/12 text-pink-25 font-inter'>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
                <button onClick={()=>dispatch(deleteAccount(navigate,token))} className='text-pink-300 text-md font-medium italic'>I want to delete my account</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteAccount