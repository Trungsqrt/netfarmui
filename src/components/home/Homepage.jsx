import React from "react";
import Navbar from "../navbar/Navbar";
import Slide from "../slide/Slide";
import Footer from "../footer/Footer";
import HighLight from "../highlight/highlight";

function Homepage() {
   return (
     <div style={{ backgroundColor: '#CFBC16'}}>
         <Navbar />
         <Slide/>
         <div style={{width: '90%', margin: 'auto'}}>
          <HighLight/>
         </div>
         <Footer />
      </div>
   );
}

export default Homepage;
