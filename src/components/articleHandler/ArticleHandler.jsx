import React, { useState, useRef } from "react";
import Navbar from "../navbar/Navbar";
import styles from "./ArticleHandler.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./app.css";
import { Editor } from "@tinymce/tinymce-react";

function ArticleHandler() {
   const [value, setValue] = useState("");
   const editorRef = useRef();
   console.log(value);
   const onClickHandler = () => {
      console.log(editorRef.current.getContent());
   };

   return (
      <div>
         <div className={styles.container}>
            <Navbar />
            <div className={styles.label}>Đăng bài</div>
            <div className={styles.textContainer}>
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
            <button type="button" onClick={onClickHandler}>
               Đăng
            </button>
         </div>
      </div>
   );
}

export default ArticleHandler;
