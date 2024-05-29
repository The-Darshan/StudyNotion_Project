import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profile } from "../apis";

const {GET_INSTRUCTOR_DATA_API , GET_USER_ENROLLED_COURSES_API} = profile

export async function getInstructorData(token){
    const toastId = toast.loading("Loading...");
    let result = [];
    try{    
       console.log("1") 
        const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null,{
            Authorization: `Bearer ${token}`
        })

        console.log("GET_INSTRUCTOR_API_RESPONSE",response);

        result = response?.data?.courses
    }catch(err){
        console.log("GET_INSTRUCTOR_API ERROR",err);
        toast.error("Could not get Instructor Data");
    }
    toast.dismiss(toastId);
    return result;
}

export const getEnrolledCourse = async(token)=>{
const toastID = toast.loading("Loading....");
let result = null;
try{

    const response = await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,{
        Authorization: `Bearer ${token}`
    })

    if(!response.data.success){
        throw new Error(response.data.message);
    }

    console.log("USER_ENROLLED_COURSES RESPONSE : ",response);

    toast.success("FETCHED THE DATA OF ENROLLED COURSES");

    result= response?.data?.data; 

}catch(err){
    toast.error("Error in Fetching Enrolled Courses");
    console.log("Error in Fetching Enrolled Courses",err)
}
toast.dismiss(toastID);
return result;
}