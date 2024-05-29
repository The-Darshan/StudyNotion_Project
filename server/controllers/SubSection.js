const Section = require("../models/SectionModel")
const SubSection = require("../models/SubSectionModel");
const { uploadImageToCloudinary } = require("../utility/imageUploader");
require("dotenv").config()

exports.createSubSection = async(req,res)=>{
    try{
        const {title,description,SectionId} =req.body;
        const vedioURL = req.files.vedioURL

        if(!title || !description  || !vedioURL || !SectionId){
            return res.status(404).json({
                success: false,
                Message: "Please fill the necessary information .",
              });
        }

        const uploadDetails = await uploadImageToCloudinary(vedioURL,process.env.FOLDER_NAME)
        // Duration of vedio is present in the uploadDetails.
        const subSectionDetails = await SubSection.create({
            title,
            description,
            time:uploadDetails.duration,
            vedioURL:uploadDetails.secure_url
        })

        const updatedSection = await Section.findByIdAndUpdate(SectionId ,{$push :{subSection:subSectionDetails._id}},{new:true}).populate("subSection").exec()

        return res.status(200).json({
            success: true,
            Message: "Sub Section created successfully  .",
            data:updatedSection
          });

    }catch(err){
        return res.status(500).json({
            success: false,
            error: err,
            Message: "Error in Creating Sub Section.",
          });
    }
}

// Update subSection and Delete subSection
exports.deleteSubSection = async (req,res)=>{
    try{
        const{subSectionId , sectionId} = req.body
        console.log(subSectionId , sectionId)
        if(!subSectionId){
            return res.status(400).json({
                status:false,
                message:"Enter valid SubSection ID."
            })
        }

       await SubSection.findByIdAndDelete(subSectionId)
        await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});

        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
          )
        return res.status(200).json({
            status:true,
            message:"SubSection deleted.",
            deletedSubSection:updatedSection
        })

    }catch(err){
        return res.status(500).json({
            status:false,
            error:err.message,
            message:"Error in Deleting Sub Section"
        })
    }
}

exports.updateSubSection = async (req , res)=>{
    try{

        const{subSectionId , sectionId , title ,description} = req.body
        if(!subSectionId){
            return res.status(404).json({
                status:false,
                message:'Missing SubSectionId.'
            })
        }
        const oldSubSection = await SubSection.findById(subSectionId)

        if(title){
            oldSubSection.title = title;
        }

        if(description){
            oldSubSection.description = description;
        }

        if(req.files){
            const vedioURL = req.files.subSectionVedio;
            const uploadDetails = await uploadImageToCloudinary(vedioURL,process.env.FOLDER_NAME)
            oldSubSection.vedioURL = uploadDetails.secure_url;
            oldSubSection.time = uploadDetails.duration
        }
        
        const updatedSubSection = await  oldSubSection.save();
        const  updatedSection = await Section.findById(sectionId).populate("subSection").exec()
        return res.status(200).json({
            status:true,
            message:"Updaetd Successfully.",
            data:updatedSection
        })

    }catch(err){
        return res.status(500).json({
            status:false,
            error:err.message,
            message:"Error in updating course. Please try again later."
        })
    }
}