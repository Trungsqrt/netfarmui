import React, { useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./ArticleHandler.module.css";
import "./app.css";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import convertHtmlToReact from "@hedgedoc/html-to-react";
import parse from "html-react-parser";

const url = "https://localhost:44303/api/Article";

function ArticleHandler() {
   const editorRef = useRef();
   const [title, setTitle] = useState("");
   const [category, setCategory] = useState(1);
   const [isPublic, setIsPublic] = useState(true);
   const [clonePost, setClonePost] = useState({});
   const [isClone, setIsClone] = useState(false);
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
         alert("Đăng thành công!");
         setClonePost(postNew);
         setIsClone(true);
      } catch (err) {
         alert("Có lỗi, xin vui lòng thử lại!");
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
                  required
                  min={3}
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
                        "advlist",
                        "lists",
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

         {isClone && (
            <div className={styles.abc}>
               Result
               <h5>{clonePost.title}</h5>
               {/* <p>{convertHtmlToReact(clonePost.content)}</p> */}
               {<p>{parse(clonePost.content)}</p>}
               <p>{clonePost.datePost}</p>
            </div>
         )}
      </div>
   );
}

export default ArticleHandler;
