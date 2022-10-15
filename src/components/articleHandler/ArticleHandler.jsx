import React, { useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./ArticleHandler.module.css";
import "./app.css";
import { Editor } from "@tinymce/tinymce-react";

function ArticleHandler() {
   const editorRef = useRef();
   const [title, setTitle] = useState("");
   const [category, setCategory] = useState(0);
   const [isPublic, setIsPublic] = useState("");
   console.log(isPublic);
   const onClickHandler = () => {
      console.log({
         title: title,
         category: category,
         isPublic: isPublic,
         content: editorRef.current.getContent(),
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
                        <option value="0">Chung</option>
                        <option value="1">Thông báo</option>
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
                        onChange={(e) => setIsPublic(Number(e.target.value))}
                        value={isPublic}
                     >
                        <option value="0">Công khai</option>
                        <option value="1">Không</option>
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
