import React from "react";
import styles from "./NotificationDetail.module.css";

function NotificationDetail() {
   return (
      <div className={styles.notificationContainer}>
         <section>
            <h3
               style={{
                  fontWeight: "bold",
                  margin: "5px",
                  textAlign: "center",
               }}
            >
               Thông báo
            </h3>
            <section className={styles.itemContainer}>
               <section className={styles.itemWrap}>
                  <section className={`${styles.item} ${styles.nonRead}`}>
                     <p>
                        <i>Nguyễn Văn A</i> đã trả lời bình luận của bạn trong
                        bài viết <strong>Cây trồng vào mùa xuân</strong>
                     </p>
                  </section>
               </section>
               <section className={`styles.itemWrap`}>
                  <section className={`${styles.item}`}>
                     <p>
                        Phan Văn B đã trả lời bình luận của bạn trong bài viết{" "}
                        <strong>Cây trồng vào mùa hạ</strong>
                     </p>
                  </section>
               </section>
               <section className={styles.itemWrap}>
                  <section className={`${styles.item}`}>
                     <p>
                        Đỗ Thành C đã trả lời bình luận của bạn trong bài viết{" "}
                        <strong>Cây trồng vào mùa thu</strong>
                     </p>
                  </section>
               </section>
               <section className={styles.itemWrap}>
                  <section className={`${styles.item}`}>
                     <p>
                        Đoàn Văn D đã trả lời bình luận của bạn trong bài viết{" "}
                        <strong>Cây trồng vào mùa đông</strong>
                     </p>
                  </section>
               </section>
               <section className={styles.itemWrap}>
                  <section className={`${styles.item}`}>
                     <p>
                        Lê Văn E đã trả lời bình luận của bạn trong bài viết{" "}
                        <strong>Cây trồng bốn mùa</strong>
                     </p>
                  </section>
               </section>
               <section className={styles.more}>
                  <p
                     style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        cursor: "pointer",
                     }}
                  >
                     Xem thêm
                  </p>
               </section>
            </section>
         </section>
      </div>
   );
}

export default NotificationDetail;
