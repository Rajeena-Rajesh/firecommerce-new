import "./App.css";
import CartPage from "./Pages/CartPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProductInfo from "./Pages/ProductInfo";
import RegisterPage from "./Pages/RegisterPage";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import './stylesheets/layout.css'
import './stylesheets/products.css'
import './stylesheets/authentication.css'
import OrdersPage from "./Pages/OrdersPage";
import AdminPage from "./Pages/AdminPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Pages/Login";
function App() {
  return (
    <div className="App">
       <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/Cart" exact element={<CartPage />} />
          <Route path="/Orders" exact element={<OrdersPage />} />
          <Route path="/Admin" exact element={<AdminPage />} />
          <Route path="/Login" exact element={<LoginPage />} />
          <Route path="/LoginPage" exact element={<Login/>} />
          <Route path="/RegisterPage" exact element={<RegisterPage />} />
          <Route path="/ProductInfo/:productid" exact element={<ProductInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
