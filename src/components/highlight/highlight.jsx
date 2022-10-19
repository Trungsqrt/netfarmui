import styles from "./highlight.module.css";
import HighLightItem from "../highlightItem/highlightItem";
import { BsSearch } from "react-icons/bs";
import ListCategory from '../Article/ListCategory'

function HighLight() {
   return (
      <div className={`${styles.highlight_component}`}>
         <div style={{ margin: "20px 0" }}>
            <h4 style={{ fontSize: "30px", fontWeight: "bold" }}>NỔI BẬT</h4>
         </div>
         <div className={`${styles.content}`}>
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "20px",
                  flex: "2",
               }}
            >
               <span style={{ width: "100%" }}>
                  <HighLightItem
                     title="Thời tiết"
                     content="Cơn bão số 7 sắp đổ bộ, người dân nhanh chóng thu hoạch tránh thiệt hại."
                     date="Sep 19 2022"
                  />
               </span>
               <span>
                  <HighLightItem
                     title="diseases"
                     content="Sắp đến thời gian thu hoạch lúa - 30/9/2022"
                     date="Sep 19 2022"
                  />
               </span>
            </div>
            <div
               style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
               }}
            >
               <ListCategory></ListCategory>
               
            </div>
         </div>
      </div>
   );
}

export default HighLight;
