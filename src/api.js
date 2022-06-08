import axios from "axios";


export const registerUser = async (yeniUser)=>{
 const data = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUzoww3SMteRi0DbtEasSpgNEmue7-nIQ", 
    {email : yeniUser.email, password : yeniUser.password, returnSecureToken : true}
    );
    return data.data;
}
export const LoginUser = async (oldUser)=>{
    const data = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUzoww3SMteRi0DbtEasSpgNEmue7-nIQ", 
       {email : oldUser.email, password : oldUser.password, returnSecureToken : true}
       );
       return data.data;
   }
export const Picture = async ()=>{
    const response = await axios.get("https://source.unsplash.com/random/900×700/?coat");
       return response.request.responseURL;
   }



export const PostProduct = async (product)=>{
    const data= await axios.post( 'https://react-project-50ee5-default-rtdb.firebaseio.com/products.json', 
    product 
       );

       return data;
   }
   export const getData = async ()=>{
    const {data}= await axios.get( 'https://react-project-50ee5-default-rtdb.firebaseio.com/products.json');
const dataList=[]
    for(let key in data){
data[key].id=key
dataList.push(data[key])
    }
    console.log(dataList);
   const UserDataList = dataList.filter((item)=>{
        
        return item.user_Id == localStorage.getItem('local')
    })
    console.log(UserDataList);
  
    return UserDataList;
 
      
   }
   

   export const getDatawithId = async (id)=>{
    const {data}= await axios.get( `https://react-project-50ee5-default-rtdb.firebaseio.com/products/${id}.json`);

    return data;
 
      
   }

   
export const PostProductwithId = async (product)=>{
    const data= await axios.put( `https://react-project-50ee5-default-rtdb.firebaseio.com/${product.id}.json`, 
    product.values
       );

       return data;
   }


   export const DeleteProduct = async (id)=>{
    const data= await axios.delete( `https://react-project-50ee5-default-rtdb.firebaseio.com/products/${id}.json`);

       return data;
   }


   export const GetCategory = async () =>{
    const {data} = await axios.get('https://react-project-50ee5-default-rtdb.firebaseio.com/category.json');
    const categoryList=[]
 for(let key in data){
data[key].id=key
categoryList.push(data[key])
 }
    return categoryList;
}

   


