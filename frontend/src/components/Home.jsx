// with this simple auth when ever refreshed the state is by default is set to fals eback again which redirects to the login page back we will use token later whether it is authorized or not 
//so inside app.js we will be using something called as userfact which is going to consistently make request  everytime it is re rendered in order to make sure or check whether the person is authenticated or not 
import React, {Fragment, useState, useEffect, useContext} from "react";
// import {toast} from "react-toastify" ;
import {Link} from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../Assets/Home.css';

const Home = () => {
  const [instid, setInstid] = useState("") ;
  const [currsemester, setCurrsemester] = useState("") ;
  const [currcourses, setCurrcourses] = useState([]) ;
  const [prevcourses, setPrevcourses] = useState([]) ;
  const [personalinfo, setPersonalinfo] = useState([]) ;
  const [credits, setCredits] = useState("") ;
  // const [instr, setInstr] = useState("") ;

  const {isAuthenticated,Logout}=useContext(AuthContext);
  const navigate=useNavigate();

  async function getinstr(){
    try{
      const response = await fetch("http://localhost:9000/checkinstructor/",{
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials:'include',
        mode:'cors'
      });

      const parseRes = await response.json() ;
      // console.log(parseRes);
      // setId(parseRes.id)
      setInstid(parseRes) ;
    }catch(error){
      console.error(error.message)
    } 
  }
  async function getName(){
    try{
      const response = await fetch("http://localhost:9000/home/studentdisplay/",{
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials:'include',
        mode:'cors'
      });

      const parseRes = await response.json() ;
      // console.log(parseRes);
      // setId(parseRes.id)
      setPersonalinfo(parseRes)
    }catch(error){
      console.error(error.message)
    }
  }

  async function getcredits(){
    try{
        const response = await fetch("http://localhost:9000/home/studentcredits/",{
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

  async function getprevcourses(){
    try{
      const response = await fetch("http://localhost:9000/home/studentprevcourses", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials:'include',
        mode : 'cors'
      });
      const ans = await response.json() ;
      console.log(ans);
      setPrevcourses(ans)
    }catch(error){
      console.error(error.message)
    
  }
}
async function getcurrcourses(){
  try{
    const response = await fetch("http://localhost:9000/home/studentcurrcourses", {
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

async function dropcourse(course_id, sec_id) {
  try{
    // console.log("S")
      const response = await fetch(`http://localhost:9000/home/dropcourse/${course_id}/${sec_id}/`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      credentials:'include',
      // body: JSON.stringify({course_id, sec_id, year, semester}),
      mode : 'cors',
      });
      console.log(response.json()) ;
      console.log({message : `This course has been deleted ${course_id}`}) ;
      window.location = "/home" ;
  }catch(error){
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

  const drop = async(e, course_id, sec_id) =>{
    e.preventDefault() ;
    const confirmation = window.confirm(`Are you sure do you want to drop this course ${course_id}`);
    if(confirmation){
      dropcourse(course_id, sec_id) ;
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
      getinstr()
    }
  }, []);
  
  return (
      <div>
        {instid.length === 0 ? (
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
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to ="/home/registration/">Registration</Link>
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
          <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Grade</th>
          <th className="varying-cell" style = {{border : '2px solid black', backgroundColor : '#A9C5EB'}}>Course Drop</th>
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
              <td className="varying-cell" style = {{border : '2px solid black', backgroundColor : 'white'}}>{info.grade}</td>
              <td style = {{border : '2px solid black', backgroundColor : 'white'}}>
                <button type="button" class="btn btn-success" onClick = {e => drop(e, info.course_id, info.sec_id)}>Drop</button>
              </td>
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
        year
      </th>
      <th className="varying-cell" style={{ border: '2px solid black', backgroundColor: '#A9C5EB' }}>
        semester
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
        ) : (

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
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to ="/home/allstudents/">Allstudents</Link>
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
    <p>User ID: {instid.id}</p>
    <p>User Name: {instid.name}</p>
    <p>User Department: {instid.dept_name}</p>
  </div>
</div>
          </div>
        )}
    </div>   
  );
}


// 94766 
export default Home; 