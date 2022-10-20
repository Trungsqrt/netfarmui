import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./AdminPage.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AdminPage() {
   const [data, setData] = useState([]);
   const navigate = useNavigate();
   const [render, setRender] = useState(true); //true is render User, false is render Posts
   useEffect(() => {
      async function getData() {
         const Dataset = await axios.get(
            // "https://jsonplaceholder.typicode.com/users"
            "https://localhost:44303/api/Users"
         );

         Dataset.data.forEach((item) => {
            const value = {
               id: item.id,
               name: item.fullName,
               phone: item.phone,
               cccd: item.identifyCard,
            };
            setData((prevData) => [...prevData, value]);
         });
      }

      getData();
   }, []);

   const UserHandler = () => {
      setRender(true);
      async function getData() {
         setData([]);
         const Dataset = await axios.get("https://localhost:44303/api/Users");

         Dataset.data.forEach((item) => {
            const value = {
               id: item.id,
               name: item.fullName,
               phone: item.phone,
               cccd: item.identifyCard,
            };
            setData((prevData) => [...prevData, value]);
         });
      }

      getData();
   };

   const PostHandler = () => {
      setRender(false);
      async function getData() {
         setData([]);
         const Dataset = await axios.get("https://localhost:44303/api/Article");

         Dataset.data.forEach((item) => {
            const value = {
               id: item.id,
               title: item.title,
               datePost: item.datePost,
               dateUpdate: item.dateUpdate,
            };
            setData((prevData) => [...prevData, value]);
         });
      }

      getData();
   };

   return (
      <div>
         <Navbar />
         <div className={styles.body}>
            <div className={styles.container}>
               <nav>
                  <ul className={styles.tabList}>
                     <li className={styles.itemList} onClick={UserHandler}>
                        Users
                     </li>
                     <li className={styles.itemList} onClick={PostHandler}>
                        Posts
                     </li>
                  </ul>
               </nav>
               <section className={styles.bodyContainer}>
                  <form
                     className="form-search"
                     style={{
                        alignSelf: "end",
                        marginRight: "105px",
                        marginBottom: "10px",
                        marginTop: "-10px",
                     }}
                  >
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
                  <table>
                     {render ? (
                        <tbody>
                           <tr>
                              <th className={styles.th1}>Id</th>
                              <th className={styles.th1}>Tên</th>
                              <th className={styles.th1}>Số điện thoại</th>
                              <th className={styles.th1}>Email</th>
                              <th className={styles.th1}>CCCD</th>
                           </tr>
                           {data.map((item, index) => (
                              <tr key={index}>
                                 <th>{item.id}</th>
                                 <th>{item.name}</th>
                                 <th>{item.user}</th>
                                 <th>{item.email}</th>
                                 <th>{item.cccd}</th>
                                 <th style={{ cursor: "pointer" }}>&times;</th>
                              </tr>
                           ))}
                        </tbody>
                     ) : (
                        <tbody>
                           <tr>
                              <th className={styles.th1}>Id</th>
                              <th className={styles.th1}>Tiêu đề</th>
                              <th className={styles.th1}>Ngày đăng</th>
                              <th className={styles.th1}>Ngày cập nhật</th>
                           </tr>
                           {data.map((item, index) => (
                              <tr key={index}>
                                 <th>{item.id}</th>
                                 <th>{item.title}</th>
                                 <th>{item.datePost}</th>
                                 <th>{item.dateUpdate}</th>
                                 <th style={{ cursor: "pointer" }}>&times;</th>
                              </tr>
                           ))}
                        </tbody>
                     )}
                  </table>
               </section>
            </div>
         </div>
      </div>
   );
}

export default AdminPage;
