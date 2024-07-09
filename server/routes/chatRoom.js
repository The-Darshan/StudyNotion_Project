const express = require("express");
const router = express.Router();

const { createRoom , findChatRoom } = require("../controllers/ChatRoom")
const {auth,isAdmin,isInstructor,isEligible, isStudent} = require("../middleware/authMiddleware")
const { sendMessage , getMessages , deleteMessage } = require ("../controllers/Message")


router.post('/createChatRoom', auth , isInstructor ,createRoom);
router.post('/sendMessage',auth,sendMessage);
router.post('/findChatRoom',findChatRoom);
router.delete('/deleteMessage',auth,deleteMessage)
router.post("/getUserSpecificMessages",auth,getMessages)

module.exports = router