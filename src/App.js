import { Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Personal from './components/personalinfo/Personal';
import ArticleHandler from './components/articleHandler/ArticleHandler';
import AdminPage from './components/adminPage/AdminPage';
import ExpertPage from './components/expertPage/ExpertPage';
import CreateExpert from './components/admin_farm/ManageUser/Expert/CreateExpert';
// import CalendarHandler from './components/calendarHandler/CalendarHandler';
import AddSchedule from './components/admin_farm/ManagePost/Addschedule';
import ClientHome from './components/client_farm/home/ClientHome';
import DetailArticle from './components/client_farm/detail/DetailArticle';
// import InforPage from './components/client_farm/infor/InforPage';
// import Policy from './components/client_farm/infor/policy/Policy';
// import Manual from './components/client_farm/infor/manual/Manual';
// import News from './components/client_farm/infor/news/News';
// import Schedule from './components/client_farm/infor/schedule/Schedule';
import Shop from './components/client_farm/e_commerce/Shop/Shop';
import ProductDetail from './components/client_farm/e_commerce/Shop/Product/ProductDetail';
import Cart from './components/client_farm/e_commerce/Cart/Cart';
import ManageProduct from './components/admin_farm/ManageProduct/ManageProduct';
import AdminHome from './components/admin_farm/home/AdminHome';
import AddProduct from './components/admin_farm/ManageProduct/AddProduct';
import EditProduct from './components/admin_farm/ManageProduct/EditProduct';
import Checkout from './components/client_farm/e_commerce/Checkout/Checkout';
import OrderList from './components/client_farm/e_commerce/Order/OrderList';
import AddCategory from './components/admin_farm/ManageProduct/ManageCategory/AddCategory';
import EditCategory from './components/admin_farm/ManageProduct/ManageCategory/EditCategory';
import Order from './components/admin_farm/ManageProduct/ManageOrder/Order';
import FeedbackList from './components/client_farm/e_commerce/Feedback/FeedbackList';
import FeedbackProduct from './components/client_farm/e_commerce/Feedback/FeedbackProduct';
import Information from './components/client_farm/infor/Information';
import Policy from './components/client_farm/infor/policy/Policy';
import Manual from './components/client_farm/infor/manual/Manual';
import News from './components/client_farm/infor/news/News';
import Footer from './components/client_farm/share/footer/Footer';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/createexpert" element={<CreateExpert />} />
                <Route path="/articlehandler" element={<ArticleHandler />} />
                <Route path="/calenderhandler" element={<AddSchedule />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/" element={<ClientHome />} />
                <Route path="/detail/:id" element={<DetailArticle />} />
                <Route path="/editArticle/:id" element={<ArticleHandler />} />
                <Route path="/editSchedule/:id" element={<AddSchedule />} />
                {/* <Route path="/inforPage" element={<InforPage />} />
                <Route path="/inforPage/policy" element={<Policy />} />
                <Route path="/inforPage/manual" element={<Manual />} />
                <Route path="/inforPage/news" element={<News />} />
                {/* <Route path="/inforPage/schedule" element={<Schedule />} /> */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/product/detail/:id" element={<ProductDetail />} />
                <Route path="/shop/cart" element={<Cart />} />
                <Route path="/manageproduct" element={<ManageProduct />} />
                <Route path="/AdminHome" element={<AdminHome />} />
                <Route path="/manageProduct/admin/addNewProduct" element={<AddProduct />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route path="/shop/checkout" element={<Checkout />} />
                <Route path="/shop/orderlist" element={<OrderList />} />
                <Route path="/expert" element={<ExpertPage />} />
                <Route path="/manageProduct/addNewCategory" element={<AddCategory />} />
                <Route path="/category/edit/:id" element={<EditCategory />} />
                <Route path="/manage/OrderDetail/:id" element={<Order />} />
                <Route path="/manage/Feedback/:id" element={<FeedbackList />} />
                <Route path="/manage/Feedback" element={<FeedbackList />} />
                <Route path="feedback/:id" element={<FeedbackProduct />} />
                <Route path="/inforPage" element={<Information />} />
            </Routes>
            <Footer></Footer>
        </div>
    );
}
export default App;
