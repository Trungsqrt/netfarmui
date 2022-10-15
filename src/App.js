import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Homepage";
import Personal from "./components/personalinfo/Personal";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ArticleHandler from "./components/articleHandler/ArticleHandler";

import CreateExpert from "./components/createExpert/CreateExpert";

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/createexpert" element={<CreateExpert />} />
            <Route path="/articlehandler" element={<ArticleHandler />} />
         </Routes>
      </div>
   );
}

export default App;
