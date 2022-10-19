import React from "react";
import Menuleft from "./Menuleft";
import Footer from "../../footer/Footer";
import Navbar from "../../navbar/Navbar";
import DetailArticle from "./DetailArticle";
const ViewArticle = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
        <div className="Banner"></div>
        <div className="main">
          <div className="column-left">
            <Menuleft></Menuleft>
          </div>
          <div className="column-right">
            <DetailArticle></DetailArticle>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ViewArticle;
