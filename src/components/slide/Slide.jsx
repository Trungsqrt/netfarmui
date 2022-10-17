import styles from "./Slide.module.css";
import slide1 from "../../assets/image/slide1.png";

function Slide() {
   return (
      <div>
         <div className={styles.slide_component}>
            <div className="slide-container">
               <img
                  className={styles.slide_image}
                  src={slide1}
                  alt="nguoi nong dan dang cay lua"
               />{" "}
            </div>
            <div className={styles.content}>
               <button className={`${styles.prev} ${styles.direction_button}`}>
                  {"<"}
               </button>
               <div className={styles.description}>
                  <h4
                     style={{
                        fontSize: 30 + "px",
                        color: "white",
                        paddingBottom: 50 + "px",
                     }}
                  >
                     Sản xuất vụ mùa đảm bảo trong khung thời vụ tốt nhất
                  </h4>
                  <p
                     style={{
                        fontSize: 20 + "px",
                        color: "white",
                        paddingBottom: 20 + "px",
                     }}
                  >
                     Đến thời điểm này, gần 80% diện tích lúa mùa của tỉnh đã
                     được gieo cấy xong, đảm bảo khung thời vụ tốt nhất tạo điều
                     kiện để cấy lúa sinh trưởng, phát triển thuận lợi.
                  </p>
                  <button className={styles.discover_button}>
                     Discover More
                  </button>
               </div>
               <button className={`${styles.next} ${styles.direction_button}`}>
                  {">"}
               </button>
            </div>
         </div>
         <div className={styles.content}>
            <button className={`${styles.prev} ${styles.direction_button}`}>
               {"<"}
            </button>
            <div className={styles.description}>
               <h4
                  style={{
                     fontSize: 30 + "px",
                     color: "white",
                     paddingBottom: 50 + "px",
                  }}
               >
                  Sản xuất vụ mùa đảm bảo trong khung thời vụ tốt nhất
               </h4>
               <p
                  style={{
                     fontSize: 20 + "px",
                     color: "white",
                     paddingBottom: 20 + "px",
                  }}
               >
                  Đến thời điểm này, gần 80% diện tích lúa mùa của tỉnh đã được
                  gieo cấy xong, đảm bảo khung thời vụ tốt nhất tạo điều kiện để
                  cấy lúa sinh trưởng, phát triển thuận lợi.
               </p>
               <button className={styles.discover_button}>Discover More</button>
            </div>
            <button className={`${styles.next} ${styles.direction_button}`}>
               {">"}
            </button>
         </div>
      </div>
   );
}

export default Slide;
