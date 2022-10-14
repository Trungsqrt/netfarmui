import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Homepage";
import Personal from "./components/personalinfo/Personal";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Editor from "./components/editor/Editor";
import CreateExpert from "./components/createExpert/CreateExpert";
function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/create" element={<CreateExpert />}/>
         </Routes>
      </div>
   );
}

export default App;
