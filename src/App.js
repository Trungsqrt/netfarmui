import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Homepage";
import Personal from "./components/personalinfo/Personal";
// import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
import ArticleHandler from "./components/articleHandler/ArticleHandler";
import AdminPage from "./components/adminPage/AdminPage";
import CreateExpert from "./components/createExpert/CreateExpert";
import CalendarHandler from "./components/calendarHandler/CalendarHandler";
import ArticleView from "./components/articleView/ArticleView";

function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/createexpert" element={<CreateExpert />} />
            <Route path="/articlehandler" element={<ArticleHandler />} />
            <Route path="/calendarhandler" element={<CalendarHandler />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/articleView" element={<ArticleView />} />
         </Routes>
      </div>
   );
}

export default App;
