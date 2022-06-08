import React, {useContext} from 'react';
import { useFormik } from 'formik';
import validationSchema from './validation'
import {registerUser} from '../api'
import {Authcontext} from '../context/AuthContext.js'
import '../App.css'

const SignUp = () => {
  const {register} = useContext(Authcontext)
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password : "",
      passwordConfirm:"",

    },
    validationSchema,
    onSubmit: async (values, bags) => {
   try{
    let resrponseData = await registerUser(values);
    register(resrponseData);
   }catch(e){
     console.log(e);
      bags.setErrors({ general: 'An error occurred'});
   }
  localStorage.setItem("useremail",values.email)
    },
  });

  return (
    <div>

<div className="row pt-5">
  
<div className="col-6 offset-3">
{formik.errors.general && (
                <div class="alert alert-danger" role="alert">
                  {formik.errors.general}
                </div>
              )}
        <main className="form-signin">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

            <div className="form-floating">
            <input
                type="text"
                name="firstName"
                className={`form-control  ${formik.touched.firstName && formik.errors.firstName && 'is-invalid' }  `}
                onChange={formik.handleChange}
                onBlur= {formik.handleBlur}
                value={formik.values.firstName}
                id='firstName'
              />
                 <label htmlFor="firstName" className="form-label">FirstName</label>
                 {formik.errors.firstName &&formik.touched.firstName && <span className='error'>{formik.errors.firstName}</span>}
              </div>
              <div className="form-floating">
              
                  <input
                type="text"
                name="lastName"
                className={`form-control my-3  ${formik.touched.lastName && formik.errors.lastName && 'is-invalid' }  `}
                onChange={formik.handleChange}
                onBlur= {formik.handleBlur}
                value={formik.values.lastName}
                id='lastName'
              />
                 <label htmlFor="lastName" className="form-label">LastName</label>
                 {formik.errors.lastName &&formik.touched.lastName && <span className='error'>{formik.errors.lastName}</span>}
              </div>
              <div className="form-floating">
              <input
                type="email"
                name="email"
                className={`form-control my-3  ${formik.touched.email && formik.errors.email && 'is-invalid' }  `}
                onChange={formik.handleChange}
                onBlur= {formik.handleBlur}
                value={formik.values.email}
                id="email"
              />
              <label htmlFor="email" className="form-label">Email</label>
              {formik.errors.email &&formik.touched.email && <span className='error'>{formik.errors.email}</span>}
            </div>
            <div className="form-floating">
              <input
                type="password"
                name="password"
                className={`form-control my-3  ${formik.touched.password && formik.errors.password && 'is-invalid' }  `}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="password"
              />
             <label htmlFor="password" className="form-label">Password</label>
             {formik.errors.password &&formik.touched.password && <span className='error'>{formik.errors.password}</span>}
        
            </div>
            <div className="form-floating">
        <input name="passwordConfirm" value={formik.values.passwordConfirm}  onChange={formik.handleChange} onBlur={formik.handleBlur}  type="password" className="form-control" />
        <label htmlFor="floatingPassword">Confirm Password</label>
        {formik.errors.passwordConfirm &&formik.touched.passwordConfirm && <span className='error'>{formik.errors.passwordConfirm}</span>}
      </div>

            <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">
              Sign up
            </button>
           
          </form>
        </main>
      </div>
                   </div>

    </div>
  );
}

export default SignUp;
