import React, { useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./ArticleHandler.module.css";
import "./app.css";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const url = "https://localhost:44303/api/Article";

function ArticleHandler() {
   const editorRef = useRef();
   const [title, setTitle] = useState("");
   const [category, setCategory] = useState(1);
   const [isPublic, setIsPublic] = useState(true);

   const onClickHandler = () => {
      const postNew = {
         title: title,
         aCategoryId: category,
         status: isPublic,
         content: editorRef.current.getContent(),
         cmtStatus: false,
         datePost: new Date().toISOString(),
         dateUpdate: null,
      };

      try {
         axios.post(url, postNew);
      } catch (err) {
         console.warn(err.response);
      }
   };

   return (
      <div>
         <Navbar />
         <div className={styles.container}>
            <div className={styles.label}>Tạo lịch thời vụ</div>
            <div className={styles.textContainer}>
               <p>Tiêu đề</p>
               <input
                  value={title}
                  placeholder="Nhập tiêu đề..."
                  className={styles.input}
                  onChange={(e) => setTitle(e.target.value)}
               ></input>
               <div className={styles.comboboxContainer}>
                  <div>
                     <p>Danh mục</p>
                     <select
                        name="category"
                        id="category"
                        className={styles.combobox}
                        onChange={(e) => setCategory(Number(e.target.value))}
                        value={category}
                     >
                        <option value="1">Chung</option>
                        <option value="2">Thông báo</option>
                     </select>
                  </div>
                  <button
                     type="button"
                     onClick={onClickHandler}
                     className={styles.button}
                  >
                     Đăng
                  </button>
                  <div>
                     <p>Công khai</p>
                     <select
                        name="category"
                        id="category"
                        className={styles.combobox}
                        onChange={(e) => setIsPublic(Boolean(e.target.value))}
                        value={isPublic}
                     >
                        <option value="1">Công khai</option>
                        <option value="0">Không</option>
                     </select>
                  </div>
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

export default ArticleHandler;
