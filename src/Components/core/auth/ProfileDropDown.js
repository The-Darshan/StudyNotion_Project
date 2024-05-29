import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiArrowSortedDown } from "react-icons/ti";
import { VscSignOut } from "react-icons/vsc";
import { VscDashboard } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { logout } from "../../../Services/operations/authAPI";
import useOnClickOutside  from "use-onclickoutside"
import { Link } from "react-router-dom";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useOnClickOutside(ref , ()=>setOpen(false))

  function Logout(){
    dispatch(logout(navigate)) 
    setOpen(false)
  }

  return (
    <div className="relative cursor-pointer">
      <div className="flex justify-center items-center ">
        <div
          className="flex justify-center items-center"
          onClick={() => setOpen(true)}
        >
          <img
            src={user?.image}
            alt={`profile-${user?.firstname}`}
            className="aspect-square w-[30px] rounded-full object-cover"
          />
          <TiArrowSortedDown className="text-richblack-200" size={24} />
        </div>

        {open && (
          <div
            className="w-28 h-20 bg-richblack-800 absolute top-9 rounded-md    border border-richblack-700 right-1 text-richblack-100 text-sm  hover:cursor-pointer mx-3"
            ref={ref}
          >
            <Link to="/dashboard/my-profile"
              className="relative z-10  flex items-center py-[10px] gap-x-1 hover:bg-richblack-700 hover:rounded-t-lg hover:text-richblack-5"
              onClick={() =>  setOpen(false)}
            >
              <div className="flex gap-x-1 ml-2">
                <VscDashboard className="text-lg" />
                Dashboard
              </div>
            </Link>

            <div
              className="relative z-10 border-t py-2 border-richblack-700  hover:bg-richblack-700 hover:rounded-b-lg items-center hover:text-richblack-5"
              onClick={Logout}
            >
              <div className="flex gap-x-1 ml-2">
                <VscSignOut className="text-lg" />
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;
