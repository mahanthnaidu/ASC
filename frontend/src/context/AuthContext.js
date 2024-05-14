import { useState, useEffect, createContext } from 'react';
// import Router, { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated,setIsAuthenticated]=useState(false)

    const Login=async(id,password)=>{
        try{
            const body = {ID:id, hashed_password:password}
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials:'include',
                body: JSON.stringify(body)
            });

            const parseRes = await response.json() ;
            if(parseRes.message  === "Credentials are correct"){
                setIsAuthenticated(true);
                sessionStorage.setItem("user", JSON.stringify(id));
                window.location = "/home/" ;
                
            }
            else{
                setIsAuthenticated(false);
                window.location = "/login/" ;
                // toast.error(parseRes) ;
            }
        }catch(error){
            console.error(error.message);
        }
    }

    const Logout=()=>{
        // localStorage.removeItem("token") ;
        sessionStorage.removeItem("user");
        setIsAuthenticated(false)
    }

    useEffect(()=>{
        if(sessionStorage.getItem("user")){
            setIsAuthenticated(true) ;
        }
    },[])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                Login,
                Logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;