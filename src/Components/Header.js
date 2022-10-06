import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaCartPlus, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";


function Header() {

  const { cartItems } = useSelector((state) => state.cartReducer);
//const {user} =JSON.parse(localStorage.getItem('currentUser'))
  //console.log(user)

  const logout=()=>{
    localStorage.removeItem("currentUser");
    window.location.reload();
  }

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          FireCommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
          <FaBars  size={25} color="white"/>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav  ms-auto">
            <li className="nav-item active">
              {/* <Link className="nav-link active" aria-current="page" to="/">
               <FaUser /> {user.email.substring(0, user.email.length - 10)} 
              </Link> */}
            </li>
            
            <li className="nav-item">
              {/* <Link className="nav-link" to="/Orders">
                Orders
              </Link> */}
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/Cart">
             <FaCartPlus/> {cartItems.length}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/RegisterPage" onClick={logout}>
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/RegisterPage">
        Register
              </Link>
            </li>
            
            
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
