import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import "./Navbar.css";
import navbarImage from "../../assets/image/logonetfarm.png";
import axios from "axios";
import NotificationDetail from "../detailBar/notificationDetail/NotificationDetail";

function Navbar() {
   const url =
      "https://api.openweathermap.org/data/2.5/weather?q=danang&appid=69424b95ee94abbbe370a393829f81e3";

   const [data, setData] = useState(null);
   const [error, setError] = useState("");
   const [loaded, setLoaded] = useState(false);
   const [iconState, setIconState] = useState("");
   const [timee, setTimee] = useState();
   const [notification, setNotification] = useState(false);
   let icon;
   useEffect(() => {
      axios.get(url).then((response) => {
         const res = response.data;

         const result = res.main.temp - 273.15;
         setData(Math.round(result));
         icon = [...res.weather];
         icon = icon[0].icon;
         setIconState(icon);
      });
   }, []);

   function showNotificationHandler() {
      notification ? setNotification(false) : setNotification(true);
   }

   function hideNotificationHandler() {
      setNotification(false);
   }

   console.log(notification);
   return (
      <div style={{ backgroundColor: "white" }}>
         <div className="container-navbar">
            <div className="info-header">
               Welcome to NetFarm Web Service
               <div className="info">
                  {/* <i className="fa-solid fa-sun"></i> */}
                  <img
                     src={`http://openweathermap.org/img/wn/${iconState}@2x.png`}
                     alt=""
                     className={styles.iconWeather}
                  />
                  <span className={styles.temperature}>Da Nang, {data}°C</span>
               </div>
               <div className="info">
                  <i className="fa-solid fa-envelope"></i>
                  <span>needhelp@company.com</span>
               </div>
               <div className="info">
                  <i className="fa-solid fa-clock"></i>
                  <span>Mon - Sat 8:00 - 18:30, Sunday</span>
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
                  <section className={styles.notificationBox}>
                     <button
                        className="button-setting"
                        onClick={showNotificationHandler}
                        onBlur={hideNotificationHandler}
                     >
                        <i className="fa-solid fa-bell settings"></i>
                     </button>
                     {notification && <NotificationDetail />}
                  </section>
                  <section>
                     <button className="button-setting">
                        <i className="fa-solid fa-bars settings"></i>
                     </button>
                  </section>
               </div>
            </nav>
         </div>
      </div>
   );
}

export default Navbar;
