const express = require("express")
const router = express.Router()

const  {updatePofile , deleteAccount , getAllUsersDetails , updateProfilePicture , instructorDashboard ,getEnrolledCourses} = require("../controllers/Profile")
const { auth, isInstructor, isStudent } = require("../middleware/authMiddleware")

router.post("/updatePofile",auth, updatePofile);
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/getAllUsersDetails",auth,getAllUsersDetails);
router.post("/updateProfilePicture",auth,updateProfilePicture);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);
router.get("/getEnrolledCourses",auth,isStudent,getEnrolledCourses);

module.exports=router