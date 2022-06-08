import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {Authcontext} from '../context/AuthContext.js'
import User from '././images/user.jpg'



const Navbar = () => {
  const {isLogin, logout,} = useContext(Authcontext);
    return (
        <div >
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
  <div className="container-fluid ">
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
     
      <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        

    {
      isLogin &&
      <div>      <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to="/add"> Add Product</NavLink>
    </li>
    

     <li className="nav-item">
<NavLink className="nav-link" aria-current="page" to="/list">Product List</NavLink>
</li></div>


    }
      
      </ul>

      <div className='d-flex'>
     
        { 
        isLogin  &&  <div className='d-flex align-items-center'>
             
         <div className='text-align-center'>
         <NavLink className="nav-link" aria-current="page" to="/list"><img src={User} style={{width:30}}/></NavLink>
            <h6 style={{color:"white"}}>{localStorage.getItem("useremail")}</h6>
         </div>
          <div><button className='btn btn-danger btn-sm ms-3' onClick={logout} >Log Out</button></div>
      
      
        </div>
        }
        
       
          {
          !isLogin &&
           <div className='d-flex'>
             <NavLink className="nav-link" aria-current="page" to="/signUp"><button className='btn btn-primary'>Register</button></NavLink>
           <NavLink className="nav-link" aria-current="page" to="/signin"><button className='btn btn-success'>Login</button></NavLink>
           </div>
          }
         
          
     
      
        </div>
    </div>
  </div>
</nav>
        </div>
    );
}

export default Navbar;



