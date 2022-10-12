import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Homepage";
import Personal from "./components/personalinfo/Personal";
import Navbar from "./components/navbar/Navbar";

function App() {
   return (
      <div className="App">
         {/* <Navbar /> */}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal" element={<Personal />} />
         </Routes>
      </div>
   );
}

export default App;
