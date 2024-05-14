import React, {Fragment, useState, useEffect, useContext} from "react";
// import {toast} from "react-toastify" ;
import {Link} from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Registration = () => {
    const {isAuthenticated,Logout}=useContext(AuthContext);
    const navigate=useNavigate();

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
        }
    }, []);

    return (

        <div style = {{backgroundColor : '#F1ECEC' ,height:'100vh'}}>
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
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to ="/login/" onClick = {e => logout(e)}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
            </div>







        </div>








    )











}

export default Registration ;