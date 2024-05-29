import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { deleteSection, deleteSubSection } from "../../../../../Services/operations/courseDetailsAPI";
import {  setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({ handleChangeEditSectionName }) => {
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  console.log(course)

  const handleDeleteSection = async (sectionId) => {
    
    const result = await deleteSection({sectionId,courseID:course._id },token)

    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  };

  const handleDeleteSubSection = async(subSectionId, sectionId) => {
    const result = await deleteSubSection({subSectionId,sectionId},token)

    if(result){
      
      const updatedCourseContent = course.courseContent.map((section)=> section._id === sectionId ? result : section);

      const updatedCourse = {...course,courseContent:updatedCourseContent}

      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="font-inter relative">
      <div className="bg-richblack-700 p-6 px-8 rounded-lg">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open className="mb-5">
            <summary className="flex items-center justify-between gap-x-3 border-b-2 border-richblack-400 pb-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-classname-100 " size={24}/>
                <p className="text-richblack-100 font-semibold">{section.title}</p>
              </div>

              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(section._id, section.title)
                  }
                >
                  <MdEdit className="text-richblack-100" size={20} />
                </button>

                <buton
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2:
                        "All the lectures in this section will be deleted.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-richblack-100" size={20} />
                </buton>
                <span className="text-richblack-100 w-2 h-5">|</span>
                <BiDownArrow className="text-lg text-richblack-100" size={20} />
              </div>
            </summary>

            <div>
              {section?.subSection?.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center mt-5 ml-7 justify-between gap-x-3 border-b-2 pb-2 border-richblack-300 mr-7"
                >
                  <div className="flex items-center gap-x-3">
                    <RxDropdownMenu size={24} className="text-richblack-100"/>
                    <p className="text-richblack-100 font-semibold">{data.title}</p>
                  </div>

                  <div onClick={(e)=>e.stopPropagation()
                  // Upar wala div pa jo viewsubsection lagaya h wo nicha wala pa bhi chal ja rha h kyuki wo parent element h to wo hamesha phele chal rha h to uska propagation rokna ka liye humne stopPropagation  lagaya h .
                  } className="flex items-center gap-x-3">
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionID: section._id })
                      }
                    >
                      <MdEdit className="text-richblack-100" size={20} />
                    </button>

                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "Selected Lecture will be deleted .",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-richblack-100" size={20}/>
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-4 items-center flex  gap-x-2 text-yellow-50 font-bold ml-5"
              >
                <AiOutlinePlus fontSize={20}/>
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {
        confirmationModal ? ( 
          <ConfirmationModal modalData={confirmationModal}/>
        )
      :(<div></div>)}
    </div>
  );
};

export default NestedView;
