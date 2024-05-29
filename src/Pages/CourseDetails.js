import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyCourse } from "../Services/operations/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import { getFullDetailsofCourse } from "../Services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiInfoCircle } from "react-icons/bi";
import { dateFormatter } from "../utils/DateFormatter";
import { timeFormatter } from "../utils/TimeFormatter";
import { BsGlobe2 } from "react-icons/bs";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ConfirmationModal from "../Components/common/ConfirmationModal"
import  {ACCOUNT_TYPE} from "../utils/constant";
import { addToCart } from "../slices/cartSlice";
import Footer from "../Components/common/Footer";
import ReviewSlider from "../Components/common/ReviewSlider";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";

const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setloading] = useState(false);
  const [isActive , setIsActive] = useState(Array(0));
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [duration , setDuration] = useState("")
  let date, time  ,  totalNoOfSubSections = 0;

  const fetchCourseDetails = async () => {
    setloading(true);
    try {
      let res = await getFullDetailsofCourse(courseId);
      setDuration(res.totalDuration);
      res = res.courseDetails
      setCourse(res);
    } catch (err) {
      toast.error("ERROR IN FETCHING COURSE DETAILS...");
      console.log("Can't fetch course details", err);
    }
    setloading(false);
  };

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, dispatch, navigate, [courseId], user);
      return;
    }
    setConfirmationModal({
        text1:"You are not Logged in",
        text2:"Please Login to purchase the course",
        btn1Text:"Login",
        btn2Text:"Cancel",
        btn1Handler:()=>navigate("/login"),
        btn2Handler:()=>setConfirmationModal(null),
    })
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
      console.log(err);
    }
  };

  if(course.length !== 0) {
    date = dateFormatter(course.createdAt);
    time = timeFormatter(course.createdAt);
    course?.courseContent?.forEach((ele) => {
      totalNoOfSubSections+= ele?.subSection?.length;
   });
  }

  const handleAddToCart = ()=>{
    if(user && user?.accounttype===ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("You are an Instructor , you can't buy a course");
        return;
    }
    if(token){
        dispatch(addToCart(course));
        return;
    }
    setConfirmationModal({
        text1:"You are not logged in",
        text2:"Please login to add to cart",
        btn1Text:"Login",
        btn2Text:"Cancel",
        btn1Handler:()=>navigate("/login"),
        btn2Handler:()=>setConfirmationModal(null),
    })
  }

  const handleActive = (id)=>{
    setIsActive(
        !isActive?.includes(id) ? isActive.concat(id) : isActive.filter((e)=>e!=id)
    )
  }

  console.log(isActive)

  return (
    <div className="flex items-center text-white font-inter">
      {loading ? (
        <div className="spinner flex justify-center items-center"></div>
      ) : (
        <div className="w-full h-fit">
          <div className="bg-richblack-800 w-full pl-16 py-32 relative flex flex-col">
            <div>
              <h1 className="text-4xl font-bold mb-3">{course?.title}</h1>
              <p className="mb-3 text-richblack-200">{course?.description}</p>

              <div className="flex gap-x-2 items-center mb-3">
              <ReactStars
                count={5}
                value={course?.ratingAndReview?.length}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                filledIcon={<FaStar />}
              /> 
              <p className="text-yellow-50">({course?.ratingAndReview?.length} reviews)</p>
              <p>{course?.studentsEnrolled?.length} students enrolled</p>
              </div>

              <p className="mb-3">Created By {course?.createdBy?.firstname} {course?.createdBy?.lastname}</p>

              <div className="flex items-center ">
                <BiInfoCircle className="text-white mr-2" size={20} />
                Created at {date} | {time}
                <p className="flex items-center gap-x-2 ml-5 ">
                  <BsGlobe2 /> English
                </p>
              </div>
            </div>

            <div className="absolute top-12 right-10 bg-richblack-700 rounded-md flex flex-col w-[400px]  items-center justify-center">
              <img
                src={course.thumbnail}
                className="w-full h-56 rounded-t-md"
              />

              <div className="pl-5 w-11/12 pr-5">
                <p className="text-3xl font-bold mt-6 text-white">
                  {" "}
                  Rs. {course.price}
                </p>
                <button
                  onClick={
                    user && course?.studentsEnrolled?.includes(user?._id) ? ()=>navigate("/dashboard/enrolled-courses"):handleBuyCourse
                  }
                  className="bg-yellow-50 py-2 font-bold text-sm text-black rounded-md mt-6 w-full cursor-pointer outline-none"
                >
                  {
                    user && course?.studentsEnrolled?.includes(user?._id) ? "Go to Course":"Buy Now"
                  }
                </button>
                {
                    (!course?.studentsEnrolled?.includes(user?._id))&&(
                <button onClick={handleAddToCart} className="mt-3 bg-richblack-800 text-white py-2 w-full rounded-md outline-none text-sm font-bold cursor-pointer">
                  Add to Cart
                </button>
                    )                    
                }
                <p className="text-sm text-richblack-25 text-center w-full mt-5 mb-5">
                  30-Day Money-Back Guarantee
                </p>

                <p className="text-xl font-semibold">This Course Includes : </p>

                <div>
                  {course?.Instruction?.map((instruction, indx) => (
                    <div
                      key={indx}
                      className="text-sm flex items-center mt-3 mb-2 text-caribbeangreen-100 gap-x-2"
                    >
                      <BiSolidRightArrow />
                      {instruction}
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-center justify-center text-yellow-50 gap-x-2 mt-8 mb-8 cursor-pointer"
                  onClick={copyToClipboard}
                >
                  <FaShareSquare />
                  Share
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 mb-5">
            <div className="border border-richblack-700 ml-16 w-7/12 pt-6 pl-10">
              <h1 className="text-3xl font-bold mt-3">What you'll learn</h1>
              <p className="mt-5 mb-10 text-sm text-richblack-50">
                {course.whatULearn}
              </p>
            </div>

            <div className="mt-10 ml-16 w-7/12">
              <h1 className="text-4xl font-bold">Course Content</h1>
              <div className="flex mt-4 gap-x-2 justify-between">
                <div className="flex gap-x-2">
                <p>{course?.courseContent?.length} section(s)</p>
                <p>{totalNoOfSubSections} lecture(s)</p>
                <p> {duration} total length</p>
                </div>
                <div onClick={()=>setIsActive([])} className="text-yellow-50 cursor-pointer">
                    Collapse all sections
                </div>
              </div>
            </div>

            <div className="mt-5">
                {
                    course?.courseContent?.map((section,indx)=>(
                        <div key={indx} className="ml-16 w-7/12 cursor-pointer transition-all delay-200">

                            <div className="flex items-center  gap-x-2 justify-between bg-richblack-700 border border-richblack-600 py-5 pl-5" onClick={()=>handleActive(section._id)}>
                            <div className="flex gap-x-2">
                            {
                            isActive.includes(section._id) ? <MdOutlineKeyboardArrowUp size={24}/>:<MdOutlineKeyboardArrowDown size={24}/>
                            }
                            {section.title}
                            </div>
                            <div className="mr-5 text-yellow-50">
                            {section?.subSection?.length} lecture(s)
                            </div>
                            </div>

                          {isActive.includes(section._id) && 
                            (
                            section?.subSection?.map((subSection,indx)=>(
                                <div key={indx} className="border border-t-0 border-richblack-600 py-5 px-6 justify-between items-center flex font-semibold">

                                    <div className="flex gap-x-5 items-center">
                                    <IoMdVideocam className="text-yellow-50"/>
                                    {subSection.title}
                                    </div>

                                    {Math.floor(subSection.time)} s

                                </div>
                            )))
                            }
                        </div>
                    ))
                }
            </div>

          </div>

            <div className="mb-10 mt-10 pl-16">
              <h1 className="text-4xl font-bold">Author</h1>
              <div className="flex mt-3 items-center gap-x-4">
                <img src={course?.createdBy?.image } className="rounded-full w-[60px] h-[60px]"/>
                  <p className="text-lg">{course?.createdBy?.firstname} {course?.createdBy?.lastname}</p>
              </div>
            </div>
                
          <div className="w-11/12 max-w-maxContent mx-auto">
          <h1 className="text-4xl mb-10 font-inter text-center font-bold">Review From Other Learners</h1>
          <ReviewSlider/>
          </div>

          <Footer/>
        </div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  );
};

export default CourseDetails;