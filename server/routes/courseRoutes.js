const Express = require("express")
const router = Express.Router()

const {categoryCreation , showAllCategory , categoryPageDetails} = require('../controllers/Category');
const { createCourse , getAllCourses , getCourseDetails , deleteCourse , getInstructorCourse , editCourse , getFullCourseDetails }  = require("../controllers/course");
const {auth,isAdmin,isInstructor,isEligible, isStudent} = require("../middleware/authMiddleware")
const {createSection , updateSection , deleteSection} = require("../controllers/Section")
const{createSubSection , deleteSubSection , updateSubSection} = require("../controllers/SubSection")
const { createRating , getAllRatingsAndReviews , getAverageRating } = require("../controllers/RatingandReview")
const {updateCourseProgress} = require("../controllers/courseProgress")

router.post("/categoryCreation",auth,isAdmin,categoryCreation);
router.get("/showAllCategory",showAllCategory);
router.post("/categoryPageDetails",categoryPageDetails);

router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/getAllCourses",getAllCourses);
router.post("/getCourseDetails",getCourseDetails)
router.post("/getFullCourseDetails",auth,getFullCourseDetails)
router.post("/deleteCourse",auth,isEligible,deleteCourse)
router.get("/getInstructorCourse",auth,isEligible,getInstructorCourse)
router.post("/editCourse",auth,isInstructor,editCourse)
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)

router.post("/createSection",auth,isInstructor,createSection)
router.post("/updateSection",auth,isInstructor,updateSection)
router.delete("/deleteSection",auth,isEligible,deleteSection)

router.post("/createSubSection",auth,isInstructor,createSubSection)
router.delete("/deleteSubSection",auth,isEligible,deleteSubSection)
router.post("/updateSubSection",auth,isInstructor,updateSubSection)

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRatingsAndReviews",getAllRatingsAndReviews);

module.exports= router