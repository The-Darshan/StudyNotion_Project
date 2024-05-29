import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editCourseDetails, getAllCategories } from "../../../../Services/operations/courseDetailsAPI";
import { FaAsterisk } from "react-icons/fa";
import { DevTool } from "@hookform/devtools";
import Tag from "./Tag";
import UploadImage from "./UploadImage";
import RequirementField from "./RequirementField";
import { setCourse, setEditCourse, setSteps } from "../../../../slices/courseSlice";
import IconButton from "../../../common/IconButton";
import toast from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";


const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const {token} = useSelector((state)=>state.auth)

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await getAllCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    if (editCourse) {
      console.log("Tags",course.Instruction);
      setValue("courseTitle", course.title);
      setValue("courseShortDesc", course.description);
      setValue("coursePrice",course.price);
      setValue("courseTags",course.tag);
      setValue("courseBenefits", course.whatULearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.Instruction);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle != course.title ||
      currentValues.courseShortDesc != course.description ||
      currentValues.coursePrice != course.price ||
      currentValues.courseTags.toString() != course.tag.toString() ||
      currentValues.courseBenefits != course.whatULearn ||
      currentValues.courseCategory._id != course.category._id ||
      currentValues.courseImage != course.thumbnail ||
      currentValues.courseRequirements.toString() !=
        course.Instruction.toString()
    ) {
      return true;
    } else return false;
  };
  // handles next button Click
  const onSubmit = async (data) => {
    if (editCourse) {
      if(isFormUpdated()){
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseTitle != course.title) {
          formData.append("title", data.courseTitle);
        }
        if (currentValues.courseShortDesc != course.description) {
          formData.append("description", data.courseShortDesc);
        }
        if (currentValues.coursePrice != course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseBenefits != course.whatULearn) {
          formData.append("whatULearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id != course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseRequirements.toString() != course.Instruction.toString()) {
          formData.append("Instruction",JSON.stringify( data.courseRequirements));
        }
        if (currentValues.courseImage!= course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }
        if (currentValues.courseTags.toString() != course.tag.toString()) {
          formData.append("tag",JSON.stringify( data.courseTags));
        }
  
        setLoading(true)
        const result = await editCourseDetails(formData, token);
        //According to me we use dispatch when we dont get any return  from the server and we want to update our state and await is used to get the result from the server.
        if(result){
          dispatch(setSteps(2));
          dispatch(setCourse(result));
        }
        setLoading(false)
      }
      else{
        toast.error("No changes made so far")
      }
      return
    }
    // create  a new course
    
    const formData = new FormData();
    formData.append("title", data.courseTitle);
    formData.append("description", data.courseShortDesc);
    formData.append("price",data.coursePrice);
    formData.append("whatULearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instruction",JSON.stringify( data.courseRequirements));
    formData.append("thumbnail", data.courseImage);
    formData.append("tag",JSON.stringify( data.courseTags));
    
    setLoading(true);
    const result = await addCourseDetails(formData,token);
    if(result){
      dispatch(setSteps(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
    
  };

  return (
    <div className="text-white border rounded-lg w-[600px] border-richblack-700 font-inter">
      <form
        onSubmit={handleSubmit(onSubmit)} //by doing this now the formData can be accessed by onSubmit function
        className="rounded-md border-richblack-700 p-6 space-y-8 bg-richblack-800 text-white"
      >
        <div>
          <label className="text-sm" htmlFor="courseTitle">Course Title <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className='bg-richblack-700 flex shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-2 w-full text-semibold text-md outline-none'
          />
          {errors.courseTitle && <span className="text-pink-200 text-sm">Course Title is Required <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></span>}
        </div>

        <div>
          <label className="text-sm" htmlFor="courseShortDesc">Course Short Description <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
          <textarea
            id="courseShortDesc"
            rows={5}
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
            className='bg-richblack-700 flex shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-2 w-full text-semibold text-md outline-none'
          />
          {errors.courseShortDesc && (
            <span className="text-pink-200 text-sm">Course Description is Required <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></span>
          )}
        </div>

        <div className="relative">
          <label className="text-sm" htmlFor="coursePrice">Course Price <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className='bg-richblack-700 flex shadow  pl-12 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-2 w-full text-semibold text-md outline-none'
          />
          <HiOutlineCurrencyRupee className="text-richblack-300 ml-3 absolute top-1/2" size={24}/>
          {errors.coursePrice && <span className="text-pink-200 text-sm">Course Price is Required <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></span>}
        </div>

        <div>
          <label className="text-sm" htmlFor="courseCategory">Course Category <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
          <select
            id="courseCategory"
            defaultValue=""
            {...register("courseCategory", { required: true })}
            className=" rounded-lg shadow bg-richblack-700 outline-none w-full pl-2 py-3 shadow-[#999DAA]  font-inter"
          >
            <option value="" disabled>
              Choose a Category 
              </option>
            {!loading &&
              courseCategories.map((category) => (
                <option  key={category._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && <span className="text-pink-200 text-sm">Course Category is Required <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></span>}
        </div>

        <Tag
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
        />

        <UploadImage
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          errors={errors}
          setValue={setValue}
          editData={editCourse?course?.thumbnail:null}
        />
        
        {/* Khud Banana h */}

        <div>
          <label className="text-sm" htmlFor="courseBenefits">Benifits of the course <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
          <textarea
            id="courseBenefits"
            rows={5}
            placeholder="Enter Benefits of the course"
            {...register("courseBenefits", {
              required: { value: true, message: "Benefits Required" },
            })}
            className='bg-richblack-700 flex shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-2 w-full text-semibold text-md outline-none'
          />
        </div>
        {errors.courseBenefits && (
          <span className="text-pink-200 text-sm">Benefits of the courses are required <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></span>
        )}

        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        <div className="flex justify-end gap-x-5">
          {editCourse && (
            <button
              onClick={() => dispatch(setSteps(2))}
              className="flex items-center gap-x-2 bg-richblack-300 rounded-lg text-black font-semibold px-2"
            >
              Continue without Saving
            </button>
          )}

          <IconButton text={!editCourse ? "Next >" : "Save Changes"} customClasses={"flex items-center  bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 "}/>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default CourseInformationForm;
