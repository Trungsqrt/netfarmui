import React from "react";
import { Slide } from "react-slideshow-image";
import slideImages from "./images.js";
import styles from "./Slider.module.css";
const Slider = () => {
   return (
      <div>
         <div>
            <div className={styles.container}>
               <Slide easing="ease">
                  {slideImages.map((slide, index) => {
                     return (
                        <div className={styles.slide} key={slide}>
                           <div
                              style={{
                                 backgroundImage: `url(${slideImages[index]})`,
                              }}
                           >
                              <span>
                                 NETFARM - Sản xuất vụ mùa đảm bảo trong khung
                                 thời vụ tốt nhất
                              </span>
                           </div>
                        </div>
                     );
                  })}
               </Slide>
            </div>
         </div>
      </div>
   );
};

export default Slider;
