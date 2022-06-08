import {useContext} from 'react'
import { useFormik } from 'formik';
import { LoginUser } from '../../api';
import { Authcontext } from '../../context/AuthContext';


const Login = () => {
    const {login} = useContext(Authcontext)
    const formik = useFormik({
      initialValues: {
        email: '',
        password : "",
     
  
      },
 
      onSubmit: async (values, bags) => {
          console.log(values);
     try{
      let responseData = await LoginUser(values);
      login(responseData)
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
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
  
              
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
             
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign in
              </button>
             
            </form>
          </main>
        </div>
                     </div>
  
      </div>
    );
}

export default Login