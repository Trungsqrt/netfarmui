import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Homepage";
import Personal from "./components/personalinfo/Personal";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
<<<<<<< HEAD
import Editor from "./components/editor/Editor";
import CreateExpert from "./components/createExpert/CreateExpert";
=======
import EditorArticle from "./components/editor/EditorArticle";

>>>>>>> a5aaee3 (login)
function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal" element={<Personal />} />
<<<<<<< HEAD
            <Route path="/editor" element={<Editor />} />
            <Route path="/create" element={<CreateExpert />}/>
=======
            <Route path="/editor" element={<EditorArticle />} />
>>>>>>> a5aaee3 (login)
         </Routes>
      </div>
   );
}

export default App;
