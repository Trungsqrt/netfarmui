import React, { useRef, useState } from "react";
import styles from "./Editor.module.css";
import JoditEditor from "jodit-react";
function Editor() {
   const editor = useRef(null);
   const [value, setValue] = useState("");
   return (
      <div>
         <div className={styles.container}>
            <h3 className={styles.label}>Đăng Bài</h3>
            <div className={styles.titleForm}>
               <h1 className={styles.labelTitle}>Tiêu đề</h1>
               <input
                  type="text"
                  className={styles.titleInput}
                  placeholder="Nhập tiêu đề"
               />
               <section className={styles.mainEditor}>
                  <JoditEditor
                     ref={editor}
                     onChange={(content) => setValue(content)}
                  />
                  <br />
                  <div>{value}</div>
               </section>
            </div>
         </div>
      </div>
   );
}

export default Editor;
