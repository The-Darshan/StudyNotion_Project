const Category = require("../models/CategoriesModel");
const course = require("../models/CourseModel");

exports.categoryCreation = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(403).json({
        success: false,
        message: "Either name or description is missing in tag .",
      });
    }

    const existTag = await Category.findOne({ name });

    if (existTag) {
      res.status(403).json({
        success: false,
        message: "Already tag existed ",
      });
    }

    const tagDetails = await Category.create({ name, description });
    console.log(tagDetails);

    return res.status(200).json({
      success: true,
      data: tagDetails,
      message: "Tag created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      Message: "Error in creating Tag .",
    });
  }
};

exports.showAllCategory = async (req, res) => {
  // Check this function for a tag not having name field
  try {
    const allTags = await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      Tags: allTags,
      Message: "All tags are reterived .",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      Message: "Error in getting all tags .",
    });
  }
};

// Category Page Details
exports.categoryPageDetails = async (req, res) => {
  try {
    // get Categoryid
    const { categoryID } = req.body;
    console.log("categoryId :", categoryID);
    //get course for specified categoryID
    const selectedCategory = await Category.findById(categoryID)
      .populate({
        path: "course",
        populate: {
          path: "createdBy",
        },
      })
      .exec();

    // validation
    if (!selectedCategory) {
      return res.status(400).json({
        success: false,
        message:
          "No cousre for this Category right now. Please check back later.",
      });
    }

    const publishedCourse = selectedCategory.course.filter(
      (cours) => cours.status === "Published"
    );

    // get courses for different categories
    const allCategories = await Category.find({ _id: { $ne: categoryID } });

    const differentCategory = await Category.findOne(
      allCategories[Math.floor(Math.random() * allCategories?.length)]._id
    )
      .populate({
        path: "course",
        populate: [{ path: "createdBy" }, { path: "ratingAndReview" }],
        match: { status: "Published" },
      })
      .exec();

      

    // get top selling courses
    const topselling = await course.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "result"
        }
      },
      {
        $unwind: "$studentsEnrolled",
      },
      {
        $group: {
          _id: "$_id",
          "_result" : { "$mergeObjects" : "$$ROOT" },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 4,
      },
    ]);
  
    // const top = topselling.populate("createdBy").exec();

    return res.status(200).json({
      success: true,
      data: {
        differentCategory,
        selectedCategory,
        topselling,
        publishedCourse,
      },
      message: "samay ka khel dekho.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
