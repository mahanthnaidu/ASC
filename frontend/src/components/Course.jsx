import React, { useState, useEffect, useContext } from "react";
import {Link, useParams} from 'react-router-dom' ;
// import {toast} from "react-toastify" ;
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Assets/Tables.css" ;

const Course = () => {
  const [courseinfo, setCourseinfo] = useState([]) ; 
  const [courseprereq, setCourseprereq] = useState("") ;
  const [currinstructor, setCurrinstructor] = useState("") ;
  const [currsemester, setCurrsemester] = useState("") ;
  const {isAuthenticated,Logout}=useContext(AuthContext);
  let {course_id} = useParams() ;
  const navigate=useNavigate();

  async function getcourseinfo(){
    try{
        const res = await fetch(`http://localhost:9000/course/${course_id}/`, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials:'include',
          mode : 'cors'
      });
      const coursesarray = await res.json() ;
      // console.log(coursesarray) ;
      setCourseinfo(coursesarray) ;
    }catch(error){
      console.error(error.message) ;
    }
  }

  async function getcourseprereq(){
    try{
        const response = await fetch(`http://localhost:9000/course/prereq/${course_id}/`, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials:'include',
          mode : 'cors'
      }); 
      const prereq = await response.json() ;
      setCourseprereq(prereq) ;
    }
    catch(error){
      console.log(error.message) ;
    }
  }

  async function getcurrinstructor(){
    try{
        const result = await fetch(`http://localhost:9000/course/currinstructors/${course_id}/`, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials:'include',
          mode : 'cors'
      }); 
      const instructorinfo = await result.json() ;
      setCurrinstructor(instructorinfo) ;
    }
    catch(error){
      console.log(error.message) ;
    }
  }

  async function getsemester(){
    try{
      const response = await fetch("http://localhost:9000/currentsemester/", {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials:'include',
      mode : 'cors'
    });
    const semesters = await response.json() ;
    setCurrsemester(semesters) ;
  }
    catch(error){
    console.log(error.message) ;
  }   
}
const logout = async(e)=>{
  e.preventDefault();
  const confirmation = window.confirm("this will log out you from this page") ;
  if(confirmation){
    Logout();
    navigate("/login") ;
  }
} 
  useEffect(() => {

      console.log({message : "---------------------------------------"})
      if(!isAuthenticated){
          navigate("/login")
        }
        else{
          getcourseinfo() 
          getcourseprereq() 
          getcurrinstructor()
          getsemester()
        }
  },[course_id]);
  
  return (
    <div style = {{backgroundColor : '#F1ECEC',height:'100vh'}}>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme = "dark">
          <div className="container-fluid">
            <Link className="navbar-brand" href="#">ASC</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="/home/">Home</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to ="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Courses
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" aria-current="page" to ="/course/running/">Running Courses</Link></li>
                    <li><Link className="dropdown-item" aria-current="page" to ="/home/course/">All Courses</Link></li>
                    {/* <li><hr className="dropdown-divider"></li> */}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to ="/login/" onClick = {e => logout(e)}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>  
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize : '27px', marginTop : '20px' }}> Course details of {course_id}</h1>  
        <table className = "table mt-5" style={{ width: '80%', margin: '0 auto' }}>
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Course id</th>
                        <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Title</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Credits</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {
                    courseinfo.map(info => (
                        <tr>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.course_id}</td>
                            <td style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.title}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.credits}</td>
                        </tr> 
                    ))  
                    }  
                </tbody>
            </table>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize : '27px', marginTop : '20px' }}> Details of Course Prerequisites</h1>
        {courseprereq.length === 0? (
          <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize : '18px', color : 'red', marginTop : '20px' }}> There are no prerequisites for this course</h2>
        ): (
<table className = "table mt-5" style={{ width: '80%', margin: '0 auto' }}>
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Sr No</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Prereq id</th>
                        <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Title</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Credits</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {
                    courseprereq.map((info, index) => (
                        <tr>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{index+1}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>
                              <Link to = {`/course/${info.course_id}/`}>{info.course_id}</Link>
                            </td>
                            <td style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.title}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.credits}</td>
                        </tr> 
                    ))  
                    }  
                </tbody>
            </table>
        )}
                
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize : '27px', marginTop : '20px' }}>Instructors teaching this course in {currsemester.year} {currsemester.semester}</h1>
        {currinstructor.length === 0?(
          <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize : '18px', color : 'red', marginTop : '20px' }}>This Course is not running in {currsemester.year} {currsemester.semester}</h2>
        ):(
<table className = "table mt-5" style={{ width: '80%', margin: '0 auto' }}>
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Sr No</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Instructor ID</th>
                        <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Instructor Name</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Section</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {
                    currinstructor.map((info, index) => (
                        <tr>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{index+1}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>
                              <Link to = {`/instructor/${info.i_id}/`}>{info.i_id}</Link>
                            </td>
                            <td style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.name}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.section}</td>
                        </tr> 
                    ))  
                    }  
                </tbody>
            </table>
        )}
      </div>
      </div>
  );
}

// figure out how to display the info we get 
export default Course ;