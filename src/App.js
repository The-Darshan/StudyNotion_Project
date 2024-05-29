import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './Components/common/Navbar';
import ForgotPassword from './Pages/ForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyEmail from './Pages/VerifyEmail';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Error from "./Pages/Error"
import MyProfile from './Components/core/Dashboard/MyProfile';
import Dashboard from './Pages/Dashboard';
import { PrivateRoute } from './Components/core/auth/PrivateRoute';
import EnrolledCourses from './Components/core/Dashboard/EnrolledCourses';
import Cart from './Components/core/Dashboard/Cart';
import { ACCOUNT_TYPE } from './utils/constant';
import Settings from './Components/core/Dashboard/Settings/Index';
import { useSelector } from 'react-redux';
import AddCourse from './Components/core/Dashboard/AddCourse';
import MyCourses from './Components/core/Dashboard/MyCourses';
import EditCourse from './Components/core/Dashboard/EditCourse';
import Catalog from './Pages/Catalog';
import CourseDetails from './Pages/CourseDetails';
import ViewCourse from './Pages/ViewCourse';
import VideoDetails from './Components/core/ViewCourse/VideoDetails';
import Instructor from './Components/core/Dashboard/InstructorDashboard/Instructor';

function App() {
  const {user} = useSelector((state)=>state.profile)
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex-col font-inter'>
      <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='catalog/:catalogName' element={<Catalog/>}/>
          <Route path='courses/:courseId' element={<CourseDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/update-password/:id' element={<UpdatePassword/>}/>
          <Route path='/verifyEmail'  element={<VerifyEmail/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<ContactUs/>}/>

          <Route element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>
            <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
            <Route path='/dashboard/settings' element={<Settings/>}/>
            {user?.accounttype == ACCOUNT_TYPE.STUDENT && (
              <>
               <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
               <Route path='dashboard/cart' element={<Cart/>}/>
               </>
            )}

            {user?.accounttype == ACCOUNT_TYPE.INSTRUCTOR && (
              <>
               <Route path='/dashboard/add-course' element={<AddCourse/>}/>
               <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
               <Route path='/dashboard/instructor' element={<Instructor/>}/>
               <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>
               </>
            )}
            </Route>
          <Route path='*' element={<Error/>}/>

            <Route element={
              <PrivateRoute>
                <ViewCourse/>
              </PrivateRoute>
            }>

              {
                user?.accounttype === ACCOUNT_TYPE.STUDENT && (
                  <>
                  <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
                  </>
                )
              }

            </Route>

       </Routes>
    </div>
  );
}

export default App;
