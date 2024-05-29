import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setting } from "../apis";
import { logout } from "./authAPI";
import { setUser } from "../../slices/ProfileSlice";

const {UPDATE_PP_API , UPDATE_PROFILE_API , DELETE_ACCOUNT_API , CHANGE_PASSWORD_API , GET_USER_DETAILS_API} = setting 

export const updateProfile = async(data,token)=>{
   const toastID = toast.loading("Loading..");
   let result = null; 
    // dispatch(setLo)
        try{

        const response = await apiConnector("POST",UPDATE_PROFILE_API,data, {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success) throw new Error(response.data.Message);

        console.log("RESPONSE OF UPDATE PROFILE : ",response);

        toast.success("PROFILE UPDATED SUCCESSFULLY");
        result = response.data.data

        }catch(err){
            console.log("Error in updating profile : ", err);
            toast.error("Error in updating  Profile");
        }
        toast.dismiss(toastID)
        return result
    }


export function deleteAccount (navigate,token){
    return async(dispatch)=>{
        const toastID = toast.loading("Loading..")
        try{
            const response = await apiConnector("DELETE",DELETE_ACCOUNT_API,null, {
                Authorization: `Bearer ${token}`
            }
            )

            if(!response.data.success){
                throw new Error(response.data.Message)
            }

            toast.success("Profile Deleted Successfully");
            dispatch(logout(navigate))

        }catch(err){
            console.log("Error in Deleting Account :" , err);
            toast.error("Could Not Delete Account");
        }
        toast.dismiss(toastID)
    }
}

export function changePassword(password,newpass , token){
    return async(dispatch)=>{
        const toastID = toast.loading("Loading....")
        try{
            const response = await apiConnector("POST",CHANGE_PASSWORD_API,{password,newpass},{
                Authorization: `Bearer ${token}`
            }
            )
            console.log("A")
            console.log("CHANGE PASSWORD RESPONSE : ",response)

            if(!response.data.success) throw new Error (response.data.Message)

            toast.success("Password Changed Successfully!")

        }catch(err){
            console.log("ERROR IN CHANGING PASSWORD : ",err);
            toast.error("Password is not changed")
        }
        toast.dismiss(toastID)
    }
}

export const getUserDetails = async(token)=>{
        let result = null;
        const toastID = toast.loading("Loading...")
    try{

        const response = await apiConnector("GET",GET_USER_DETAILS_API,null,{
            Authorization: `Bearer ${token}`
        })

        console.log("RESPONSE OF USER DETAILS : ",response);

        if(!response.data.success) throw new Error(response.data.Message);

        toast.success("DETAILS FETCHED SUCCESSFULLY  ")
        result = response.data.userDetails

    }catch(err){
        console.log("ERROR IN FETCHING USER DETAILS : ",err.message)
        toast.error("ERROR IN FETCHING USER DETAILS  ")
    }
    toast.dismiss(toastID)
    return result
}

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector(
          "POST",
          UPDATE_PP_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.status) {
          throw new Error(response.data.message)
        }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.data))
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
  }