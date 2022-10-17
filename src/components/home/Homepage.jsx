import React from "react";
import Navbar from "../navbar/Navbar";
import Slide from "../slide/Slide";
import Footer from "../footer/Footer";
import HighLight from "../highlight/highlight";
import khoaiImage from "../../assets/image/khoai.png";

function Homepage() {
   return (
      <div style={{ backgroundColor: "#CFBC16" }}>
         <Navbar />
         <Slide />
         <div style={{ width: "90%", margin: "auto" }}>
            <HighLight />
            <div style={{ display: "flex" }}>
               <div>
                  <div
                     style={{ borderTop: "5px solid #000", marginTop: "20px" }}
                  >
                     <h4
                        style={{
                           fontSize: "30px",
                           fontWeight: "bold",
                           padding: "20px 0",
                        }}
                     >
                        NÔNG NGHIỆP
                     </h4>
                     <div>
                        <ul
                           style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: "20px",
                           }}
                        >
                           <li>
                              <div
                                 style={{ display: "flex", columnGap: "20px" }}
                              >
                                 <img
                                    src={khoaiImage}
                                    alt="khoai"
                                    style={{ width: "100px" }}
                                 />
                                 <div
                                    style={{
                                       display: "flex",
                                       flexDirection: "column",
                                       justifyContent: "center",
                                    }}
                                 >
                                    <h5 style={{ fontWeight: "bold" }}>
                                       Hướng dẫn cách trồng khoai lang ra nhiều
                                       củ
                                    </h5>
                                    <p>
                                       Khoai lang nên được trồng theo các bước
                                       sau:
                                    </p>
                                    <p>Bước 1: Chọn giống theo tiêu chuẩn</p>
                                    <div>
                                       <p style={{ color: "#7687DF" }}>
                                          Ngày đăng: 19/9/2022
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li>
                              <div
                                 style={{ display: "flex", columnGap: "20px" }}
                              >
                                 <img
                                    src={khoaiImage}
                                    alt="khoai"
                                    style={{ width: "100px" }}
                                 />
                                 <div
                                    style={{
                                       display: "flex",
                                       flexDirection: "column",
                                       justifyContent: "center",
                                    }}
                                 >
                                    <h5 style={{ fontWeight: "bold" }}>
                                       Hướng dẫn cách trồng khoai lang ra nhiều
                                       củ
                                    </h5>
                                    <p>
                                       Khoai lang nên được trồng theo các bước
                                       sau:
                                    </p>
                                    <p>Bước 1: Chọn giống theo tiêu chuẩn</p>
                                    <div>
                                       <p style={{ color: "#7687DF" }}>
                                          Ngày đăng: 19/9/2022
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div></div>
               </div>
               <div></div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Homepage;
