import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "../../../../common/IconButton";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import {
  setCourse,
  setEditCourse,
  setSteps,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../Services/operations/courseDetailsAPI";
import NestedView from "./NestedView";
import { FaAsterisk } from "react-icons/fa";

const CourseBuilder = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goToNext = () => {
    console.log("1")
    if (course.courseContent?.length == 0) {
      toast.error("Please add atleast one Section .");
      return;
    }
    if (
      course.courseContent?.some((section) => section.subSection?.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section.");
      return;
    }
    console.log("2")
    dispatch(setSteps(3));
  };

  const goBack = () => {
    dispatch(setSteps(1));
    dispatch(setEditCourse(true));
  };

  const submitHandeler = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          newTitle: data.sectionName,
          sectionId: editSectionName,
          courseID: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          title: data.sectionName,
          courseID: course._id,
        },
        token
      );
    }
    
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", " ");
    }
    setLoading(false);
  };
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="font-inter bg-richblack-800 h-fit rounded-lg border border-richblack-700 p-6">
      <p className="text-2xl font-semibold mb-7">Course Builder</p>

      <form onSubmit={handleSubmit(submitHandeler)} className="text-white">
        <div>
          <label htmlFor="sectionName" className="text-sm">Section Name <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
          <input
            id="sectionName"
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className='bg-richblack-700 flex shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter w-full text-semibold text-md outline-none mt-2 mb-2'
          />
          {errors.sectionName && <span className="text-xs text-pink-500 ">Section Name is Required .</span>}
        </div>

        <div className="mt-5 flex w-full items-end mb-7">
          <div className = " border border-yellow-50 felx items-center flex rounded-md w-fit gap-x-4 px-2 py-2">
          <IconButton
            type="submit"
            text={editSectionName ? "Edit Section Name " : " Create Section"}
            outline={true}
            customClasses={"text-yellow-50 font-semibold text-md outline-none"}
          />
          <MdAddCircleOutline className="text-yellow-50" size={20}/>
          </div>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline ml-6 outline-none"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3 mt-10">
        <button
          onClick={goBack}
          className="rounded-md cursor-pointer flex items-center bg-richblack-300 text-black py-1 px-5 font-medium text-lg outline-none"
        >
          Back
        </button>
        <div className="text-black rounded-md flex items-center bg-yellow-50 py-2 px-5 gap-x-2 text-lg cursor-pointer">
        <IconButton text="Next" onclick={goToNext}/> <BiRightArrow />
        </div>
      </div>
    </div>
  );
};

export default CourseBuilder;
