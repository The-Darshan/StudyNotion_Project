const BASE_URL =  "http://localhost:4000/api/v1"
// REACT_APP_BASE_URL it should always be writen in this manner only.

export const authAPI = {
    RESET_PASSWORD_API : BASE_URL+"/resetPassword",
    RESET_PASSWORD_TOKEN : BASE_URL+"/resetPasswordToken",
    SIGNUP_API : BASE_URL+"/SignUp",
    SENDOTP_API:BASE_URL+"/sendOtp",
    LOGIN_API:BASE_URL + "/Login"
}

export const categories = {
    CATEGORIES_API : BASE_URL + '/course/getAllCourses',
}

export const setting = {
    UPDATE_PP_API : BASE_URL + "/profile/updateProfilePicture",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updatePofile",
    DELETE_ACCOUNT_API : BASE_URL + "/profile/deleteAccount",
    CHANGE_PASSWORD_API : BASE_URL + "/changePassword",
    GET_USER_DETAILS_API : BASE_URL + "/profile/getAllUsersDetails"
}

export const courseAPI = {
    GET_CATEGORIES_API : BASE_URL + "/course/showAllCategory",
    EDIT_COURSE_DETAIL_API : BASE_URL +"/course/editCourse",
    CREATE_COURSE_API:BASE_URL + "/course/createCourse",
    UPDATE_SECTION_API:BASE_URL+"/course/updateSection",
    CREATE_SECTION_API : BASE_URL + "/course/createSection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",
    CREATE_SUBSECTION_API : BASE_URL + "/course/createSubSection",
    EDIT_SUBSECTION_API : BASE_URL + "/course/updateSubSection",
    GET_INSTRUCTOR_COURSE_API : BASE_URL + "/course/getInstructorCourse",
    DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",
    GET_COURSE_DETAILS : BASE_URL + "/course/getCourseDetails",
    GET_COURSE_FULL_DETAILS : BASE_URL + "/course/getFullCourseDetails",
    CREATE_RATING_API : BASE_URL + "/course/createRating",
    GET_AVERAGE_RATING_API : BASE_URL + "/course/getAverageRating",
    GET_ALL_RATINGS_API: BASE_URL + "/course/getAllRatingsAndReviews",
    LECTURE_COMPLETED_API : BASE_URL + '/course/updateCourseProgress'
} 

export const catalogData= {
    CATALOG_PAGE_DATA_API : BASE_URL + "/course/categoryPageDetails"
}

export const studentPayment = {
    COURSE_PAYMENT_API: BASE_URL + '/payment/capturePayment',
    COURSE_VERIFY_API : BASE_URL + '/payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + '/payment/sendPaymentSuccessEmail'
}

export const profile = {
    GET_INSTRUCTOR_DATA_API : BASE_URL + "/profile/instructorDashboard",
    GET_USER_ENROLLED_COURSES_API : BASE_URL + "/profile/getEnrolledCourses"
}

export const contact = {
    CONTACT_API : BASE_URL + '/contact/contactUsController'
}

export const chatRoom = {
    SEND_MESSAGE_API : BASE_URL + '/room/sendMessage',
    FIND_CHAT_ROOM_API : BASE_URL + '/room/findChatRoom',
    GET_MESSAGES_API : BASE_URL + '/room/getUserSpecificMessages',
    DELETE_MESSAGE_API : BASE_URL + '/room/deleteMessage'
}