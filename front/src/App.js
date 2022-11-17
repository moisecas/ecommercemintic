
import './App.css';
import React, {useEffect} from 'react';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Productosadmin from './components/Productosadmin';
//import Productoscliente from './components/Productoscliente';
import Ventasadmin from './components/Ventasadmin';
import Home from './components/Home';
import { ProductDetails } from './components/products/ProductDetails';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import {Dashboard} from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/newProduct';
import UserList from './components/admin/UserList';
import Cart from './components/cart/Cart';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from "./store"
import { Profile } from './components/user/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { UpdateProfile} from "./components/user/UpdateProfile"
import { UpdatePassword } from './components/user/UpdatePassword';
import { ForgotPassword } from "./components/user/ForgotPassword.js"
import { NewPassword } from './components/user/NewPassword';

function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
   },[])
  return (
    <Router>
      <div className="App">
      
      <Header/>
      {/* Navegacion */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/productosadmin" element={<Productosadmin/>}/>
        <Route path="/productoscliente" element={<Home/>}/>
        <Route path="/ventasadmin" element={<Ventasadmin/>}/> 
        <Route path="/producto/:id" element={<ProductDetails/>}/>
        <Route path="/productList" element={<ProductList />}/>
        <Route path="/nuevoProducto" element={<NewProduct />}/>     
        <Route path="/userlist" element={<UserList />}/>
        <Route path="/search/:keyword" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/yo" element={<Profile />}/>
        <Route path="/yo/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<NewPassword />} />


        {/*Ruta protegida*/}
        <Route path="/dashboard"
          element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />

          <Route path="*" element={<h1>404: Not Found</h1>} />
        
        
        
        
      </Routes>
      
      <Footer/>

    </div>

    </Router>
  );
}

export default App;
 