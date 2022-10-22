import Login from './components/login/Login';
import { Routes, Route } from 'react-router-dom';
import Personal from './components/personalinfo/Personal';
import ArticleHandler from './components/articleHandler/ArticleHandler';
import AdminPage from './components/adminPage/AdminPage';
import CreateExpert from './components/createExpert/CreateExpert';
import CalendarHandler from './components/calendarHandler/CalendarHandler';
import ClientHome from './components/client_farm/home/ClientHome';
import DetailArticle from './components/client_farm/detail/DetailArticle';
import InforPage from './components/client_farm/infor/InforPage';
import Policy from './components/client_farm/infor/policy/Policy';
import Manual from './components/client_farm/infor/manual/Manual';
import News from './components/client_farm/infor/news/News';
import Schedule from './components/client_farm/infor/schedule/Schedule';
import Shop from './components/client_farm/e_commerce/Shop/Shop';
import ProductDetail from './components/client_farm/e_commerce/Shop/Product/ProductDetail';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/createexpert" element={<CreateExpert />} />
                <Route path="/articlehandler" element={<ArticleHandler />} />
                <Route path="/calenderhandler" element={<CalendarHandler />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/" element={<ClientHome />} />
                <Route path="/detail/:id" element={<DetailArticle />} />
                <Route path="/inforPage" element={<InforPage />} />
                <Route path="/inforPage/policy" element={<Policy />} />
                <Route path="/inforPage/manual" element={<Manual />} />
                <Route path="/inforPage/news" element={<News />} />
                <Route path="/inforPage/schedule" element={<Schedule />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/product/detail/:id" element={<ProductDetail />} />
            </Routes>
        </div>
    );
}
export default App;
