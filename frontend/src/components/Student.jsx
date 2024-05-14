import React, {Fragment, useState, useEffect, useContext} from "react";
// import {toast} from "react-toastify" ;
import {Link, useParams} from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../Assets/Home.css';

const Student = () => {
    const [currsemester, setCurrsemester] = useState("") ;
    const [currcourses, setCurrcourses] = useState([]) ;
    const [prevcourses, setPrevcourses] = useState([]) ;
    const [personalinfo, setPersonalinfo] = useState([]) ;
    const [credits, setCredits] = useState("") ;
    let {id} = useParams() ;
    const {isAuthenticated,Logout}=useContext(AuthContext);
    const navigate=useNavigate();
    async function getName(){
        try{
          const response = await fetch(`http://localhost:9000/student/${id}/`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials:'include',
            mode:'cors'
          });
    
          const parseRes = await response.json() ;
          setPersonalinfo(parseRes)
        }catch(error){
          console.error(error.message)
        }
      }
      async function getprevcourses(){
        try{
          const response = await fetch(`http://localhost:9000/student/prev/${id}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials:'include',
            mode : 'cors'
          });
          const ans = await response.json() ;
          setPrevcourses(ans)
        }catch(error){
          console.error(error.message)
        
      }
    }
    async function getcurrcourses(){
      try{
        const response = await fetch(`http://localhost:9000/student/curr/${id}`, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials:'include',
          mode : 'cors'
        });
        const ans = await response.json() ;
        console.log(ans);
        setCurrcourses(ans)
      }catch(error){
        console.error(error.message)
      
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
      async function getcredits(){
        try{
            const response = await fetch(`http://localhost:9000/student/credits/${id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials:'include',
            mode:'cors'
          });
            const parseRes = await response.json() ;
            setCredits(parseRes)
        }catch(error){
          console.error(error.message)
        }  
      }
      useEffect(() => {
        if(!isAuthenticated){
            navigate("/login") ;
        }
        else{
          getName()
          getprevcourses()
          getcurrcourses()
          getsemester()
          getcredits()
        }
      }, []);   
    return (
        <div>
          <div >
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
<div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
  <div className="student-details" style = {{backgroundColor : '#ADD8E6'}}>
    <h2>User Details</h2>
    <p>User ID: {personalinfo.id}</p>
    <p>User Name: {personalinfo.name}</p>
    <p>User Department: {personalinfo.dept_name}</p>
    {credits.total_credits === null? (<p>Total Credits: 0</p>):(<p>Total Credits: {credits.total_credits}</p>)}
  </div>
</div>

<h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize : '35px',marginTop : '20px' }}>Performance Summary</h1>

<h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize : '25px', color : 'red', marginTop : '18px'}}>Year-Semester : {currsemester.year}-{currsemester.semester}</h2>
{currcourses.length === 0? (
  <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize : '18px', color : 'blue', marginTop : '18px' }}>No Courses taken in {currsemester.year} {currsemester.semester}</h2>
): (
  <table className = "table mt-5" style={{ width: '80%', margin: '0 auto' }}>
  <thead style={{ textAlign: 'center' }}>
      <tr>
          <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Sr No</th>
          <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB' }}>Course id</th>
          <th style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Title</th>
          <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Credits</th>
          <th className="varying-cell" style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>Year</th>
      <th className="varying-cell" style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>Semester</th>
          <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Grade</th>
      </tr>
  </thead>
  <tbody style={{ textAlign: 'center' }}>
      {
      currcourses.map((info, index) => (
          <tr>
              <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : 'white'}}>{index+1}</td>
              <td style = {{border : '2px solid black', backgroundColor : 'white'}}>{info.course_id}</td>
              <td style = {{border : '2px solid black', backgroundColor : 'white'}}>{info.title}</td>
              <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : 'white'}}>{info.credits}</td>
              <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : 'white'}}>{info.year}</td>
              <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : 'white'}}>{info.semester}</td>
              <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : 'white'}}>{info.grade}</td>
          </tr> 
      ))  
      }  
  </tbody>
</table>
)}

<div>
{Object.entries(prevcourses).map(([key, courses]) => (
<>
<h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize : '25px', color : 'red', marginTop : '20px'}}>Year-Semester : {key}</h2>
<table className="table mt-5" style={{ width: '80%', margin: '0 auto' }} key={key}>
<thead style={{ textAlign: 'center' }}>
    <tr>
      <th className="varying-cell" style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>
        Sr No
      </th>
      <th style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>Course id</th>
      <th style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>Title</th>
      <th className="varying-cell" style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>
        Credits
      </th>
      <th className="varying-cell" style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>
        Year
      </th>
      <th className="varying-cell" style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>
        Semester
      </th>
      <th className="varying-cell" style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>
        grade
      </th>
    </tr>
  </thead>
<tbody style={{ textAlign: 'center' }}>
  {courses.map((info, index) => (
    <tr key={info.course_id}>
      <td className="varying-cell" style={{ border: '2px solid black', backgroundColor: 'white' }}>
        {index + 1}
      </td>
      <td style={{ border: '2px solid black', backgroundColor: 'white' }}>{info.course_id}</td>
      <td style={{ border: '2px solid black', backgroundColor: 'white' }}>{info.title}</td>
      <td className="varying-cell" style={{ border: '2px solid black', backgroundColor: 'white' }}>
        {info.credits}
      </td>
      <td className="varying-cell" style={{ border: '2px solid black', backgroundColor: 'white' }}>
        {info.year}
      </td>
      <td className="varying-cell" style={{ border: '2px solid black', backgroundColor: 'white' }}>
        {info.semester}
      </td>
      <td className="varying-cell" style={{ border: '2px solid black', backgroundColor: 'white' }}>
        {info.grade}
      </td>
    </tr>
  ))
  }
</tbody>
</table>
</>
)  
)}
</div>
</div>
        </div>
    )
}; 

export default Student ;