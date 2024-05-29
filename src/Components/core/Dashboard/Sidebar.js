import React, { useState } from 'react'
import { sidebarLinks } from '../../../Data/dashboard-links';
import Sidebarlink from './Sidebarlink';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../common/ConfirmationModal';
import { VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router';
import { logout } from '../../../Services/operations/authAPI';
const Sidebar = () => {

    const {user , loading : profileLoading} = useSelector((state)=>state.profile);
    const{loading:authLoading} = useSelector((state)=>state.auth);
    const [confirmationModal,setconfirmationModal] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if(authLoading || profileLoading){
        return(
            <div>Loading....</div>
        )
    }

  return (
    <div className='text-white  top-[56px]'>
        
        <div className='flex min-w-[200px] flex-col border-r-[1px] py-10 border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 '> 
            <div className='flex flex-col'>
              {
                sidebarLinks.map((ele)=>{
                  if(ele.type && user?.accounttype!==ele.type)return null;
                    return  (
                      <Sidebarlink key={ele.id} link={ele} iconName={ele.icon}/>
                    )
                })
              }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'>
            </div>

                <div className='flex flex-col gap-2'>
                  <Sidebarlink 
                  link={{name:"Settings",path:"/dashboard/settings"}}
                  iconName="VscSettingsGear"/>

                    <button
                      onClick={()=>{ setconfirmationModal({
                        text1:"Are You Sure ?",
                        text2:"You will be logged our of your Account",
                        btn1Text:"Log out",
                        btn2Text:"Cancel",
                        btn1Handler:()=>dispatch(logout(navigate)), 
                        btn2Handler:()=>setconfirmationModal(null),
                      })}}
                      className='text-sm font-medium text-richblack-300'
                      >

                      <div className='flex items-center gap-x-2 px-8' >
                      <VscSignOut className="text-lg"/>
                      <span>Logout</span>
                      </div>

                    </button>

                </div>

        </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar