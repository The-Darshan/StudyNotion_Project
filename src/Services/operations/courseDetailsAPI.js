import toast from "react-hot-toast";
import { courseAPI } from "../apis";
import { apiConnector } from "../apiconnector";

const {
  GET_CATEGORIES_API,
  EDIT_COURSE_DETAIL_API,
  CREATE_COURSE_API,
  UPDATE_SECTION_API,
  CREATE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  EDIT_SUBSECTION_API,
  GET_INSTRUCTOR_COURSE_API,
  DELETE_COURSE_API,
  GET_COURSE_DETAILS,
  GET_COURSE_FULL_DETAILS,
  CREATE_RATING_API,
  GET_AVERAGE_RATING_API,
  GET_ALL_RATINGS_API,
  LECTURE_COMPLETED_API,
} = courseAPI;

export const getAllCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_CATEGORIES_API);
    if (!response.data.success) throw new Error(response.data);
    console.log("RESPONSE OF CATEGORIES", response);
    result = response?.data?.Tags;
  } catch (err) {
    console.log("Error in getting all Categories");
    toast.error("Failed to fetch categories!");
  }
  return result;
};

export const editCourseDetails = async (updates, token) => {
  const toastID = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      EDIT_COURSE_DETAIL_API,
      updates,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("EDIT COURSE API RESPONSE............", response);

    if (!response.data.status) throw new Error(response.data.message);
    toast.success("Course Details Updated Successfully");
    result = response?.data?.updatedCourse;
  } catch (err) {
    console.log("Unable to edit course Details : ", err);
    toast.error("Unable to edit course Details");
  }
  toast.dismiss(toastID);
  return result;
};

export const addCourseDetails = async (formData, token) => {
  console.log("Form : ", formData);
  const toastID = toast.loading("Loading....");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE COURSE API RESPONSE >>>>>>>>", response);
    if (!response.data.success) throw new Error(response.data.Message);

    toast.success("Course Created Successfully");
    result = response?.data?.data;
  } catch (err) {
    console.log("Unable to create Course : ", err);
    toast.error("Unable to create Course");
  }
  toast.dismiss(toastID);
  return result;
};
//"Content-Type": "multipart/form-data" ye tab likhta h jab header ma hum koi file ki image ye vedio dalata h.

//Token hum jab pass kar rah h jab backend ma humne koi middleware laga rkha n
export const updateSection = async (data, token) => {
  const toastId = toast.loading("Loading ...");
  let result = null;
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SECTION API RESPONSE ____", response);

    if (!response.data.success) throw new Error(response.data.Message);

    toast.success("Section Updated Successfully");
    result = response?.data?.data;
  } catch (err) {
    console.log("ERROR IN UPDATING SECTON", err);
    toast.error("ERROR IN UPDATING SECTON");
  }
  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATe SECTION API RESPONSE ____", response);

    if (!response.data.success) throw new Error(response.data.Message);

    toast.success("Section Created Successfully");
    result = response?.data?.data;
  } catch (err) {
    console.log("ERROR IN CREATING A SECTION : ", err);
    toast.error("ERROR IN CREATING A SECTION");
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastID = toast.loading("Loading ...");
  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("DELETING SECTION RESPONSE : ", response);

    if (!response.data.success) throw new Error(response.data.Message);

    toast.success("SECTION DELETED SUCCESSFULLY");
    result = response?.data?.data;
  } catch (err) {
    console.log("ERROR IN DELETING SECTION : ", err);
    toast.error("ERROR IN DELETING SECTION : ");
  }
  console.log("A");
  toast.dismiss(toastID);
  console.log("B");
  return result;
};

export const deleteSubSection = async (data, token) => {
  const toastID = toast.loading("Loading ...");
  let result = null;
  try {
    console.log("1");
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("RESPONSE OF DELETING SUB_SECTION : ", response);

    if (!response.data.status) throw new Error(response.data.message);

    toast.success("Sub Section Deleted Succesfully");
    result = response?.data?.deletedSubSection;
  } catch (err) {
    console.log("ERROR IN DELETING SUB SECTION : ", err);
    toast.error("ERROR IN DELETING SUB SECTION : ");
  }
  toast.dismiss(toastID);
  return result;
};

export const createSubSection = async (data, token) => {
  const toastID = toast.loading("Loading ...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATING SUB_SECTION RESPONSE : ", response);

    if (!response.data.success) throw new Error(response.data.Message);

    toast.success("SUB SECTION CREATED");
    result = response.data?.data;
  } catch (err) {
    console.log("ERROR IN CREATING SUB_SECTION ", err.message);
    toast.error("ERROR IN CREATING SUB_SECTION ");
  }
  toast.dismiss(toastID);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastID = toast.loading("Loading ...");
  try {
    const response = await apiConnector("POST", EDIT_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("UPDATE SUB_SECTION RESPONSE : ", response);

    if (!response.data.status) throw new Error(response.data.message);

    toast.success("SUB SECTION UPDATE");
    result = response?.data?.data;
  } catch (err) {
    console.log("ERROR IN UPDATING SUB_SECTION ", err.message);
    toast.error("ERROR IN UPDATING SUB_SECTION ");
  }
  toast.dismiss(toastID);
  return result;
};

export const getInstructorDetails = async (token) => {
  let result = null;
  const toastID = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_COURSE_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("RESPONSE OF COURSES BY INSTRUCTOR : ", response);

    if (!response.data.status) throw new Error(response.data.message);

    toast.success("All Courses Fetched");
    result = response?.data?.courses;
  } catch (err) {
    console.log("ERROR IN FETCHING COURSE BY INSTRUCTOR : ", err.message);
    toast.error("ERROR IN FETCHING COURSE BY INSTRUCTOR");
  }
  toast.dismiss(toastID);
  return result;
};

export const deleteCourse = async (data, token) => {
  const toastID = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.status) throw new Error(response.data.message);

    toast.success("Course Deleted successfully");
  } catch (err) {
    console.log("ERROR IN DELETING THE COURSE : ", err.message);
    toast.error("ERROR IN DELETING THE COURSE");
  }
  toast.dismiss(toastID);
};

export const getFullDetailsofCourse = async (courseID) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    console.log("CourseId : ", courseID);

    const response = await apiConnector("POST", GET_COURSE_DETAILS, {
      courseID,
    });
    console.log("A");
    if (!response.data.success) throw new Error(response.data.message);

    console.log("COURSE DETAILED FETCHED : ", response);

    toast.success("DATA FETCHED SUCCESSFULLY");
    result = response?.data?.data;
  } catch (err) {
    console.log("ERROR IN FETCHING COURSE DETAILS:", err);
    toast.error("Error in fetching course details!");
  }
  toast.dismiss(toastId);
  return result;
};

export const getFullDetailOfCourseWithUser = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_COURSE_FULL_DETAILS,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createRating = async (data, token) => {
  let toastId = toast.loading("Loading...");
  let result = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("RATING CREATED SUCCESSFULLY...", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Successfully Rated");
    result = true;
  } catch (err) {
    result = false;
    console.log("Error in Rating", err);
    toast.error(err.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const averageRating = async (courseID) => {
  const toastID = toast.loading("Loading...");
  let result = null;
  try {
    const res = await apiConnector("GET", GET_AVERAGE_RATING_API, { courseID });

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    console.log("AVERAGE RATING >>>", res);

    result = res.data.averageRating;
  } catch (err) {
    console.log("ERROR IN GETTING AVERAGE RATINGS", err);
    toast.error("ERROR OCCUERED");
  }
  toast.dismiss(toastID);
  return result;
};

export const markLectureAsComplete = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      LECTURE_COMPLETED_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    toast.success("Lecture Completed");
    result = true

  } catch (err) {
    toast.error("Lecture Not Completed");
    console.log("ERROR IN UPGRADING COURSE  PROGRESS ", err);
    result = false
  }
  toast.dismiss(toastId);
  return result;
};
