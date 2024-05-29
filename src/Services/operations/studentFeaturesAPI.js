import { apiConnector } from "../apiconnector";
import { studentPayment } from "../apis";
import toast from "react-hot-toast";
import rzpLogo from "../../assets/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentPayment

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script")
        script.src = src;
        
        script.onload=()=>{
            resolve(true);
        }
        // onLoad is used to check whether script is loaded or not and if loaded then resolve will be set as true.
        script.onerror=()=>{
            resolve(false);
        }

        // If the promised is resolved as true then only script will be appended else not.
        
        document.body.appendChild(script)
    })
}

export async function buyCourse (token,dispatch,navigate,courses,userDetails){
    const toastID = toast.loading("Loading...");
    try{
        // Load the script 
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }
        // initiate the order

        const orderResponse = await apiConnector("POST" , COURSE_PAYMENT_API , {courses},
        { Authorization: `Bearer ${token}` })
        
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        console.log("Order Response",orderResponse);
        // options
        const RAZORPAY_KEY = "rzp_test_265iURK4iojh3A";
        
        const options = {
            key : RAZORPAY_KEY,
            amount: `${orderResponse.data.message.amount}`,
            currency: orderResponse.data.message.currency,
            order_id: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email : userDetails.email
            },
            handler: function(response){
                console.log("Response : ", response);
                // Verify payment
                verifyPayment({...response,courses},token , navigate,dispatch)
                // send successful mail
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount ,token)
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on( 'payment.failed' , (response)=>{
            toast.error("OOPS , payment failed");
            console.log(response.error)
        })

    }catch(err){
        console.log("PAYMENT API ERROR ........",err);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastID)
}

async function sendPaymentSuccessEmail(response,amount , token){
    try{

         await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId : response.razorpay_order_id , 
            paymentId : response.razorpay_payment_id,
            amount
        },
        { Authorization: `Bearer ${token}` })

    }catch(err){
        console.log("PAYMENT SUCCESS EMAIL ERROR......",err)
    }
}

// verify payment
async function verifyPayment(bodyData, token, navigate , dispatch){
    const toastId = toast.loading('Verifying Payment...');
    dispatch(setPaymentLoading(true));
    try{

       const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,
        { Authorization: `Bearer ${token}` })

        if(!response.data.success) throw new Error(response.data.message);

        console.log("VERIFY PAYMENT RESPONSE : ",response);

        toast.success("Payment Successful , you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        // dispatch(resetCart());

    }catch(err){
        console.log("PAYMENT VERIFY ERROR :",err);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false))
}