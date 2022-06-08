import React,{useState,useContext} from 'react'
import {useFormik } from 'formik';
import swal from "sweetalert";
import validationSchema from './AddProductValidation'
import {PostProduct,Picture} from '../api'
import DefaultImage from '././images/default_image.jpg'
import Loading from '././images/Loading.gif'
import {useNavigate} from 'react-router-dom'
import {Authcontext} from '../context/AuthContext.js'
import { GetCategory } from '../api';
import { useQuery } from 'react-query';


function AddProduct() {
  const {user} = useContext(Authcontext)

  const Navigate =useNavigate()

  const [picture,setPicture] =useState(DefaultImage)
  const [viewDownCategory,setViewDownCategory] =useState('')
  

 
  const ClickPicture = async () =>{
    setPicture(Loading)
    let data = await Picture();
  values.image = data;
  setPicture(data);
  }

  const userId=localStorage.getItem('local'); 
  
 const today = new Date(),
  date ='Baki' + ',' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ',' + today.getHours()  + ':' +today.getMinutes();

    const {handleSubmit,handleChange,handleBlur ,values,touched,errors} = useFormik({
 
        initialValues: {
          title: '',
          context: '',
          mainCategory:'',
          downCategory:'',
          price: '',
          image:picture,
          status:0,
          about:'',
          user_Id: localStorage.getItem('local'),
          date:date,
          favoriteProduct:0,
         
        },
        validationSchema,
    
        onSubmit: async (values,{resetForm}) => {

       const postData = await PostProduct(values)
         resetForm({values:""})
         swal({
          title: "Ugurlu emeliyyat!",
          text: "Mehsulunuz ugurla elave edildi. ",
          icon: "success",
          button: "Ok!",
        });
         
         Navigate('/list')
    
        },
      });

      const { isLoading, error, data } = useQuery("repoData", GetCategory);
      console.log(data);
      if (isLoading) return "Loading...";
    
      if (error) return "An error has occurred: " + error.message;

      const Ustkateqoriya =data.filter((item)=>{
        return item.topMenu ==0
      })
     
     const DownCategoryfunction = (e)=>{
     
     const AltKateqoriya=data.filter((item)=>{

      return item.topMenu ==e.target.value

     })
     setViewDownCategory(AltKateqoriya)

     }

     
  return (
    <div>
         <div className='container'>
      <div className="row">

        <div className="col-6 offset-3">


        <main className="form-signin">
      <form onSubmit={handleSubmit}>
        
        <h1 className="h3 mb-3">Add Product</h1>

        <div>
        <select className="form-control " 
                   name='mainCategory'
                    onChange={handleChange}
                    onInput ={DownCategoryfunction}
                    value={values.mainCategory}
                    >
                    <option selected >Kateqoriya secin...</option>
                    {Ustkateqoriya.map((item,i)=>(
                        <option value={item.id} key={i}>{item.category}</option>
                    ))}
                  </select>
        </div>
       {viewDownCategory &&
        <div className='mt-4'>
        <select className="form-control " 
        name='downCategory'
        value={values.downCategory}

                    onChange={handleChange}>
                        <option selected >Kateqoriya secin...</option>
                    {viewDownCategory.map((item,i)=>(
                        <option value={item.id} key={i}>{item.category}</option>
                    ))}
                  </select>
        </div>
       
       }
        <div className="form-floating mt-4">
          <input name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} type="text" className="form-control"  />
          <label htmlFor="floatingInput">Title</label>
          {errors.title &&touched.title && <span className='error'>{errors.title}</span>}
        </div>
      
        <div className="form-floating mt-2">
          <input name='context' value={values.lastName} onChange={handleChange} onBlur={handleBlur} type="text" className="form-control"  />
          <label htmlFor="floatingInput">Context</label>
          {errors.context &&touched.context && <span className='error'>{errors.context}</span>}
        </div>
    
    
        <div className="form-floating mt-2">
          <input name='price' value={values.email} onChange={handleChange} onBlur={handleBlur} type="number" className="form-control"  />
          <label htmlFor="floatingInput">Price</label>
          {errors.price &&touched.price && <span className='error'>{errors.price}</span>}
        </div>
       
        <div className="form-floating d-flex justify-content-between my-3">
       <div>   <button className='btn btn-warning' onClick={ClickPicture} type ="button">Random Picture</button></div>
        
        <div>  <img src={picture} width='100px' alt="" /></div>
        </div>
        

  
      
        <button className="w-100 btn btn-lg btn-primary" type="submit">Add Product</button>
      
      </form>
    </main>
    
    








        </div>





      </div>
      
  
        
      
    </div>
    </div>
  )
}

export default AddProduct