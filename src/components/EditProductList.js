import React from 'react';
import { Formik } from 'formik';
import { useParams,useNavigate } from 'react-router-dom';
import { useQuery } from "react-query";
import { getDatawithId,PostProductwithId } from '../api';

const EditProductList = () => {
    const Navigate =useNavigate()
    let {id} = useParams();

    const { isLoading, error, data } = useQuery(['Products', id], () => getDatawithId(id))

    console.log(data);

    if (isLoading) return "Loading...";
  
    if (error) return "An error has occurred: " + error.message;
  
    
    console.log(id);
    return (
        <div className='container'>

              <div>
     <h1> Update </h1>
     <Formik
       initialValues={
           {
            title: data.title,
          context: data.context,
          price: data.price,
          image:data.image,
        
        }
        }
     
       onSubmit={async (values) => {
         const postnewdata = await PostProductwithId({id,values});
         Navigate('/list')
      
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
      
       }) => (
         <form onSubmit={handleSubmit}>
             <label htmlFor="floatingInput">Title</label>
           <input
             name="title"
             className='form-control'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.title}
           />
           {errors.title && touched.title && errors.title}
           <label htmlFor="floatingInput">Context</label>

           <input
             name="context"
             className='form-control my-3'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.context}
           />
           {errors.context && touched.context && errors.context}

           <label htmlFor="floatingInput">Price</label>

           <input
             name="price"
             className='form-control'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.price}
           />
           {errors.price && touched.price && errors.price}

           <img src={values.image} width='100px' className='mt-2' />
       <div>   
            <button className='btn btn-success mt-2' type="submit"  >  Edit </button>
       </div>
         </form>
       )}
     </Formik>
        </div>
        </div>
    );
}

export default EditProductList;
