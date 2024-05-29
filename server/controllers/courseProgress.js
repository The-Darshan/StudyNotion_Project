// import course from "../models/CourseModel";
const CourseProgress = require("../models/CourseProgressModel");
const SubSection = require('../models/SubSectionModel');

exports.updateCourseProgress = async(req,res)=>{
        const {courseId , subSectionId} = req.body;
        const userId = req.user.id;
        console.log("!")
        try{

            const subSection = await SubSection.findById(subSectionId);

            if(!subSection){
                return res.status(404).json({
                    success : false,
                    message:"No Sub Section is present with the given id."
                })
            }
            console.log("!")
            // check for old entry
            let courseProgress = await CourseProgress.findOne({
                courseID:courseId,
                userId:userId,
            })
            console.log("3");
            if(!courseProgress){
                return res.status(404).json({
                    success:false,
                    message:"Course Progress does not exist."
                }
            )}else{
                // Check for re-completing video/subSection . 
                if(courseProgress?.completedVedio?.includes(subSectionId)){
                    return res.status(400).json({
                        error:" Subsection already completed",
                    });
                }
                // push into completed video.
                courseProgress?.completedVedio?.push(subSectionId);
            }
            await courseProgress.save();

            return res.status(200).json({
                success:true,
                message:'Course Progress Updated Successfully.'
            })

        }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error in updating Course Progress."
        })
    }
}