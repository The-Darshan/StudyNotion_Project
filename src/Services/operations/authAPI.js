import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { authAPI } from "../apis";
import { setUser } from "../../slices/ProfileSlice";

const { RESET_PASSWORD_TOKEN, RESET_PASSWORD_API, SIGNUP_API , SENDOTP_API , LOGIN_API } = authAPI;

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN, {
        email,
      });
      console.log("RESET PASSWORD TOKEN ", response);

      if (!response.data.success) {
        throw new Error(response.data.Message);
      }

      toast.success("RESET EMAIL SENT");
      setEmailSent(true);
    } catch (err) {
      console.log("RESET PASSWORD TOKEN Error");
      toast.error("ERROR IN SENDING MAIL");
      console.log(err);
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(newpass, confirmpass, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      console.log("saxsa")
      const response = await apiConnector("POST", RESET_PASSWORD_API, {
        newpass,
        confirmpass,
        token,
      });
      console.log("B");

      console.log("Response 2 :", response);

      if (!response.data.status) {
        throw new Error(response.data.Message);
      }

      toast.success("PASSWORD UPDATED");
    } catch (err) {
      console.log("ERROR IN UPDATING TH PASSWORD");
      console.log(err.message);
    }
    dispatch(setLoading(false));
  };
}

export function signup(
  firstname,
  lastname,
  email,
  password,
  confirmpassword,
  accounttype,
  otp,
  navigate
) {
  return async (dispatch)=>{
    dispatch(setLoading(true))
    console.log( firstname,
      lastname,
      email,
      password,
      confirmpassword,
      accounttype,
      otp,
      navigate)
  try {
    console.log("A")
    const response = await apiConnector("POST",SIGNUP_API,{
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      accounttype,
      otp,
      navigate}, {
      })

      console.log("B")

      if(!response.data.success){
        throw new Error(response.data.message)
      }
      navigate("/login")

  } catch (err) {
    console.log(err)
    console.log("Error in signing in")
    navigate("/signup")
  }
  dispatch(setLoading(false))
}
}

export function sendOTP(email,navigate){
  return  async(dispatch) => {
    dispatch(setLoading(true))
    try{
      console.log("A")  
      const response = await apiConnector("POST",SENDOTP_API,{email}
      )

      console.log(response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      console.log("Before Navigation");
      navigate("/verifyEmail");
      console.log("After Navigation")
    }catch(err){
      console.log("SENDOTP API ERROR............", err)
    }
    dispatch(setLoading(false))
  }
}

export function login(email,password,navigate){
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try{

      const response = await apiConnector("POST",LOGIN_API,{email,password});

      if(!response.data.success){
        throw new Error(response.data.Message)
      }

      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))

      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))

      toast.success("Login Successful");
      navigate("/dashboard/my-profile")
    }catch(err){
      console.log("Error in Login ",err);
      toast.error("LOGIN FAILED");
    }
    dispatch(setLoading(false))
  }
}

export function logout(navigate){
  return (dispatch)=>{
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logout Successful");
      navigate("/login");
}
}