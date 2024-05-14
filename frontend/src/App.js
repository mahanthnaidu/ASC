import React, {Fragment} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom" ;
// import {toast} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home" ;
import Login from "./components/Login" ;
import Alldepartments from "./components/Alldept";
import Rundepartments from "./components/Rundept";
import RundepartmentCourses from "./components/Rundeptcourses" ;
import Course from "./components/Course" ;
import Instructor from "./components/Instructor" ;
import AlldepartmentCourses from "./components/Alldeptcourses";
import Registration from "./components/Registration" ;
import NotFound from "./components/Error";
import Allstudents from "./components/Allstudents" ;
import Student from "./components/Student" ;

// import {toast} from 'react-toastify' ;
// import AuthContext from "./context/AuthContext";
// import { useLocation } from "react-router-dom";


function App(){

  // const {isAuthenticated,Login}=useContext(AuthContext)
  // const location=useLocation();

  // useEffect(() => {
  //   // if(!isAuthenticated &&){
  //     // console.log(location);
  //   // }
  // })
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/home/" element={<Home/>}/>
          <Route path = "/home/course/" element = {<Alldepartments/>}/>
          <Route path = "/home/course/:dept_name/" element = {<AlldepartmentCourses/>}/>
          <Route path = "/course/running/" element = {<Rundepartments/>}/>
          <Route path = "/course/running/:dept_name/" element = {<RundepartmentCourses/>}/>
          <Route path = "/course/:course_id/" element = {<Course/>}/>
          <Route path = "/instructor/:instructor_id/" element = {<Instructor/>}/>
          <Route path = "/home/registration/" element = {<Registration/>}/>
          <Route path = "/home/allstudents/" element = {<Allstudents/>}/>
          <Route path = "/home/student/:id" element = {<Student/>}/>
          <Route path="*" element = {<NotFound/>}/>
        </Routes>
      </Router>
    </Fragment> 
  )
}
export default App ;
