import Login from './components/login/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Homepage';
import Personal from './components/personalinfo/Personal';
import ArticleHandler from './components/articleHandler/ArticleHandler';
import AdminPage from './components/adminPage/AdminPage';
import CreateExpert from './components/createExpert/CreateExpert';
import CalendarHandler from './components/calendarHandler/CalendarHandler';
import ArticleView from './components/articleView/ArticleView';
import ClientHome from './components/client_farm/home/ClientHome';
import DetailArticle from './components/client_farm/detail/DetailArticle';
import InforPage from './components/client_farm/infor/InforPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/createexpert" element={<CreateExpert />} />
                <Route path="/articlehandler" element={<ArticleHandler />} />
                <Route path="/calenderhandler" element={<CalendarHandler />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/articleView" element={<ArticleView />} />
                <Route path="/client/home" element={<ClientHome />} />
                <Route path="/detail/:id" element={<DetailArticle />} />
                <Route path="/inforPage" element={<InforPage />} />
            </Routes>
        </div>
    );
}
export default App;
