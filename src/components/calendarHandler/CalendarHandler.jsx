import React, { useRef, useState } from "react";
import styles from "./CalendarHandler.module.css";
import Navbar from "../navbar/Navbar";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect } from "react";

const url = "https://localhost:44303/api/Schedule";

function CalendarHandler() {
   const [start, setStart] = useState("");
   const [end, setEnd] = useState("");
   const [category, setCategory] = useState(3);
   const [title, setTitle] = useState("");
   const [scheduleId, setScheduledId] = useState([]);
   const [scheduleName, setScheduledName] = useState([]);
   useEffect(() => {
      axios.get(url).then((response) => {
         const data = response.data;
         data.forEach((item) => {
            setScheduledId((prevStateId) => [...prevStateId, item.id]);
            setScheduledName((prevStateName) => [...prevStateName, item.name]);
         });
      });
   }, []);

   const editorRef = useRef();
   const onClickHandler = () => {
      const scheduleNew = {
         start: new Date(start).toISOString(),
         end: new Date(end).toISOString(),
         category: category,
         content: editorRef.current.getContent(),
         title: title,
      };

      console.log(scheduleNew);

      // try {
      //    axios.post(url, scheduleNew);
      // } catch (err) {
      //    console.warn(err.response);
      // }
   };

   return (
      <div>
         <Navbar />
         <div className={styles.container}>
            <div className={styles.label}>Tạo lịch thời vụ</div>
            <div className={styles.textContainer}>
               <p>Tiêu đề</p>
               <input
                  placeholder="Nhập tiêu đề..."
                  className={styles.input}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type=""
               ></input>

               <div className={styles.comboboxContainer} lang="vi">
                  <div>
                     <p>Bắt đầu</p>
                     <input
                        type="date"
                        id="start"
                        className={styles.combobox}
                        onChange={(e) => setStart(e.target.value)}
                        value={start}
                        lang="vi"
                     ></input>
                  </div>

                  <div>
                     <p>Kết thúc</p>
                     <input
                        type="date"
                        id="start"
                        className={styles.combobox}
                        onChange={(e) => setEnd(e.target.value)}
                        value={end}
                     ></input>
                  </div>
                  <div>
                     <p>Loại sản phẩm</p>
                     <select
                        name="category"
                        id="category"
                        className={styles.cateBox}
                        onChange={(e) => setCategory(Number(e.target.value))}
                        value={category}
                     >
                        {scheduleId.map((item, index) => (
                           <option value={item} key={index}>
                              {scheduleName[index]}
                           </option>
                        ))}
                     </select>
                  </div>
                  <button
                     type="button"
                     onClick={onClickHandler}
                     className={styles.button}
                  >
                     Đăng
                  </button>
               </div>
               <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                     plugins: [
                        "image",
                        "code",
                        "table",
                        "link",
                        "media",
                        "codesample",
                     ],
                     toolbar:
                        "image | link | undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
                     menubar: false,
                     branding: false,
                     init_instance_callback: function (editor) {
                        var freeTiny = document.querySelector(
                           ".tox .tox-notification--in"
                        );
                        freeTiny.style.display = "none";
                     },
                  }}
               />
            </div>
         </div>
      </div>
   );
}

export default CalendarHandler;
