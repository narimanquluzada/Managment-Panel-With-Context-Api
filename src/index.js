import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import React from "react";
import {createRoot} from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  QueryClient,QueryClientProvider } from 'react-query'
import SignUp from './Auth/SignUp';
import Login from './Auth/signin/Login';
import Navbar from './components/Navbar.js';
import AuthcontextProvider from './context/AuthContext';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import EditProductList from './components/EditProductList';

const queryClient = new QueryClient()
const Index = () => {
    return (
        <div >
             <QueryClientProvider client={queryClient}>
        <Router>
            <AuthcontextProvider>
                <Navbar/>
               <Routes>
               <Route path='/add' element={<AddProduct/>} />
               <Route path='/list' element={<ProductList/>} />
                   <Route path='/signUp' element={<SignUp/>} />
                   <Route path='/signin' element={<Login/>} />
                   <Route path='/' element={<Home/>} />
                   <Route path='/products/:id' element={<EditProductList/>} />
               </Routes>
               </AuthcontextProvider>
        </Router>
        </QueryClientProvider>
        </div>
                 
    );
}

export default Index;



let container  = document.querySelector("#root");
let root = createRoot(container);
root.render( <Index/>)

