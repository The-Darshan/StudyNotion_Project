// src/App.js
import React, { useEffect, useRef, useState } from "react";
import socket from "./../utils/socket";
import { deleteMessage, getMessages, sendMessage} from '../Services/operations/chatRoomAPI';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { BsEmojiLaughing } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { timeFormatter } from "../utils/TimeFormatter";
import { RiArrowDropDownLine } from "react-icons/ri";
import useOnClickOutside  from "use-onclickoutside";
import ConfirmationModal from "../Components/common/ConfirmationModal"
import { TbPhotoSearch } from "react-icons/tb";
import EmojiPicker from "emoji-picker-react";
import "../EmojiPicker.css";

const   Doubt = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { token } = useSelector((state)=>state.auth);
  const { user } = useSelector((state)=>state.profile);
  const { room_id } = useParams();
  const ref = useRef(null);
  const [ dropdwon , SetDropDown ] = useState([])
  const [confirmationModal , setConfirmationModal] = useState(null)
  const [ stylemarker , setStyleMarker ] = useState(false)
  const [open , setOpen] = useState(false)

  useOnClickOutside(ref,()=>(SetDropDown([]),setOpen(false)))

  useEffect(() => {
    getMessage();

    socket.connect();

    // Listen for messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
    
  }, [inputMessage]);


  // Sending a message to the server
  const sendmessage = async() => {
    if (inputMessage.trim() !== '') {
      try{
        await sendMessage(room_id,inputMessage, token)
      }catch(err){
        console.log(err)
      }
        socket.emit('message', inputMessage);
        setInputMessage('');
      }
  };

  const getMessage = async()=>{
    try{
      const result = await getMessages(room_id,token);
      if(result){
        setMessages(result)
      }
    }catch(err){
      console.log("Error in getting message")
    }
  }

  const sendEmoji = async(emoji)=>{
    const emojimessage = inputMessage+emoji
    setInputMessage(emojimessage);
  }
  const handleDeleteMessage = async(messageId)=>{
    const result = await deleteMessage(messageId,token);
    setConfirmationModal(null);
    setMessages(result)
  }

  const makeCssAppear = ()=>{
    setStyleMarker(!stylemarker)
  }
 
  return (
    <div className="min-h-screen pb-20 bg-pure-greys-100">
      <h1 className="ml-10 mr-10 text-4xl text-center text-richblack-700">Doubt Group</h1>
      <div className="mt-10 mb-6 ml-10 mr-10 text-xl relative ">
        {messages.map((msg, index) => (
          <div className="text-black" key={index} >
            {
            msg?.Sender?._id !== user?._id &&
          <div className="flex items-start w-fit gap-x-2 mt-3 mb-6">
          <img src={msg?.Sender?.image} className="w-7 h-7 aspect-square rounded-full"/>
          <div className="bg-white rounded-md px-2 ">
          <span className="text-xs">{msg?.Sender?.firstname}</span>
          <div className="text-sm">
          {msg.Text_message || msg}
          <span className="text-[10px] ml-4 align-sub  text-pure-greys-500">{timeFormatter(msg?.createdAt)}</span>
          </div>
          </div>
          </div>
          }
          {
            msg?.Sender?._id == user?._id &&
            <div className="mt-3 w-fit flex ml-[1000px] bg-[#D9FDD3] text-sm px-2 rounded-md pt-1 mb-3 group" >
            {msg.Text_message || msg}
            <span className="text-[10px] ml-4 flex items-center relative align-sub text-pure-greys-500">{timeFormatter(msg?.createdAt)} 
              <RiArrowDropDownLine size={30} className="absolute ml-4 -z-10 cursor-pointer group-hover:z-10 group " onClick={()=>SetDropDown(msg?._id)}/>
                {
                  dropdwon.includes(msg?._id) && 
                  <div className="bg-white py-2 pr-20 px-5 z-10 w-fit absolute mb-16 transition-all duration-200 -ml-28  text-lg cursor-pointer group" ref={ref}>
                    
                    <div className="cursor-pointer"  onClick={() =>
                        setConfirmationModal({
                          text1: "Delete message?",
                          text2: "Selected message will be deleted .",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteMessage(msg?._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }>
                      Delete
                    </div>
                </div>
                }
              </span>
          </div>
          }
          </div>
        ))}
      </div>
      <div className="bg-pure-greys-300 py-2 flex items-center fixed w-full bottom-0" >
        <div ref={ref}>
        <BsEmojiLaughing size={30} className="ml-6 mr-7 cursor-pointer text-pure-greys-100" onClick={()=>setOpen(!open)} />
        </div>
        <FaPlus size={30} className={  stylemarker?"mr-8 relative cursor-pointer text-pure-greys-100 rotate-45 transition-all duration-200 bg-white rounded-full":"mr-8 cursor-pointer transition-all duration-200 text-pure-greys-100"} onClick={makeCssAppear}/>
        {
          stylemarker && 
          <div className="bg-white absolute rounded-md mb-24 px-2 py-1 cursor-pointer  ml-20 transition-all duration-200 ">
            <div className="flex text-black items-center gap-x-2 py-1 px-2" >
              <TbPhotoSearch className="text-blue-200"/>
            Photos
            </div>
          </div>
        }
        
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message"
        className="rounded-lg text-black bg-white outline-none w-10/12 py-1 px-5 text-xl"
      />
      
      <button onClick={sendmessage} className="ml-7 text-pure-greys-100"><IoPlaySkipForwardOutline  size={30}/></button>
      </div>
      <EmojiPicker open={open} className="emoji-picker" onEmojiClick={(emojiObject)=>sendEmoji(emojiObject.emoji)}/>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  );
};

export default Doubt;
