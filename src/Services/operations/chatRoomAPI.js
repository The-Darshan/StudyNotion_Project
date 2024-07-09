import toast from 'react-hot-toast';
import  {apiConnector} from '../apiconnector'
import { chatRoom } from "../apis"

const {
    SEND_MESSAGE_API , FIND_CHAT_ROOM_API , GET_MESSAGES_API , DELETE_MESSAGE_API
} = chatRoom

export const sendMessage =  async(chatRoom ,Text_message ,  token)=>{
    const toastID = toast.loading("SENDING MESSAGE");
    try{

        const response = await apiConnector("POST",SEND_MESSAGE_API,{chatRoom , Text_message}, {
            Authorization: `Bearer ${token}`,
          })
          console.log("SEND MESSAGE API RESPONSE >>>>>>>>", response);
          if (!response.data.status) throw new Error(response.data.message);
          toast.success("Message Sended");
    }
    catch(err){
    console.log("Unable to send message : ", err);
    toast.error("Unable to send Message");
    }
    toast.dismiss(toastID)
}

export const findChatRoom =  async(name , Admin)=>{
    const toastID = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST",FIND_CHAT_ROOM_API,{name,Admin})
          console.log("FIND CHAT ROOM API RESPONSE >>>>>>>>", response);
          if (!response.data.status) throw new Error(response.data.message);
          result = response?.data?.data
    }
    catch(err){
    console.log("Unable to create Course : ", err);
    toast.error("Unable to send Message");
    }
    toast.dismiss(toastID)
    return result
}

export const getMessages =  async(chatRoom , token)=>{
    let result = null;
    try{
        const response = await apiConnector("POST",GET_MESSAGES_API,{chatRoom}, {
            Authorization: `Bearer ${token}`,
          })

          console.log("GET MESSAGE API RESPONSE >>>>>>>>", response);

          if (!response.data.status) throw new Error(response.data.message);
          result = response?.data?.data
    }
    catch(err){
    console.log("Unable to get message : ", err);
    toast.error("Unable to get Message");
    }
    return result
}

export const deleteMessage = async(messageId,token)=>{
    let result = null;
    try{
        const response = await apiConnector("DELETE",DELETE_MESSAGE_API,{messageId}, {
            Authorization: `Bearer ${token}`,
          })

          console.log("DELETE MESSAGE API RESPONSE >>>>>>>>", response);

          if (!response.data.status) throw new Error(response.data.message);
          toast.success("Message Deleted");
          result = response?.data?.data
    }
    catch(err){
    console.log("Unable to delete Message : ", err);
    toast.error("Unable to delete Message");
    }
    return result
}