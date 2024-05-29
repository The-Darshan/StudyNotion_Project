const Section = require("../models/SectionModel");
const SubSection = require("../models/SubSectionModel")
const Course = require("../models/CourseModel");

exports.createSection = async (req, res) => {
  try {
    const { title, courseID } = req.body;

    if (!title || !courseID) {
      return res.json({
        success: false,
        Message: "Please Enter title",
      });
    }

    const newSection = await Section.create({ title });

    const updatedCourse = await Course.findByIdAndUpdate(
      {_id:courseID},
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          model: "SubSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      data: updatedCourse,
      Message: "Section has successfully created and course Updated",
    });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      Message: "Error in creating Section in the given Course.",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { newTitle, sectionId , courseID } = req.body;

    if (!newTitle || !sectionId) {
      return res.status(404).json({
        success: false,
        Message: "Please give the necessary Details.",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { title: newTitle },
      { new: true }
    );
    
    const course = await Course.findById(courseID).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      },
    }
    ).exec()
    return res.status(200).json({
      success: true,
      Message: "Section updated Successfully.",
      data :course
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      Message: "Error in Updating Section.",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId , courseID} = req.body;

    const section = await Section.findById(sectionId)

    if (!sectionId) {
      return res.status(404).json({
        success: false,
        Message: "Please give a valid section detail.",
      });
    }

    await SubSection.deleteMany({_id:{$in :section.subSection}})

    await Section.findByIdAndDelete(sectionId);

    await Course.findByIdAndUpdate(courseID,{$pull : {courseContent:sectionId}},{new:true})

    const course = await Course.findById(courseID).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

    return res.status(200).json({
      success: true,
      Message: "Section deleted Successfully.",
      data : course
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      Message: "Error in Deleting Section.",
    });
  }
};
