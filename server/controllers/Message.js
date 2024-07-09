const Messages = require("../models/Message")

exports.sendMessage =  async(req,res) =>{

    try{

        const { Text_message , chatRoom } = req.body;
        const userid = req.user.id;

        if(!Text_message || !chatRoom){
            return res.status(400).json({
                status:false,
                message : "Enter the require fields"
            })
        }

        const sendMessaged = await Messages.create({ chatRoom , Sender:userid , Text_message });

        return res.status(200).json({
            status : true , 
            data:sendMessaged,
            message : "Messaged saved successfully"
        })

    }catch(err){

        return res.status(500).json({
            status : false,
            message:"Error in sending Message to DB",
            error:err
        })


    }

}

exports.getMessages = async(req,res)=>{

    try{

        const { chatRoom } = req.body
        console.log(chatRoom)

        if(!chatRoom){
            return res.status(400).json({
                status : false,
                message : " Please Provide the room id "
            })
        }

        const message = await Messages.find({chatRoom} ).sort({ createdAT: 1 }).populate("Sender").exec()

        return res.status(200).json({
            status : true ,
            data: message,
            message: " Get All The messages. "
        })
 
    }catch(err){
        return res.status(500).json({
            status : false,
            message:"Error in getting the messages",
            error : err
        })
    }

}

exports.deleteMessage  = async(req,res)=>{

    try{

        const { messageId } = req.body;

        if(!messageId){
            return res.status(404).json({
                status : false,
                message : "Please Provide the MessageID"
            })
        }

        const deleteMessage = await Messages.findByIdAndDelete(messageId);

        const updatedMessage = await Messages.find({chatRoom : deleteMessage?.chatRoom} ).sort({ createdAT: 1 }).populate("Sender").exec();

        return res.status(200).json({
            status:true,
            message: "Message Deleted Successfully",
            data:updatedMessage
        })

    }catch(err){
        return res.status(500).json({
            status:false,
            message:"Error in deleting message",
            error:err
        })
    }

}