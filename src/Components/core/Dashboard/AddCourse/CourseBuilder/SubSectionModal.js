import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice'
import {RxCross1} from "react-icons/rx"
import { useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../Services/operations/courseDetailsAPI'
import { FaAsterisk } from "react-icons/fa";
import UploadImage from '../UploadImage'
import IconButton from '../../../../common/IconButton'

const SubSectionModal = ({
  modalData,
  setModalData,
  add=false,
  view = false,
  edit= false
}) => {

  const{register , handleSubmit , setValue , formState:{errors},getValues} = useForm()

  const dispatch = useDispatch();
  const [ loading ,  setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(()=>{
    if(view || edit){
      setValue("LectureTitle",modalData.title);
      setValue("LectureDesc",modalData.description);
      setValue("LectureVideo",modalData.vedioURL)
    }
  },[]);

  const isFormUpdated = ()=>{
    const currentValue = getValues();

    console.log("Current Values,nested View component",currentValue);

    if(currentValue.LectureTitle !== modalData.title || currentValue.LectureDesc !==modalData.description || currentValue.LectureVideo !== modalData.vedioURL){
      return true;
    }
    else{
      return false
    }
  }

  const handleEditSubSection = async ()=>{
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId",modalData.sectionID);
    formData.append("subSectionId",modalData._id);

    if(currentValues.LectureTitle !== modalData.title){
      formData.append("title",currentValues.LectureTitle);
    }
    if(currentValues.LectureDesc !== modalData.description){
      formData.append("description",currentValues.LectureDesc);
    }
    if(currentValues.LectureVideo !== modalData.vedioURL){
      formData.append("vedioURL" , currentValues.LectureVideo);
    }
    
    setLoading(true);
    const result = await updateSubSection(formData,token);

    if(result){
      const updatedSubSection = course.courseContent.map((section)=>section._id === modalData.sectionID ? result : section )
      const updatedCourse = {...course,courseContent:updatedSubSection}
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null);
    setLoading(false);
  }

  const onSubmit = async (data) => {
    if(view) return;

    if(edit) {
      if(!isFormUpdated()){
        toast.error("No changes made to the form.")
      }
      else{


        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();

    formData.append("SectionId",modalData)
    formData.append("title",data.LectureTitle);
    formData.append("description",data.LectureDesc);
    formData.append("vedioURL",data.LectureVideo);
    setLoading(true);
    
    const result = await createSubSection(formData,token);

    if(result){
      const updatedSubSection = course.courseContent.map((section)=> section._id === modalData ?result : section )
      const updatedCourse = {...course,courseContent:updatedSubSection}
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false)
  }

  return (
    <div className="fixed z-[1000] top-0 backdrop-blur-sm insert-0 bg-opacity-10 w-full left-0 h-full flex items-center justify-center overflow-auto font-inter">
      <div className='flex justify-center items-start flex-col bg-richblack-800 w-6/12 rounded-lg border-2 border-richblack-600 '>
        <div className='flex bg-richblack-700 justify-between py-4 px-5 rounded-t-lg w-full mb-10'>
          <p className='text-xl font-semibold'>
            {
              view && "Viewing "
            }
            {
              add && "Adding "
            }
            {
              edit && "Editing "
            }
            Lecture
          </p>
          <button onClick={()=>(!loading ? setModalData(null):{})}><RxCross1 size={20}/></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 ml-7'>
            <UploadImage name="LectureVideo" label="Lecture Video" register={register} setValue={setValue} errors={errors} video={true} viewData={view?modalData.vedioURL:null} editData={edit?modalData.vedioURL:null} />
            <div className='mt-5'>
              <label htmlFor='LectureTitle' className='text-sm'>Lecture Title <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
              <input id="LectureTitle" placeholder='Enter Lecture Title' {...register("LectureTitle",{required:true})} 
              
              // className='bg-richblack-700 flex shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter w-full text-semibold text-md outline-none mt-1 '
              />
              {errors.LectureTitle && (
                <span className='text-xs text-pink-300'>Lecture Title is required.</span>
              )}
            </div>
            <div className='mt-2'>
                <label htmlFor='LectureDesc' className='text-sm'>Lecture Description  <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
                <textarea id="LectureDesc" placeholder="Enter lecture description" {...register("LectureDesc",{required:true})} className='w-full min-h-[130px]'/>
                {
                  errors.LectureDesc && (
                    <span className='text-pink-300 text-xs'>Lecture Description is required.</span>
                  )
                }
            </div>
            {
              !view && (
                <div>
                  <IconButton text={edit?"Save Changes" : "Save"}/>
                </div>
              )
            }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal