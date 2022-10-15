import React from "react";
// import styles from "./Navbar.module.css";
import "./Navbar.css";
import navbarImage from "../../assets/image/logonetfarm.png";
function Navbar() {
   return (
      <div>
         <div className="container-navbar">
            <div className="info-header">
               Welcome to NetFarm Web Service
               <div className="info">
                  <i className="fa-solid fa-sun"></i>
                  <span>Da Nang, Da Nang 30°C</span>
               </div>
               <div className="info">
                  <i className="fa-solid fa-envelope"></i>
                  <span>needhelp@company.com</span>
               </div>
               <div className="info">
                  <i className="fa-solid fa-clock"></i>
                  <span>Mon - Sat 8:00 - 6:30, Sunday</span>
               </div>
            </div>
            <nav className="navbar">
               <a href="/#">
                  <img className="logo" src={navbarImage} alt="logo"></img>
               </a>
               <ul className="navbarTask">
                  <li>
                     <a href="/#">Home</a>
                  </li>
                  <li>
                     <a href="/#">About</a>
                  </li>
                  <li>
                     <a href="/#">Blog</a>
                  </li>
                  <li>
                     <a href="/#">Buying</a>
                  </li>
               </ul>
               <form className="form-search">
                  <input
                     type="text"
                     className="search-input"
                     placeholder="Search"
                     name="search"
                  ></input>
                  <button className="btn-search">
                     <i className="fa-solid fa-magnifying-glass icon-search"></i>
                  </button>
               </form>
               <div className="calling-info">
                  <i className="fa-solid fa-phone-volume phone"></i>
                  <div className="calling">
                     <p className="info-detail">Call Anytime</p>
                     <p className="info-detail">02 123 888 000</p>
                  </div>
               </div>
               <div className="setting-group">
                  <button className="button-setting">
                     <i className="fa-solid fa-bell settings"></i>
                  </button>
                  <button className="button-setting">
                     <i className="fa-solid fa-bars settings"></i>
                  </button>
               </div>
            </nav>
         </div>
      </div>
   );
}

export default Navbar;
