import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./AdminPage.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AdminPage() {
   const [data, setData] = useState([]);
   const navigate = useNavigate();
   useEffect(() => {
      async function getData() {
         const Dataset = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
         );

         Dataset.data.forEach((item) => {
            const value = {
               id: item.id,
               name: item.name,
               user: item.username,
               email: item.email,
            };
            setData((prevData) => [...prevData, value]);
         });
      }

      getData();
   }, []);

   const UserHandler = () => {
      async function getData() {
         setData([]);
         const Dataset = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
         );

         Dataset.data.forEach((item) => {
            const value = {
               id: item.id,
               name: item.name,
               user: item.username,
               email: item.email,
            };
            setData((prevData) => [...prevData, value]);
         });
      }

      getData();
   };

   const PostHandler = () => {
      async function getData() {
         setData([]);
         const Dataset = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
         );

         Dataset.data.forEach((item) => {
            const value = {
               id: item.id,
               name: item.name,
               user: item.username,
               email: item.email,
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
                  <table>
                     <tbody>
                        <tr>
                           <th className={styles.th1}>Id</th>
                           <th className={styles.th1}>Name</th>
                           <th className={styles.th1}>Username</th>
                           <th className={styles.th1}>Email</th>
                           <th className={styles.th1}></th>
                        </tr>
                        {data.map((item, index) => (
                           <tr key={index}>
                              <th>{item.id}</th>
                              <th>{item.name}</th>
                              <th>{item.user}</th>
                              <th>{item.email}</th>
                              <th style={{ cursor: "pointer" }}>&times;</th>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </section>
            </div>
         </div>
      </div>
   );
}

export default AdminPage;
