import React, { useState ,useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import IconButton from "../../common/IconButton";
import { RiArrowUpSLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { findChatRoom } from '../../../Services/operations/chatRoomAPI'

const ViewDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoofLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

console.log("courseData : ",courseEntireData, courseSectionData , completedLectures);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData?.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        () => (data) => data.id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const findchatroom = async()=>{
    try{

      let result = await findChatRoom(courseEntireData?.courseDetails?.title + "-Doubt-Room" , courseEntireData?.courseDetails?.createdBy?._id);
      const room_id = result?._id;
      navigate(`/doubt/${room_id}`);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="text-white w-1/5 bg-richblack-800 outline-none">
        {/* for buttons and headings */}
        <div>
          {/* For buttons */}
          <div className="flex justify-between pl-2 pr-5 mt-4">
            <div className="rounded-full p-2  bg-richblack-400 w-fit h-fit text-richblack-700"  onClick={() => navigate("/dashboard/enrolled-courses")}>
              <IoIosArrowBack fontSize={20}/>
            </div>

              <IconButton
                text="Add Review"
                onclick={() => setReviewModal(true)}
                customClasses="text-black bg-yellow-50 py-2 px-3 rounded-md font-semibold cursor-pointer"
              />
          </div>

          {/* for headings or tile */}
          <div className="mt-3 mb-1 pl-3 border-b border-pure-greys-100 pb-2">
            <div className="flex justify-between items-center">
            <p className="text-pure-greys-5 font-semibold text-lg">{courseEntireData?.courseDetails?.title}</p>
            <div className="mr-5 text-black bg-yellow-50 py-2 px-3 rounded-md font-semibold cursor-pointer" onClick={findchatroom}>
              Ask Doubt 
            </div>
            </div>
            <p className="text-pure-greys-100 text-sm">
              {completedLectures?.length} / {totalNoofLectures}
            </p>
          </div>
        </div>

        {/* for section and subSection */}
        <div>
          {
            // Course = Section ;
            courseSectionData?.map((course, indx) => (
              <div key={indx} onClick={() => setActiveStatus(course?._id)}>
                {/* section */}

                <div className="bg-richblack-600 py-3 px-5 flex items-center justify-between">
                  <div>{course?.title}</div>
                 <div className={` {
                    ${activeStatus === course._id ? "rotate-0": "rotate-180" }
                  }`}>
                  <RiArrowUpSLine />
                  </div>
                </div>

                {/* subSection */}

                <div>
                  {activeStatus === course?._id && (
                    <div>
                      {course?.subSection?.map((subSection,indx) => (
                        <div 
                          className={`flex gap-3 p-2 px-5 ${
                            videoBarActive === subSection?._id
                              ? "bg-yellow-200 text-richblack-900"
                              : "bg-richblack-900 text-white"
                          }`}
                          key={indx}
                          onClick={()=>{
                            navigate(`/view-course/${courseEntireData?.courseDetails?._id}/section/${course?._id}/sub-section/${subSection?._id}`)
                            setVideoBarActive(subSection?._id)
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={completedLectures?.includes(
                              subSection?._id
                            )}
                            readOnly
                          />
                          <span>{subSection.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default ViewDetailsSidebar;
