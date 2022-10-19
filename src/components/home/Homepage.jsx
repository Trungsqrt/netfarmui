import React from "react";
import Navbar from "../navbar/Navbar";
import Slider from "../slide/Slider";
import Footer from "../footer/Footer";
import HighLight from "../highlight/highlight";
import khoaiImage from "../../assets/image/khoai.png";
import ListArticle from "../Article/ListArticle";
import "./Homepage.css"
import { Link } from "react-router-dom";
function Homepage() {
   return (
      <div style={{ backgroundColor: "#CFBC16" }}>
         <Navbar />
         <Slider />
         <div className="hightlightWapper">
            <HighLight></HighLight>
         </div>
         <div class = "container">
         <div className="left">
            <div>BẢN TIN</div>  
            <ListArticle></ListArticle>
         </div>
         <div className="right">
         <Link to= '/bantin/kynangnongnghiep'><div>KỸ NĂNG</div></Link>    
            <ListArticle></ListArticle>
         </div>
         </div>
         <Footer />
      </div>
   );
}

export default Homepage;
