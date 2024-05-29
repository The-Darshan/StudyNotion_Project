const express =  require("express")
const router = express.Router()

const {sendOtp , SignUp , Login ,changePassword} = require("../controllers/Auth")
const { resetPasswordToken , resetPassword} = require("../controllers/ResetPassword")
const {auth} = require("../middleware/authMiddleware")

router.post("/sendOtp", sendOtp) 
router.post("/SignUp",SignUp)
router.post("/Login",Login)
router.post("/changePassword",auth,changePassword);

router.post("/resetPasswordToken",resetPasswordToken)
router.post('/resetPassword',resetPassword)

module.exports =router