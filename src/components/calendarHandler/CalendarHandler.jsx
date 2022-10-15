import React, { useRef, useState } from "react";
import styles from "./CalendarHandler.module.css";
import Navbar from "../navbar/Navbar";
import { Editor } from "@tinymce/tinymce-react";

function CalendarHandler() {
   const [start, setStart] = useState("");
   const [end, setEnd] = useState("");
   const [category, setCategory] = useState(0);
   const [title, setTitle] = useState("");

   const editorRef = useRef();
   const onClickHandler = () => {
      console.log({
         start: start,
         end: end,
         category: category,
         content: editorRef.current.getContent(),
         title: title,
      });
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
               ></input>
               <div className={styles.comboboxContainer}>
                  <div>
                     <p>Bắt đầu</p>
                     <input
                        type="date"
                        id="start"
                        className={styles.combobox}
                        onChange={(e) => setStart(e.target.value)}
                        value={start}
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
                        <option value="0">Nông sản</option>
                        <option value="1">Vật nuôi</option>
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
                  }}
               />
            </div>
         </div>
      </div>
   );
}

export default CalendarHandler;
