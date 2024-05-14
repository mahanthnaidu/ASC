import React, {useContext,useEffect, useState} from "react";
// import {toast} from 'react-toastify' ;
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Assets/Login.css"
import TypingEffect from "./TypingEffect";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import TypingEffect from './TypingEffect';

const Login  = () => {

    // const [inputs, setInputs] = useState({
    //     id: "",
    //     password: ""
    // }) ;
    const [id,setId]=useState("")
    const [password,setPassword]=useState("")

    const {isAuthenticated,Login}=useContext(AuthContext)
    const navigate=useNavigate();
    
    const onSubmitForm = async e => {
        e.preventDefault()
        Login(id,password)
    }


    useEffect(()=>{
        if(isAuthenticated){
            navigate("/home");
        }
    },[isAuthenticated])

    return (
        <div style = {{backgroundColor : '#C0C0C0',height:'100vh'}}>
        <div style={{ textAlign: 'center', fontWeight: 'bold', color : 'red'}}>
            <TypingEffect text = "Welcome to IITB ASC App"/>
        </div>
        <div>
        <form className="form-container" onSubmit={onSubmitForm}>
        <h1 className="form-title">Login</h1>
        <div className="form-group">
        <label htmlFor="username">UserID:</label>
        <input type="text" id="username" value={id} onChange={(e) => setId(e.target.value)} className="form-input"/>
        </div>
        <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input"/>
        </div> 
        <button type="submit" className="form-button">Login</button>                      
        </form>
        </div>
        </div>
    );
}

export default Login ; 