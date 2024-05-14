import React, { useState, useEffect, useContext } from "react";
import {Link, useParams} from 'react-router-dom' ;
// import {toast} from "react-toastify" ;
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Assets/Tables.css" ;

const Instructor = () => {
  const [instructorinfo, setInstructorinfo] = useState([]) ; 
  const [currcourses, setCurrcourses] = useState("") ;
  const [prevcourses, setPrevcourses] = useState("") ;
  const [currsemester, setCurrsemester] = useState("");
  const {isAuthenticated,Logout}=useContext(AuthContext);
  let {instructor_id} = useParams() ;
  const navigate=useNavigate();

  async function getinstructorinfo(){
    try{
        const res = await fetch(`http://localhost:9000/instructor/${instructor_id}/`, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials:'include',
          mode : 'cors'
      });
      const instructorarray = await res.json() ;
      setInstructorinfo(instructorarray) ;

    }catch(error){
      console.error(error.message) ;
    }
  }

  async function getcurrcourses(){
    try{
          const response = await fetch(`http://localhost:9000/instructor/currcourses/${instructor_id}/`, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials:'include',
          mode : 'cors'
        });
        const courses = await response.json() ;
        setCurrcourses(courses) ;
    }
    catch(error){
      console.log(error.message) ;
    }
  }

  async function getprevcourses(){
      try{
        const response = await fetch(`http://localhost:9000/instructor/prevcourses/${instructor_id}/`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials:'include',
        mode : 'cors'
      });
      const courses = await response.json() ;
      setPrevcourses(courses) ;
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
          getinstructorinfo() 
          getcurrcourses()
          getprevcourses()
          getsemester()
        }
  },[]);

  return (
    <div style = {{backgroundColor : '#F1ECEC',height:'100vh'}}>
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
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to ="/login/" onClick = {e => logout(e)}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> 
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize : '27px', marginTop : '20px' }}> Details of instructor : {instructor_id}</h1>
        <table className = "table mt-5" style={{ width: '80%', margin: '0 auto' }}>
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Instructor id</th>
                        <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Name</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Department</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {
                    instructorinfo.map(info => (
                        <tr>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{instructor_id}</td>
                            <td style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.name}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.dept_name}</td>
                        </tr> 
                    ))  
                    }  
                </tbody>
            </table>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize : '27px', marginTop : '20px' }}> Teaching Courses in {currsemester.year} {currsemester.semester}</h1>
            {currcourses.length === 0? (
          <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize : '18px', color : 'red' }}>No Courses</h2>
        ): (
        <table className = "table mt-5" style={{ width: '80%', margin: '0 auto' }}>
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Sr No</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Course id</th>
                        <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Title</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Credits</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {
                    currcourses.map((info, index) => (
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

        <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize : '27px', marginTop : '25px' }}>Courses offered in Previous Semesters</h1>
        {prevcourses.length === 0? (
          <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize : '18px', color : 'red' }}>No Courses</h2>
        ): (
        <table className = "table mt-5" style={{ width: '80%', margin: '0 auto' }}>
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Sr No</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Course id</th>
                        <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Title</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Credits</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Year</th>
                        <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Semester</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                   
                    {prevcourses.map((info, index) => (
                        <tr>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{index+1}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>
                              <Link to = {`/course/${info.course_id}/`}>{info.course_id}</Link>
                            </td>
                            <td style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.title}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.credits}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.year}</td>
                            <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#D1C85B'}}>{info.semester}</td>
                        </tr> 
                    ))  
                    } 
                </tbody>
            </table>
        )}
      </div>
  );
}

// figure out how to display the info we get 
export default Instructor ;