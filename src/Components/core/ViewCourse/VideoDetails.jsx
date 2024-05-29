import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "video-react";
import { useLocation, useNavigate, useParams } from "react-router";
import 'video-react/dist/video-react.css'; 
import IconButton from "../../common/IconButton";
import { markLectureAsComplete } from "../../../Services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();


  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data?._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data?._id === subSectionId);
    console.log("A",noOfSubSections , currentSectionIndex , currentSubSectionIndex , courseSectionData)
    if (
      currentSectionIndex === courseSectionData?.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data?._id === subSectionId);

    if (currentSubSectionIndex != noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex + 1
        ]?._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
      const firstSubSectionId =
        courseSectionData[currentSectionIndex + 1]?.subSection[0]?._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`
      );
    }
  };

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data?._id === subSectionId);

    if (currentSubSectionIndex != 0) {
      // same section prev video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]?._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1]?.subSection?.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1]?.subSection[
          prevSubSectionLength - 1
        ]?._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async() => {
    setLoading(true);

    const result = await markLectureAsComplete({courseId: courseId , subSectionId:subSectionId},token)
    console.log(result);
    if(result){
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
console.log("completed Lectures",completedLectures , courseSectionData);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData?.length) return;
      if (!courseId || !sectionId || !subSectionId)
        navigate("/dashboard/enrolled-courses");
      else {
        const filteredData = courseSectionData.filter(
          (course) => course?._id === sectionId
        );
        console.log(filteredData);
        const filteredVideoData = filteredData?.[0]?.subSection?.filter(
          (data) => data?._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (

  <div className="relative font-inter mx-6 mt-5 mb-10 text-white">
    {
      !videoData ? (
      <div className="text-center text-4xl font-semibold mt-10"
      >
        No Data Found
        </div>
        )
      :
      (
        <Player
        ref={playerRef}
        aspectRatio="16:9"
        playsInline
        onEnded={()=>setVideoEnded(true)}
        src={videoData?.vedioURL}
        >


        {
          videoEnded && (
            <div
            style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
            }}
            >
              {
                !completedLectures.includes(subSectionId) && (
                  <IconButton disabled={loading} onclick={()=>handleLectureCompletion()} text={!loading ? "Mark As Completed" : "Loading..." } customClasses="absolute bg-yellow-50 rounded-md font-semibold z-10 text-xl text-black py-2 px-3 top-[240px] left-[430px]"
                  />
                )
              }

              <IconButton 
              disabled={loading}
              onclick={()=>{
                if(playerRef?.current){
                  playerRef?.current?.seek(0);
                  setVideoEnded(false)
                }
              }}
              customClasses="text-xl top-[290px] left-[470px] text-black py-2 px-3 font-semibold absolute z-10 bg-yellow-50 rounded-md"
              text="Rewatch"
              />

              <div>
                {
                  !isFirstVideo() && (
                    <button disabled={loading} onClick={goToPreviousVideo}
                    className="text-xl bg-richblack-700 rounded-md py-1 px-3 absolute z-10 top-[340px] left-[490px]">
                      Prev
                    </button>
                  )
                }
                {
                  !isLastVideo() && (
                    <button disabled={loading} onClick={goToNextVideo} className="text-xl bg-richblack-700 rounded-md py-1 px-3 absolute z-10 top-[380px] left-[490px]">
                      Next
                    </button>
                  )
                }
              </div>

            </div>
          )
        }

        </Player>
      )
    }
  </div>

  )
};

export default VideoDetails;
