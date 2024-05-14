// this is just at table of number of distinct courses in each department 

import React, { Fragment, useState, useEffect, useContext } from "react";
import {Link, useParams} from 'react-router-dom' ;
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Assets/Tables.css" ;
// import {toast} from "react-toastify" ;

const RundepartmentCourses = () => {
    const [courses, setCourses] = useState([]) ;
    const {isAuthenticated,Logout} = useContext(AuthContext);
    const [currsemester, setCurrsemester] = useState("");
    const navigate=useNavigate();
    let {dept_name} = useParams() ;
    async function getCourses(){
        try{
            const res = await fetch(`http://localhost:9000/course/running/${dept_name}`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials:'include',
                mode : 'cors'
            });

            const coursesarray = await res.json() ;
            setCourses(coursesarray) ;
        }catch(error){
            console.error(error.message) ;
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
      if(!isAuthenticated){
          navigate("/login")
        }
        else{
          getCourses()
          getsemester()
        }
  },[]);

    return(
        <Fragment style = {{backgroundColor : '#F1ECEC'}}>
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
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize : '27px' }}>Courses offered from {dept_name} in {currsemester.year} {currsemester.semester}</h1>
            <table className = "table mt-5" style={{ width: '80%', margin: '0 auto' }}>
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Sr No</th>
                        <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Course id</th>
                        <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Title</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Credits</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {
                    courses.map((info, index) => (
                        <tr>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{index+1}</td>
                            <td style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>
                            <Link to={`/course/${info.course_id}/`}>{info.course_id}</Link>
                            </td>
                            <td style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.title}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.credits}</td>
                        </tr> 
                    ))  
                    }  
                </tbody>
            </table>
        </div>
        </Fragment>
    )
}

export default RundepartmentCourses; 