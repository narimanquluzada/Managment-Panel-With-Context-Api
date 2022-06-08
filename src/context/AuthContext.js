import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";



export const Authcontext = createContext();

const AuthcontextProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [isLogin, setIsLogin] = useState(false);
   
   


useEffect( ()=>{
  
    let token = localStorage.getItem('token');
    if(token){
        setUser(token);
        setIsLogin(true);
    }else{
        navigate('/signUp');
    }
}, []);



    // login oldu adam
    const register = (data) => {
        setUser(data.idToken);
        setIsLogin(true);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('local', data.localId);
        navigate('/');

    };
    const login = (data) => {
        setUser(data.idToken);;
        setIsLogin(true);
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('local', data.localId);
        navigate('/');

    };

    const logout = () => {
        
                setIsLogin(false);
                localStorage.removeItem('token');
                localStorage.removeItem('useremail');
                localStorage.removeItem('local');
                navigate('/signUp');
              
          
            
        }
     


  
   const values = {
        user, 
        isLogin,
        register,
        logout,
        login,
       
    }

    return (
        <div>
            <Authcontext.Provider value={values} >
                {children}
            </Authcontext.Provider>
        </div>
    );
}

export default AuthcontextProvider;
